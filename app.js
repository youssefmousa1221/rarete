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
    product: document.getElementById('view-product')
  };

  const categoryTitle = document.getElementById('category-title');
  const perfumeGrid = document.getElementById('perfume-grid');
  const productDetail = document.getElementById('product-detail');

  let currentCategory = 'all';

  function searchPerfumesByName(query) {
    var q = (query || '').trim();
    if (!q) return PERFUMES;
    var lower = q.toLowerCase();
    return PERFUMES.filter(function(p) {
      return p.nameEn && p.nameEn.toLowerCase().indexOf(lower) !== -1;
    });
  }

  function showView(name) {
    Object.values(views).forEach(v => v.classList.remove('active'));
    if (views[name]) views[name].classList.add('active');
  }

  function getPerfumesByCategory(cat) {
    if (cat === 'all') return PERFUMES;
    return PERFUMES.filter(p => p.category === cat);
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
    perfumeGrid.innerHTML = list.map(p => `
      <article class="perfume-card" data-id="${p.id}">
        <div class="perfume-card-img" style="background-image:url('${p.image}')"></div>
        <h3>${p.nameEn}</h3>
      </article>
    `).join('');
    perfumeGrid.querySelectorAll('.perfume-card').forEach(el => {
      el.addEventListener('click', function() { openProduct(el.dataset.id); });
    });
  }

  function openProduct(id) {
    const p = PERFUMES.find(x => x.id === id);
    if (!p) return;
    productDetail.innerHTML = `
      <div class="product-image" style="background-image:url('${p.image}')"></div>
      <div class="product-info">
        <h2>${p.nameEn}</h2>
        <p class="product-story">${p.story}</p>
        <p class="product-price">${p.price}</p>
        <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener" class="btn-order">
          Order via Instagram
        </a>
      </div>
    `;
    showView('product');
  }

  function openCategory(cat) {
    renderCategory(cat);
    showView('category');
  }

  document.querySelectorAll('[data-nav="home"]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); showView('home'); });
  });

  document.querySelectorAll('[data-nav="category"]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openCategory(currentCategory);
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
    window.open(INSTAGRAM_URL, '_blank');
  });

  // Share page link — موبايل: مشاركة أصلية | كمبيوتر: نسخ الرابط
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

  showView('home');
})();
