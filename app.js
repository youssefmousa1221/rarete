/* ============================================================
   app.js — Rareté Main Application Logic
   ============================================================
   📌 الأجزاء اللي ممكن تحتاج تعدل فيها:

   🔴 NOTIFY_EMAIL  — الإيميل اللي هتيجيلك الأوردرات (سطر 15)
   🔴 submitOrder() — منطق إرسال الأوردر عبر Netlify Forms
   ============================================================ */

(function () {

  /* ============================================================
     ⚙️  CONFIG — الإعدادات الأساسية
     ============================================================ */
  const NOTIFY_EMAIL = 'youssef1221.wolf@gmail.com'; // الإيميل اللي هتيجيلك الإشعارات منه Netlify


  /* ============================================================
     🔗  DOM References
     ============================================================ */
  const sidebar             = document.getElementById('sidebar');
  const sidebarOverlay      = document.getElementById('sidebar-overlay');
  const cartSidebar         = document.getElementById('cart-sidebar');
  const cartSidebarOverlay  = document.getElementById('cart-sidebar-overlay');
  const cartSidebarContent  = document.getElementById('cart-sidebar-content');
  const cartCount           = document.getElementById('cart-count');
  const cartTotalPrice      = document.getElementById('cart-total-price');
  const categoryTitle       = document.getElementById('category-title');
  const perfumeGrid         = document.getElementById('perfume-grid');
  const productDetail       = document.getElementById('product-detail');
  const featuredPerfumes    = document.getElementById('featured-perfumes');
  const cartContent         = document.getElementById('cart-content');
  const checkoutContent     = document.getElementById('checkout-content');

  const views = {
    home    : document.getElementById('view-home'),
    category: document.getElementById('view-category'),
    product : document.getElementById('view-product'),
    cart    : document.getElementById('view-cart'),
    checkout: document.getElementById('view-checkout')
  };


  /* ============================================================
     🛒  Cart State
     ============================================================ */
  let cart            = JSON.parse(localStorage.getItem('rarete_cart')) || [];
  let currentCategory = 'all';
  let currentProductId = null;
  let featuredSwiper  = null;
  let categoriesSwiper = null;


  /* ============================================================
     🔔  Toast Notification
     ============================================================ */
  function showToast(msg, duration = 2200) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'share-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('is-visible'), duration);
  }


  /* ============================================================
     🔄  Sidebar (Menu)
     ============================================================ */
  function openSidebar() {
    sidebar.classList.add('is-open');
    sidebarOverlay.classList.add('is-open');
    sidebarOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-open');
    sidebarOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('btn-open-sidebar').addEventListener('click', e => { e.preventDefault(); openSidebar(); });
  document.getElementById('btn-close-sidebar').addEventListener('click', closeSidebar);
  document.getElementById('footer-menu-btn').addEventListener('click', openSidebar);
  document.getElementById('sidebar-menu-btn').addEventListener('click', openSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Search button opens sidebar and focuses search input
  function openSidebarSearch() {
    openSidebar();
    setTimeout(() => {
      const inp = document.getElementById('sidebar-search-input');
      if (inp) { inp.focus(); inp.scrollIntoView({ block: 'nearest' }); }
    }, 300);
  }

  document.getElementById('btn-search').addEventListener('click', e => { e.preventDefault(); openSidebarSearch(); });
  document.getElementById('footer-search-link').addEventListener('click', e => { e.preventDefault(); openSidebarSearch(); });


  /* ============================================================
     🔗  Social Media Links
     ============================================================ */
  // Set all Instagram & TikTok links from data.js constants
  [
    ['sidebar-instagram-link', INSTAGRAM_URL],
    ['footer-instagram-link',  INSTAGRAM_URL],
    ['sidebar-tiktok-link',    typeof TIKTOK_URL !== 'undefined' ? TIKTOK_URL : '#'],
    ['footer-tiktok-link',     typeof TIKTOK_URL !== 'undefined' ? TIKTOK_URL : '#']
  ].forEach(([id, url]) => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });


  /* ============================================================
     📤  Share Button
     ============================================================ */
  (function initShare() {
    const btn = document.getElementById('btn-share');
    if (!btn) return;

    function copyUrl() {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showToast('🔗 Link copied!')).catch(fallback);
      } else { fallback(); }

      function fallback() {
        const ta = Object.assign(document.createElement('textarea'), {
          value: url, style: 'position:fixed;opacity:0'
        });
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('🔗 Link copied!'); } catch {}
        document.body.removeChild(ta);
      }
    }

    btn.addEventListener('click', e => {
      e.preventDefault();
      const title = document.title || 'Rareté — Every scent tells a story';
      if (navigator.share) {
        navigator.share({ title, text: title, url: window.location.href })
          .then(() => showToast('✅ Shared!'))
          .catch(err => { if (err.name !== 'AbortError') copyUrl(); });
      } else { copyUrl(); }
    });
  })();


  /* ============================================================
     🧭  View Navigation
     ============================================================ */
  function showView(name) {
    Object.values(views).forEach(v => v && v.classList.remove('active'));
    if (views[name]) views[name].classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (name === 'cart')     renderCart();
    if (name === 'checkout') renderCheckout();
  }

  function navigateTo(name, state) {
    const historyState = state || { view: name, category: currentCategory, productId: currentProductId };
    history.pushState(historyState, '');
    showView(name);
  }

  // Browser back/forward button support
  window.addEventListener('popstate', e => {
    if (!e.state) { showView('home'); return; }
    const { view, category, productId } = e.state;
    if (view === 'category' && category) {
      currentCategory = category;
      renderCategory(category);
      showView('category');
    } else if (view === 'product' && productId) {
      const p = PERFUMES.find(x => x.id === productId);
      if (p) { renderProductDetail(p); showView('product'); }
    } else {
      showView(view || 'home');
    }
  });

  // Back buttons inside pages
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); history.back(); });
  });

  // Home nav links
  document.querySelectorAll('[data-nav="home"]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); navigateTo('home'); })
  );

  // Top bar category links
  document.querySelectorAll('.top-bar-link[data-category]').forEach(link =>
    link.addEventListener('click', e => { e.preventDefault(); openCategory(link.dataset.category); })
  );

  // Hero CTA
  document.querySelectorAll('.hero-cta').forEach(cta =>
    cta.addEventListener('click', e => { e.preventDefault(); if (cta.dataset.category) openCategory(cta.dataset.category); })
  );

  // Category cards on home
  document.querySelectorAll('.category-card').forEach(card =>
    card.addEventListener('click', () => openCategory(card.dataset.category))
  );


  /* ============================================================
     🔍  Search
     ============================================================ */
  function searchPerfumesByName(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) return PERFUMES;
    return PERFUMES.filter(p => p.nameEn && p.nameEn.toLowerCase().includes(q));
  }

  const searchInput = document.getElementById('sidebar-search-input');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const q = this.value.trim();
        const results = searchPerfumesByName(q);
        closeSidebar();
        showView('category');
        renderCategory(undefined, results, q || '');
      }, 200);
    });
  }


  /* ============================================================
     🛍️  Cart Functions
     ============================================================ */
  function saveCart() {
    localStorage.setItem('rarete_cart', JSON.stringify(cart));
  }

  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  function addToCart(productId, quantity = 1) {
    const product = PERFUMES.find(p => p.id === productId);
    if (!product || product.outOfStock) return;
    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id: product.id, name: product.nameEn, price: product.price, image: product.image, quantity });
    }
    saveCart();
    updateCartCount();
    renderCartSidebar();
    showToast('✅ Added to cart!');
  }

  function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartCount();
    renderCartSidebar();
    if (views.cart && views.cart.classList.contains('active')) renderCart();
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity <= 0) { removeFromCart(productId); return; }
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity = quantity;
    saveCart();
    updateCartCount();
    renderCartSidebar();
    if (views.cart && views.cart.classList.contains('active')) renderCart();
  }

  function getCartTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }


  /* ============================================================
     🛒  Cart Sidebar
     ============================================================ */
  function openCartSidebar() {
    cartSidebar.classList.add('is-open');
    cartSidebarOverlay.classList.add('is-open');
    cartSidebarOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderCartSidebar();
  }

  function closeCartSidebar() {
    cartSidebar.classList.remove('is-open');
    cartSidebarOverlay.classList.remove('is-open');
    cartSidebarOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderCartSidebar() {
    if (!cartSidebarContent) return;
    if (cart.length === 0) {
      cartSidebarContent.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
      if (cartTotalPrice) cartTotalPrice.textContent = '0 EGP';
      return;
    }
    cartSidebarContent.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img" style="background-image:url('${item.image}')"></div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.price} EGP · 50ml × ${item.quantity}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove">×</button>
      </div>
    `).join('');

    cartSidebarContent.querySelectorAll('.cart-item-remove').forEach(btn =>
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id))
    );

    if (cartTotalPrice) cartTotalPrice.textContent = getCartTotal() + ' EGP';
  }

  document.getElementById('btn-cart').addEventListener('click', e => { e.preventDefault(); openCartSidebar(); });
  document.getElementById('btn-close-cart').addEventListener('click', closeCartSidebar);
  cartSidebarOverlay.addEventListener('click', closeCartSidebar);
  document.getElementById('btn-checkout').addEventListener('click', () => { closeCartSidebar(); navigateTo('checkout'); });


  /* ============================================================
     🛒  Cart Page
     ============================================================ */
  function renderCart() {
    if (!cartContent) return;
    if (cart.length === 0) {
      cartContent.innerHTML = `
        <div class="cart-empty-state">
          <p>Your cart is empty</p>
          <a href="#" class="btn-primary" data-nav="home">Continue Shopping</a>
        </div>`;
      cartContent.querySelector('[data-nav="home"]')
        ?.addEventListener('click', e => { e.preventDefault(); navigateTo('home'); });
      return;
    }
    cartContent.innerHTML = `
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-page-item">
            <div class="cart-page-item-img" style="background-image:url('${item.image}')"></div>
            <div class="cart-page-item-info">
              <h3>${item.name}</h3>
              <p class="cart-item-price">${item.price} EGP · 50ml</p>
            </div>
            <div class="cart-page-item-controls">
              <button class="qty-btn" data-id="${item.id}" data-action="decrease" aria-label="Decrease">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="increase" aria-label="Increase">+</button>
            </div>
            <div class="cart-page-item-total">${item.price * item.quantity} EGP</div>
            <button class="cart-page-item-remove" data-id="${item.id}" aria-label="Remove">×</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Subtotal</span><span>${getCartTotal()} EGP</span>
        </div>
        <div class="cart-summary-row total">
          <span>Total</span><span>${getCartTotal()} EGP</span>
        </div>
        <button class="btn-checkout-full" id="btn-checkout-full">Proceed to Checkout</button>
      </div>`;

    cartContent.querySelectorAll('.qty-btn').forEach(btn =>
      btn.addEventListener('click', () => {
        const item = cart.find(i => i.id === btn.dataset.id);
        if (!item) return;
        updateCartQuantity(btn.dataset.id, btn.dataset.action === 'increase' ? item.quantity + 1 : item.quantity - 1);
      })
    );
    cartContent.querySelectorAll('.cart-page-item-remove').forEach(btn =>
      btn.addEventListener('click', () => removeFromCart(btn.dataset.id))
    );
    document.getElementById('btn-checkout-full')
      ?.addEventListener('click', () => navigateTo('checkout'));
  }


  /* ============================================================
     💳  Checkout Page
     ============================================================ */
  function renderCheckout() {
    if (!checkoutContent) return;
    if (cart.length === 0) {
      checkoutContent.innerHTML = `
        <div class="checkout-empty">
          <p>Your cart is empty</p>
          <a href="#" class="btn-primary" data-nav="home">Continue Shopping</a>
        </div>`;
      checkoutContent.querySelector('[data-nav="home"]')
        ?.addEventListener('click', e => { e.preventDefault(); navigateTo('home'); });
      return;
    }
    checkoutContent.innerHTML = `
      <div class="checkout-form">
        <div class="checkout-section">
          <h2>Order Summary</h2>
          <div class="checkout-items">
            ${cart.map(item => `
              <div class="checkout-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>${item.price * item.quantity} EGP</span>
              </div>`).join('')}
          </div>
          <div class="checkout-total">
            <span>Total</span><span>${getCartTotal()} EGP</span>
          </div>
        </div>
        <div class="checkout-section">
          <h2>Contact Information <span class="required-hint">* required</span></h2>
          <input type="text"  id="checkout-name"      placeholder="Your Name *" required>
          <input type="tel"   id="checkout-phone"     placeholder="Phone * (010/011/012/015 — 11 digits)" required maxlength="11" inputmode="numeric">
          <input type="tel"   id="checkout-emergency" placeholder="Emergency Phone (optional)" maxlength="11" inputmode="numeric">
          <textarea           id="checkout-address"   placeholder="Delivery Address *" rows="3" required></textarea>
        </div>
        <button class="btn-submit-order" id="btn-submit-order">✉️ إتمام الطلب</button>
      </div>`;

    document.getElementById('btn-submit-order').addEventListener('click', () => {
      const name      = document.getElementById('checkout-name').value.trim();
      const phone     = document.getElementById('checkout-phone').value.trim().replace(/\s/g, '');
      const emergency = document.getElementById('checkout-emergency').value.trim().replace(/\s/g, '');
      const address   = document.getElementById('checkout-address').value.trim();

      if (!name || !phone || !address) {
        showToast('⚠️ Please fill in all required fields');
        return;
      }
      if (!/^0(10|11|12|15)\d{8}$/.test(phone)) {
        showToast('⚠️ Phone must be 11 digits starting with 010, 011, 012, or 015');
        return;
      }
      if (emergency && !/^0(10|11|12|15)\d{8}$/.test(emergency)) {
        showToast('⚠️ Emergency phone must be 11 digits starting with 010, 011, 012, or 015');
        return;
      }
      submitOrder(name, phone, address, emergency);
    });
  }


  /* ============================================================
     📧  Submit Order — Netlify Forms + Google Sheets
     🔴  SHEETS_URL : ارفع الـ Apps Script وحط الرابط هنا
     ============================================================ */
  const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzlrsdscCWfPsWrOk4jz8cRTRyVvPX6Yqu7RqYb2rTUp7eyVccF4QxLj_ZQfHtNLsmn/exec'; // 🔴 غيّر ده بالرابط بتاعك

  async function submitOrder(name, phone, address, emergencyPhone) {
    const total     = getCartTotal();
    const orderDate = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });
    const itemsText = cart.map(i => `${i.name} × ${i.quantity} — ${i.price * i.quantity} EGP`).join(' | ');

    // ── 1. إرسال عبر Netlify Forms (إيميل) ────────────────────
    try {
      const body = new URLSearchParams({
        'form-name'    : 'rarete-order',
        'التاريخ'      : orderDate,
        'الاسم'        : name,
        'الهاتف'       : phone,
        'هاتف_الطوارئ' : emergencyPhone || '—',
        'العنوان'      : address,
        'المنتجات'     : itemsText,
        'الإجمالي'     : `${total} EGP`
      });
      await fetch('/', {
        method : 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body   : body.toString()
      });
    } catch (err) {
      console.warn('Netlify Forms error:', err);
    }

    // ── 2. تسجيل في Google Sheets (صف جديد لكل أوردر) ─────────
    try {
      await fetch(SHEETS_URL, {
        method : 'POST',
        mode   : 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          date          : orderDate,
          name          : name,
          phone         : phone,
          emergencyPhone: emergencyPhone || '—',
          address       : address,
          items         : itemsText,
          total         : `${total} EGP`
        })
      });
    } catch (err) {
      console.warn('Google Sheets error:', err);
    }

    // ── 3. مسح الكارت وإظهار رسالة نجاح ───────────────────────
    cart = [];
    saveCart();
    updateCartCount();
    showToast('✅ تم إرسال طلبك بنجاح! 🌹');
    navigateTo('home');
  }

  /* ============================================================
     🗂️  Category & Product Rendering
     ============================================================ */
  function getPerfumesByCategory(cat) {
    if (cat === 'all') return PERFUMES;
    return PERFUMES.filter(p => p.categories && p.categories.includes(cat));
  }

  function openCategory(cat) {
    currentCategory = cat;
    renderCategory(cat);
    navigateTo('category', { view: 'category', category: cat, productId: null });
  }

  function renderCategory(cat, searchList, searchQuery) {
    if (searchList !== undefined) {
      categoryTitle.textContent = searchQuery ? `Results: "${searchQuery}"` : 'Search Results';
      currentCategory = 'all';
      renderPerfumeList(searchList);
      return;
    }
    currentCategory = cat;
    categoryTitle.textContent = (CATEGORIES[cat] || CATEGORIES.all).title;
    renderPerfumeList(getPerfumesByCategory(cat));
  }

  function renderPerfumeList(list) {
    if (!perfumeGrid) return;
    perfumeGrid.innerHTML = list.map(p => {
      const priceHtml = p.outOfStock
        ? '<span class="out-of-stock-badge">Out of Stock</span>'
        : (p.originalPrice
            ? `<span class="original-price">${p.originalPrice} EGP</span> ${p.price} EGP · 50ml`
            : `${p.price} EGP · 50ml`);
      const genderHtml = p.gender
        ? `<span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span>` : '';
      return `
        <article class="perfume-card${p.outOfStock ? ' out-of-stock' : ''}" data-id="${p.id}">
          <div class="perfume-card-img" style="background-image:url('${p.image}')"></div>
          <div class="perfume-card-info">
            <h3>${p.nameEn} ${genderHtml}</h3>
            <p class="perfume-card-price">${priceHtml}</p>
          </div>
        </article>`;
    }).join('');

    perfumeGrid.querySelectorAll('.perfume-card').forEach(el =>
      el.addEventListener('click', () => openProduct(el.dataset.id))
    );
  }


  /* ============================================================
     🌸  Product Detail
     ============================================================ */
  function openProduct(id) {
    const p = PERFUMES.find(x => x.id === id);
    if (!p) return;
    currentProductId = id;
    renderProductDetail(p);
    navigateTo('product', { view: 'product', category: currentCategory, productId: id });
  }

  function renderProductDetail(p) {
    if (!productDetail) return;

    const notesHTML = p.notes ? `
      <div class="product-notes">
        <h3>Fragrance Notes</h3>
        <div class="notes-grid">
          <div class="note-section">
            <h4>Top Notes</h4>
            <ul>${p.notes.top.map(n => `<li>${n}</li>`).join('')}</ul>
          </div>
          <div class="note-section">
            <h4>Heart Notes</h4>
            <ul>${p.notes.heart.map(n => `<li>${n}</li>`).join('')}</ul>
          </div>
          <div class="note-section">
            <h4>Base Notes</h4>
            <ul>${p.notes.base.map(n => `<li>${n}</li>`).join('')}</ul>
          </div>
        </div>
      </div>` : '';

    const genderHtml = p.gender
      ? `<span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span>` : '';

    const priceHTML = p.outOfStock ? `
      <div class="product-price-section">
        ${p.originalPrice ? `<span class="product-original-price">${p.originalPrice} EGP</span>` : ''}
        ${p.price ? `<span class="product-price" style="text-decoration:line-through;opacity:0.5;">${p.price} EGP · 50ml</span>` : ''}
        <span class="out-of-stock-badge" style="display:block;margin-top:8px;">Out of Stock</span>
      </div>` : `
      <div class="product-price-section">
        ${p.originalPrice ? `<span class="product-original-price">${p.originalPrice} EGP</span>` : ''}
        <span class="product-price">${p.price} EGP · 50ml</span>
      </div>
      <button class="btn-add-to-cart-product" data-id="${p.id}">Add to Cart</button>`;

    productDetail.innerHTML = `
      <div class="product-detail-grid">
        <div class="product-image" style="background-image:url('${p.image}')"></div>
        <div class="product-info">
          <h2>${p.nameEn}</h2>
          ${genderHtml ? `<p class="product-gender">${genderHtml}</p>` : ''}
          <p class="product-story">${p.story}</p>
          ${p.storyAr ? `<p class="product-story-ar">${p.storyAr}</p>` : ''}
          ${p.inspiredBy ? `<p class="product-inspired">Inspired by "${p.inspiredBy}"</p>` : ''}
          ${notesHTML}
          ${priceHTML}
        </div>
      </div>`;

    productDetail.querySelector('.btn-add-to-cart-product')
      ?.addEventListener('click', function () { addToCart(p.id, 1); });
  }


  /* ============================================================
     ⭐  Featured / Best Sellers Swiper
     ============================================================ */
  function renderFeaturedPerfumes() {
    if (!featuredPerfumes) return;

    const featured = BESTSELLERS.map(id => PERFUMES.find(p => p.id === id)).filter(Boolean);

    featuredPerfumes.innerHTML = featured.map(p => {
      const priceHtml = p.outOfStock
        ? '<span class="out-of-stock-badge">Out of Stock</span>'
        : (p.originalPrice
            ? `<span class="original-price">${p.originalPrice} EGP</span> ${p.price} EGP · 50ml`
            : `${p.price} EGP · 50ml`);
      const genderHtml = p.gender
        ? `<span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span>` : '';
      const btnHtml = p.outOfStock ? '' : `<button class="btn-add-to-cart" data-id="${p.id}">Add to Cart</button>`;
      return `
        <div class="swiper-slide">
          <article class="featured-card${p.outOfStock ? ' out-of-stock' : ''}" data-id="${p.id}">
            <div class="featured-card-img" style="background-image:url('${p.image}')"></div>
            <div class="featured-card-info">
              <h3>${p.nameEn} ${genderHtml}</h3>
              <p class="featured-card-price">${priceHtml}</p>
              ${btnHtml}
            </div>
          </article>
        </div>`;
    }).join('');

    featuredPerfumes.querySelectorAll('.featured-card').forEach(card =>
      card.addEventListener('click', e => {
        if (!e.target.classList.contains('btn-add-to-cart')) openProduct(card.dataset.id);
      })
    );
    featuredPerfumes.querySelectorAll('.btn-add-to-cart').forEach(btn =>
      btn.addEventListener('click', e => { e.stopPropagation(); addToCart(btn.dataset.id, 1); })
    );

    if (featuredSwiper) featuredSwiper.destroy(true, true);
    featuredSwiper = new Swiper('.featured-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: featured.length > 1,
      grabCursor: true,
      pagination: { el: '.featured-swiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.featured-swiper .swiper-button-next',
        prevEl: '.featured-swiper .swiper-button-prev'
      },
      breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  }


  /* ============================================================
     🗂️  Categories Swiper
     ============================================================ */
  function initCategoriesSwiper() {
    if (categoriesSwiper) categoriesSwiper.destroy(true, true);
    const el = document.querySelector('.categories-swiper');
    if (!el) return;
    categoriesSwiper = new Swiper('.categories-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      pagination: { el: '.categories-pagination', clickable: true },
      navigation: { nextEl: '.categories-next', prevEl: '.categories-prev' },
      breakpoints: {
        480 : { slidesPerView: 2, spaceBetween: 20 },
        768 : { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 }
      }
    });
  }


  /* ============================================================
     🚀  Init
     ============================================================ */
  history.replaceState({ view: 'home', category: 'all', productId: null }, '');
  renderFeaturedPerfumes();
  initCategoriesSwiper();
  updateCartCount();

})();