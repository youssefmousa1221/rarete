(function () {
  // INSTAGRAM_URL is defined in data.js — all Instagram links use it

  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

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

  document.getElementById('btn-open-sidebar').addEventListener('click', function(e) {
    e.preventDefault();
    openSidebar();
  });
  document.getElementById('btn-search').addEventListener('click', function(e) {
    e.preventDefault();
    openSidebar();
    setTimeout(function() {
      var inp = document.getElementById('sidebar-search-input');
      if (inp) { inp.focus(); inp.scrollIntoView({ block: 'nearest' }); }
    }, 300);
  });
  document.getElementById('btn-close-sidebar').addEventListener('click', closeSidebar);
  document.getElementById('footer-menu-btn').addEventListener('click', openSidebar);
  document.getElementById('sidebar-menu-btn').addEventListener('click', openSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  var instagramSidebarLink = document.getElementById('sidebar-instagram-link');
  if (instagramSidebarLink) instagramSidebarLink.href = INSTAGRAM_URL;
  var footerInstagramLink = document.getElementById('footer-instagram-link');
  if (footerInstagramLink) footerInstagramLink.href = INSTAGRAM_URL;
  var sidebarTiktokLink = document.getElementById('sidebar-tiktok-link');
  if (sidebarTiktokLink && typeof TIKTOK_URL !== 'undefined') sidebarTiktokLink.href = TIKTOK_URL;
  var footerTiktokLink = document.getElementById('footer-tiktok-link');
  if (footerTiktokLink && typeof TIKTOK_URL !== 'undefined') footerTiktokLink.href = TIKTOK_URL;

  document.getElementById('footer-search-link').addEventListener('click', function(e) {
    e.preventDefault();
    openSidebar();
    setTimeout(function() {
      var inp = document.getElementById('sidebar-search-input');
      if (inp) { inp.focus(); inp.scrollIntoView({ block: 'nearest' }); }
    }, 300);
  });

  const views = {
    home: document.getElementById('view-home'),
    category: document.getElementById('view-category'),
    product: document.getElementById('view-product'),
    cart: document.getElementById('view-cart'),
    checkout: document.getElementById('view-checkout')
  };

  const categoryTitle = document.getElementById('category-title');
  const perfumeGrid = document.getElementById('perfume-grid');
  const productDetail = document.getElementById('product-detail');
  const featuredPerfumes = document.getElementById('featured-perfumes');
  const cartContent = document.getElementById('cart-content');
  const checkoutContent = document.getElementById('checkout-content');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartSidebarOverlay = document.getElementById('cart-sidebar-overlay');
  const cartSidebarContent = document.getElementById('cart-sidebar-content');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');

  let currentCategory = 'all';
  let currentProductId = null;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Cart Functions
  function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'block' : 'none';
    }
  }

  function addToCart(productId, quantity = 1) {
    const product = PERFUMES.find(p => p.id === productId);
    if (!product || product.outOfStock) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.nameEn,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartSidebar();
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartSidebar();
    if (views.cart && views.cart.classList.contains('active')) {
      renderCart();
    }
  }

  function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartSidebar();
        if (views.cart && views.cart.classList.contains('active')) {
          renderCart();
        }
      }
    }
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

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
          <p>${item.price} EGP - 50ml × ${item.quantity}</p>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">×</button>
      </div>
    `).join('');

    cartSidebarContent.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        removeFromCart(btn.dataset.id);
      });
    });

    if (cartTotalPrice) {
      cartTotalPrice.textContent = getCartTotal() + ' EGP';
    }
  }

  function renderCart() {
    if (!cartContent) return;

    if (cart.length === 0) {
      cartContent.innerHTML = '<div class="cart-empty-state"><p>Your cart is empty</p><a href="#" class="btn-primary" data-nav="home">Continue Shopping</a></div>';
      return;
    }










    cartContent.innerHTML = `
      <div class="cart-items">
        ${cart.map(item => `
          <div class="cart-page-item">
            <div class="cart-page-item-img" style="background-image:url('${item.image}')"></div>
            <div class="cart-page-item-info">
              <h3>${item.name}</h3>
              <p class="cart-item-price">${item.price} EGP - 50ml</p>
            </div>
            <div class="cart-page-item-controls">
              <button class="qty-btn" data-id="${item.id}" data-action="decrease">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
            <div class="cart-page-item-total">${item.price * item.quantity} EGP - 50ml</div>
            <button class="cart-page-item-remove" data-id="${item.id}">×</button>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Subtotal</span>
          <span>${getCartTotal()} EGP</span>
        </div>
        <div class="cart-summary-row total">
          <span>Total</span>
          <span>${getCartTotal()} EGP</span>
        </div>
        <button class="btn-checkout-full" id="btn-checkout-full">Proceed to Checkout</button>
      </div>
    `;










    cartContent.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const item = cart.find(i => i.id === id);
        if (item) {
          if (action === 'increase') {
            updateCartQuantity(id, item.quantity + 1);
          } else {
            updateCartQuantity(id, item.quantity - 1);
          }
        }
      });
    });

    cartContent.querySelectorAll('.cart-page-item-remove').forEach(btn => {
      btn.addEventListener('click', function() {
        removeFromCart(btn.dataset.id);
      });
    });

    const checkoutBtn = document.getElementById('btn-checkout-full');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        navigateTo('checkout');
      });
    }
  }

  function renderCheckout() {
    if (!checkoutContent) return;

    if (cart.length === 0) {
      checkoutContent.innerHTML = '<div class="checkout-empty"><p>Your cart is empty</p><a href="#" class="btn-primary" data-nav="home">Continue Shopping</a></div>';
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
                <span>${item.price * item.quantity} EGP - 50ml</span>
              </div>
            `).join('')}
          </div>
          <div class="checkout-total">
            <span>Total</span>
            <span>${getCartTotal()} EGP</span>
          </div>
        </div>
        <div class="checkout-section">
          <h2>Contact Information <span class="required-hint">*required</span></h2>
          <input type="text" id="checkout-name" placeholder="Your Name *" required>
          <input type="tel" id="checkout-phone" placeholder="Phone * (010/011/012/015 - 11 digits)" required maxlength="11" pattern="0(10|11|12|15)\d{8}" inputmode="numeric">
          <input type="tel" id="checkout-emergency" placeholder="Emergency Phone (optional)" maxlength="11" inputmode="numeric">
          <textarea id="checkout-address" placeholder="Delivery Address *" rows="3" required></textarea>
        </div>
        <button class="btn-submit-order" id="btn-submit-order">Complete Order</button>
      </div>
    `;

    const submitBtn = document.getElementById('btn-submit-order');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        const name = document.getElementById('checkout-name').value.trim();
        const phone = document.getElementById('checkout-phone').value.trim().replace(/\s/g, '');
        const emergency = document.getElementById('checkout-emergency');
        const emergencyPhone = emergency ? emergency.value.trim().replace(/\s/g, '') : '';
        const address = document.getElementById('checkout-address').value.trim();

        if (!name || !phone || !address) {
          alert('Please fill in your name, phone number, and delivery address');
          return;
        }
        if (!/^0(10|11|12|15)\d{8}$/.test(phone)) {
          alert('Phone must be 11 digits starting with 010, 011, 012, or 015');
          return;
        }
        if (emergencyPhone && !/^0(10|11|12|15)\d{8}$/.test(emergencyPhone)) {
          alert('Emergency phone must be 11 digits starting with 010, 011, 012, or 015');
          return;
        }

        submitOrder(name, phone, address, emergencyPhone);
      });
    }
  }

  function submitOrder(name, phone, address, emergencyPhone) {
    const emergency = emergencyPhone || '';
    const total = getCartTotal();

    const itemsText = cart.map(item =>
      `${item.name} × ${item.quantity} (${item.price * item.quantity} EGP)`
    ).join('\n');

    const emergencyText = emergency ? `\nEmergency Phone: ${emergency}` : '';

    const messageAr =
      `مرحبا، أريد طلب:\n${itemsText}\n\nالاسم: ${name}\nالهاتف: ${phone}\nالعنوان: ${address}${emergencyText}\n\nالمجموع: ${total} جنيه`;

    const messageEn =
      `Hi, I want to order:\n${itemsText}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}${emergencyText}\n\nTotal: ${total} EGP`;

    const message = `${messageAr}\n\n---\n\n${messageEn}`;

    const phoneNum = '201094113698';
    const whatsappURL = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    navigateTo('home');
    alert('✅ تم إرسال طلبك! شكراً لك 🌹');
  }

  function searchPerfumesByName(query) {
    var q = (query || '').trim();
    if (!q) return PERFUMES;
    var lower = q.toLowerCase();
    return PERFUMES.filter(function(p) {
      return p.nameEn && p.nameEn.toLowerCase().indexOf(lower) !== -1;
    });
  }

  // ✅ showView بدون history push — للاستخدام الداخلي فقط
  function showView(name) {
    Object.values(views).forEach(v => {
      if (v) v.classList.remove('active');
    });
    if (views[name]) views[name].classList.add('active');
    window.scrollTo(0, 0);

    if (name === 'cart') renderCart();
    else if (name === 'checkout') renderCheckout();
  }

  // ✅ navigateTo — بيعمل showView + يضيف للـ history
  function navigateTo(name, state) {
    const historyState = state || { view: name, category: currentCategory, productId: currentProductId };
    history.pushState(historyState, '', '');
    showView(name);
  }

  // ✅ زرار Back في المتصفح
  window.addEventListener('popstate', function(e) {
    if (e.state) {
      const { view, category, productId } = e.state;
      if (view === 'category' && category) {
        currentCategory = category;
        renderCategory(category);
        showView('category');
      } else if (view === 'product' && productId) {
        currentProductId = productId;
        const p = PERFUMES.find(x => x.id === productId);
        if (p) {
          renderProductDetail(p);
          showView('product');
        }
      } else {
        showView(view || 'home');
      }
    } else {
      showView('home');
    }
  });

  function getPerfumesByCategory(cat) {
    if (cat === 'all') return PERFUMES;
    return PERFUMES.filter(p => p.categories && p.categories.includes(cat));
  }

  function renderCategory(cat, searchList, searchQuery) {
    if (searchList !== undefined) {
      categoryTitle.textContent = searchQuery ? 'Search results: ' + searchQuery : 'Search results';
      currentCategory = 'all';
      renderPerfumeList(searchList);
      return;
    }
    currentCategory = cat;
    const info = CATEGORIES[cat] || CATEGORIES.all;
    categoryTitle.textContent = info.title;
    const list = getPerfumesByCategory(cat);
    renderPerfumeList(list);
  }






  function renderPerfumeList(list) {
    perfumeGrid.innerHTML = list.map(p => {
      const priceHtml = p.outOfStock
        ? '<span class="out-of-stock-badge">Out of Stock</span>'
        : (p.originalPrice ? `<span class="original-price">${p.originalPrice}</span> ${p.price} EGP - 50ml` : `${p.price} EGP - 50ml`);
      const genderHtml = p.gender ? `<span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span>` : '';
      return `
      <article class="perfume-card${p.outOfStock ? ' out-of-stock' : ''}" data-id="${p.id}">
        <div class="perfume-card-img" style="background-image:url('${p.image}')"></div>
        <div class="perfume-card-info">
          <h3>${p.nameEn} ${genderHtml}</h3>
          <p class="perfume-card-price">${priceHtml}</p>
        </div>
      </article>`;
    }).join('');

    perfumeGrid.querySelectorAll('.perfume-card').forEach(el => {
      el.addEventListener('click', function() {
        openProduct(el.dataset.id);
      });
    });
  }




  

  let featuredSwiper = null;
  let categoriesSwiper = null;

  function renderFeaturedPerfumes() {
    if (!featuredPerfumes) return;
    const bestSellerIds = BESTSELLERS;
    const featured = bestSellerIds.map(id => PERFUMES.find(p => p.id === id)).filter(Boolean);
    featuredPerfumes.innerHTML = featured.map(p => {
      const priceHtml = p.outOfStock
        ? '<span class="out-of-stock-badge">Out of Stock</span>'
        : (p.originalPrice ? `<span class="original-price">${p.originalPrice}</span> ${p.price} EGP - 50ml` : `${p.price} EGP - 50ml`);
      const genderHtml = p.gender ? `<span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span>` : '';
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

    featuredPerfumes.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('btn-add-to-cart')) {
          openProduct(card.dataset.id);
        }
      });
    });

    featuredPerfumes.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        addToCart(btn.dataset.id, 1);
        alert('Added to cart!');
      });
    });

    if (featuredSwiper) featuredSwiper.destroy(true, true);
    featuredSwiper = new Swiper('.featured-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.featured-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.featured-swiper .swiper-button-next',
        prevEl: '.featured-swiper .swiper-button-prev',
      },
      breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 }
      }
    });
  }

  // ✅ renderProductDetail منفصلة عشان نستخدمها في popstate
  function renderProductDetail(p) {
    const notesHTML = p.notes ? `
      <div class="product-notes">
        <h3>Fragrance Notes</h3>
        <div class="notes-grid">
          <div class="note-section">
            <h4>Top Notes</h4>
            <ul>${p.notes.top.map(note => `<li>${note}</li>`).join('')}</ul>
          </div>
          <div class="note-section">
            <h4>Heart Notes</h4>
            <ul>${p.notes.heart.map(note => `<li>${note}</li>`).join('')}</ul>
          </div>
          <div class="note-section">
            <h4>Base Notes</h4>
            <ul>${p.notes.base.map(note => `<li>${note}</li>`).join('')}</ul>
          </div>
        </div>
      </div>
    ` : '';

    const storyHTML = `
      <p class="product-story">${p.story}</p>
      ${p.storyAr ? `<p class="product-story-ar">${p.storyAr}</p>` : ''}
    `;

    const genderHtml = p.gender ? `<p class="product-gender"><span class="gender-badge gender-${p.gender}">${p.gender.charAt(0).toUpperCase() + p.gender.slice(1)}</span></p>` : '';

    const priceSectionHtml = p.outOfStock ? `
      <div class="product-price-section">
        ${p.originalPrice ? `<span class="product-original-price">${p.originalPrice} EGP</span>` : ''}
        ${p.price ? `<span class="product-price" style="text-decoration:line-through;opacity:0.5;">${p.price} EGP - 50ml</span>` : ''}
        <span class="out-of-stock-badge" style="display:block;margin-top:8px;">Out of Stock</span>
      </div>
    ` : `
      <div class="product-price-section">
        ${p.originalPrice ? `<span class="product-original-price">${p.originalPrice} EGP</span>` : ''}
        <span class="product-price">${p.price} EGP - 50ml</span>
      </div>
      <button class="btn-add-to-cart-product" data-id="${p.id}">Add to Cart</button>
    `;

    productDetail.innerHTML = `
      <div class="product-detail-grid">
        <div class="product-image" style="background-image:url('${p.image}')"></div>
        <div class="product-info">
          <h2>${p.nameEn}</h2>
          ${storyHTML}
          ${p.inspiredBy ? `<p class="product-inspired">Inspired by "${p.inspiredBy}"</p>` : ''}
          ${notesHTML}
          ${genderHtml}
          ${priceSectionHtml}
        </div>
      </div>
    `;

    const addBtn = productDetail.querySelector('.btn-add-to-cart-product');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        addToCart(p.id, 1);
        alert('Added to cart!');
      });
    }
  }

  function openProduct(id) {
    const p = PERFUMES.find(x => x.id === id);
    if (!p) return;
    currentProductId = id;
    renderProductDetail(p);
    navigateTo('product', { view: 'product', category: currentCategory, productId: id });
  }

  function openCategory(cat) {
    currentCategory = cat;
    renderCategory(cat);
    navigateTo('category', { view: 'category', category: cat, productId: null });
  }

  // ✅ زرار الرجوع داخل الصفحة
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      history.back();
    });
  });

  document.querySelectorAll('[data-nav="home"]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); navigateTo('home'); });
  });

  document.querySelectorAll('[data-nav="category"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCategory(currentCategory);
    });
  });

  document.querySelectorAll('[data-nav="cart"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('cart');
    });
  });

  document.querySelectorAll('.top-bar-link[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openCategory(link.dataset.category);
    });
  });

  document.getElementById('btn-cart').addEventListener('click', function(e) {
    e.preventDefault();
    openCartSidebar();
  });

  document.getElementById('btn-close-cart').addEventListener('click', closeCartSidebar);
  cartSidebarOverlay.addEventListener('click', closeCartSidebar);

  document.getElementById('btn-checkout').addEventListener('click', function() {
    closeCartSidebar();
    navigateTo('checkout');
  });

  // Share page link
  (function() {
    var btn = document.getElementById('btn-share');
    var toast = document.getElementById('share-toast');
    if (!btn) return;
    function showToast(msg) {
      if (toast) {
        toast.textContent = msg;
        toast.classList.add('is-visible');
        setTimeout(function() { toast.classList.remove('is-visible'); }, 2000);
      }
    }
    function copyAndToast() {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() { showToast('Link copied!'); }).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
      function fallbackCopy() {
        var ta = document.createElement('textarea');
        ta.value = url;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand('copy');
          showToast('Link copied!');
        } catch (err) {}
        document.body.removeChild(ta);
      }
    }
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var url = window.location.href;
      var title = document.title || 'Rareté — Every scent tells a story';
      if (navigator.share) {
        navigator.share({ title: title, text: title, url: url })
          .then(function() { showToast('Shared!'); })
          .catch(function(err) { if (err.name !== 'AbortError') copyAndToast(); });
      } else {
        copyAndToast();
      }
    });
  })();

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => openCategory(card.dataset.category));
  });

  document.querySelectorAll('.hero-cta').forEach(cta => {
    cta.addEventListener('click', function(e) {
      e.preventDefault();
      if (cta.dataset.category) {
        openCategory(cta.dataset.category);
      }
    });
  });

  var searchInput = document.getElementById('sidebar-search-input');
  if (searchInput) {
    var searchTimeout;
    searchInput.addEventListener('input', function() {
      var q = this.value.trim();
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        var list = searchPerfumesByName(q);
        closeSidebar();
        showView('category');
        renderCategory(undefined, list, q || '');
      }, 200);
    });
  }

  // Initialize Swiper for categories
  if (categoriesSwiper) categoriesSwiper.destroy(true, true);
  var catEl = document.querySelector('.categories-swiper');
  if (catEl) {
    categoriesSwiper = new Swiper('.categories-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      grabCursor: true,
      pagination: {
        el: '.categories-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.categories-next',
        prevEl: '.categories-prev',
      },
      breakpoints: {
        480: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 }
      }
    });
  }

  // ✅ Set initial history state
  history.replaceState({ view: 'home', category: 'all', productId: null }, '');

  renderFeaturedPerfumes();
  updateCartCount();

})();