const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const nodemailer = require('nodemailer');
const XLSX = require('xlsx');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Serve static files from current directory
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'rarete.db');
const EXCEL_EXPORT_PATH = path.join(__dirname, 'rarete-orders.xlsx');
const NOTIFY_EMAIL = 'youssef.wolf1221@gmail.com';

// Initialize database
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(phone)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    total_egp INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_egp INTEGER NOT NULL,
    line_total_egp INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
  CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);
  CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
`);

try {
  db.exec('ALTER TABLE customers ADD COLUMN emergency_phone TEXT');
} catch (_) {}

function isValidEgyptPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const p = phone.replace(/\s/g, '');
  return /^(010|011|012|015)\d{8}$/.test(p);
}

// Email transporter
function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    console.warn('Gmail credentials not set. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env');
    return null;
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

const transporter = createTransporter();

function sendOrderEmail(orderData) {
  if (!transporter) return Promise.resolve();

  const lines = orderData.items.map(i =>
    `• ${i.name} × ${i.quantity} = ${i.lineTotal} EGP`
  ).join('\n');

  const html = `
    <h2>🛍️ New Order from Rareté</h2>
    <p><strong>Order #${orderData.orderId}</strong></p>
    <hr>
    <p><strong>Customer:</strong> ${orderData.customer.name}</p>
    <p><strong>Phone:</strong> ${orderData.customer.phone}</p>
    <p><strong>Address:</strong> ${orderData.customer.address || '—'}</p>
    <hr>
    <h3>Items</h3>
    <pre>${lines}</pre>
    <hr>
    <p><strong>Total: ${orderData.total} EGP</strong></p>
    <p><small>${new Date().toISOString()}</small></p>
  `;

  return transporter.sendMail({
    from: process.env.GMAIL_USER || 'rarete@example.com',
    to: NOTIFY_EMAIL,
    subject: `[Rareté] New Order #${orderData.orderId} - ${orderData.customer.name}`,
    html,
    text: `
New Order from Rareté
Order #${orderData.orderId}
Customer: ${orderData.customer.name}
Phone: ${orderData.customer.phone}
Address: ${orderData.customer.address || '—'}
Items:
${lines}
Total: ${orderData.total} EGP
    `.trim()
  }).catch(err => console.error('Email error:', err.message));
}

// POST /api/orders — submit new order
app.post('/api/orders', (req, res) => {
  try {
    const { name, phone, address, email, emergency_phone, items } = req.body;
    if (!name || !phone || !address || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Name, phone, address, and items are required' });
    }

    const phoneClean = String(phone).replace(/\s/g, '');
    if (!isValidEgyptPhone(phoneClean)) {
      return res.status(400).json({ error: 'Phone must be 11 digits starting with 010, 011, 012, or 015' });
    }
    if (emergency_phone) {
      const emergencyClean = String(emergency_phone).replace(/\s/g, '');
      if (!isValidEgyptPhone(emergencyClean)) {
        return res.status(400).json({ error: 'Emergency phone must be 11 digits starting with 010, 011, 012, or 015' });
      }
    }

    const insertCustomer = db.prepare(`
      INSERT INTO customers (name, phone, address, email, emergency_phone)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(phone) DO UPDATE SET
        name = excluded.name,
        address = excluded.address,
        email = excluded.email,
        emergency_phone = excluded.emergency_phone
    `);

    const getCustomerId = db.prepare('SELECT id FROM customers WHERE phone = ?');
    insertCustomer.run(
      name.trim(),
      phoneClean,
      (address || '').trim(),
      (email || '').trim(),
      emergency_phone ? String(emergency_phone).replace(/\s/g, '').trim() : null
    );
    const row = getCustomerId.get(phoneClean);
    const customerId = row.id;

    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const insertOrder = db.prepare(`
      INSERT INTO orders (customer_id, total_egp, status) VALUES (?, ?, 'pending')
    `);
    const result = insertOrder.run(customerId, total);
    const orderId = result.lastInsertRowid;

    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price_egp, line_total_egp)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    for (const it of items) {
      const lineTotal = it.price * it.quantity;
      insertItem.run(orderId, it.id, it.name, it.quantity, it.price, lineTotal);
    }

    const orderData = {
      orderId,
      customer: { name, phone, address },
      total,
      items: items.map(i => ({
        name: i.name,
        quantity: i.quantity,
        lineTotal: i.price * i.quantity
      }))
    };

    sendOrderEmail(orderData);

    res.json({
      success: true,
      orderId,
      total,
      message: 'Order saved. You will receive a confirmation email.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
});

// GET /api/orders — list all orders
app.get('/api/orders', (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT o.id, o.total_egp, o.status, o.created_at,
             c.name, c.phone, c.address
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      ORDER BY o.created_at DESC
    `).all();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders/:id — order detail with items
app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.prepare(`
      SELECT o.*, c.name, c.phone, c.address
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      WHERE o.id = ?
    `).get(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const items = db.prepare(`
      SELECT product_id, product_name, quantity, unit_price_egp, line_total_egp
      FROM order_items WHERE order_id = ?
    `).all(req.params.id);

    res.json({ ...order, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/export/excel — download Excel file
app.get('/api/export/excel', (req, res) => {
  try {
    const orders = db.prepare(`
      SELECT o.id, o.total_egp, o.status, o.created_at,
             c.name, c.phone, c.address, c.emergency_phone
      FROM orders o
      JOIN customers c ON c.id = o.customer_id
      ORDER BY o.created_at DESC
    `).all();

    const orderItems = db.prepare(`
      SELECT order_id, product_id, product_name, quantity, unit_price_egp, line_total_egp
      FROM order_items ORDER BY order_id
    `).all();

    const orderProductsMap = {};
    orderItems.forEach(i => {
      if (!orderProductsMap[i.order_id]) orderProductsMap[i.order_id] = [];
      orderProductsMap[i.order_id].push(`${i.product_name} × ${i.quantity}`);
    });

    const salesByPerfume = db.prepare(`
      SELECT product_name, SUM(quantity) as total_sold
      FROM order_items
      GROUP BY product_name
      ORDER BY total_sold DESC
    `).all();

    const wsOrders = XLSX.utils.json_to_sheet(orders.map(o => ({
      'Order ID': o.id,
      'Customer': o.name,
      'Phone': o.phone,
      'Emergency Phone': o.emergency_phone || '',
      'Address': o.address || '',
      'Products': (orderProductsMap[o.id] || []).join(' | '),
      'Total (EGP)': o.total_egp,
      'Status': o.status,
      'Date': o.created_at
    })));

    const wsItems = XLSX.utils.json_to_sheet(orderItems.map(i => ({
      'Order ID': i.order_id,
      'Product ID': i.product_id,
      'Product': i.product_name,
      'Qty': i.quantity,
      'Unit Price (EGP)': i.unit_price_egp,
      'Line Total (EGP)': i.line_total_egp
    })));

    const wsSalesByPerfume = XLSX.utils.json_to_sheet(salesByPerfume.map(s => ({
      'Perfume': s.product_name,
      'Total Sold': s.total_sold
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, wsOrders, 'Orders');
    XLSX.utils.book_append_sheet(wb, wsItems, 'Order Items');
    XLSX.utils.book_append_sheet(wb, wsSalesByPerfume, 'Sales by Perfume');
    XLSX.writeFile(wb, EXCEL_EXPORT_PATH);

    res.download(EXCEL_EXPORT_PATH, 'rarete-orders.xlsx', err => {
      try { fs.unlinkSync(EXCEL_EXPORT_PATH); } catch (_) {}
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fallback: serve index.html
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Rareté server running at http://localhost:${PORT}`);
  console.log(`Orders API: POST /api/orders`);
  console.log(`Excel export: GET /api/export/excel`);
});
