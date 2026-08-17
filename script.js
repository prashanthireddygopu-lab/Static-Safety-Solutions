/* ============================================================
   Static Safety Solutions — script.js
   Navigation, product filtering/search, product modal,
   WhatsApp enquiries, scroll reveal. No dependencies.
   ============================================================ */

(function () {
  'use strict';

  var WHATSAPP_NUMBER = '916309981002';

  /* ---------- Mobile navigation ---------- */

  var menuToggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });

    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- WhatsApp helper ---------- */

  function openWhatsApp(message) {
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
  }

  /* ---------- Catalogue filters & search ---------- */

  var cards = Array.prototype.slice.call(document.querySelectorAll('.product-card'));
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var searchInput = document.getElementById('productSearch');
  var countLabel = document.querySelector('.catalog-count');
  var activeFilter = 'all';

  function updateCount(visible) {
    if (countLabel) {
      countLabel.textContent = 'Showing ' + visible + ' of ' + cards.length + ' products';
    }
  }

  function applyFilters() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var visible = 0;

    cards.forEach(function (card) {
      var categoryOk = activeFilter === 'all' || card.dataset.category === activeFilter;
      var searchOk = !query || (card.dataset.name || '').indexOf(query) !== -1;
      var match = categoryOk && searchOk;
      card.classList.toggle('no-match', !match);
      if (match) { visible += 1; }
    });

    updateCount(visible);
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        var isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      activeFilter = btn.dataset.filter || 'all';
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  /* ---------- Product modal ---------- */

  var modal = document.getElementById('productModal');
  var modalImage = document.getElementById('modal-img');
  var modalCat = document.getElementById('modal-cat');
  var modalTitle = document.getElementById('modal-title');
  var modalIntro = document.getElementById('modal-intro');
  var modalFeatures = document.getElementById('modal-features');
  var modalEnquire = document.querySelector('.modal-enquire');
  var currentProduct = '';

  function openProduct(card) {
    var name = card.querySelector('h3').textContent;
    var image = card.querySelector('.product-image img');
    var cat = card.querySelector('.product-cat').textContent;
    var intro = card.querySelector('.product-info > p').textContent;
    var features = Array.prototype.slice.call(card.querySelectorAll('.product-features li'))
      .map(function (li) { return li.textContent; });

    currentProduct = name;
    modalImage.src = image.getAttribute('src');
    modalImage.alt = image.getAttribute('alt') || name;
    modalCat.textContent = cat;
    modalTitle.textContent = name;
    modalIntro.textContent = intro;
    modalFeatures.innerHTML = '';
    features.forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function closeProduct() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  document.querySelectorAll('.btn-details').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openProduct(btn.closest('.product-card'));
    });
  });

  document.querySelectorAll('.btn-enquire').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var product = btn.getAttribute('data-product') || btn.closest('.product-card').querySelector('h3').textContent;
      openWhatsApp('Hello Static Safety Solutions, I am interested in ' + product + '. Please share details, availability and a quotation.');
    });
  });

  var modalClose = modal ? modal.querySelector('.modal-close') : null;
  if (modalClose) {
    modalClose.addEventListener('click', closeProduct);
  }

  if (modalEnquire) {
    modalEnquire.addEventListener('click', function () {
      if (currentProduct) {
        openWhatsApp('Hello Static Safety Solutions, I am interested in ' + currentProduct + '. Please share specifications, availability and a quotation.');
      }
    });
  }

  if (modal && typeof modal.addEventListener === 'function') {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) { closeProduct(); }
    });
  }

  /* ---------- Enquiry form ---------- */

  var form = document.getElementById('enquiryForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var message =
        'Hello Static Safety Solutions,\n\n' +
        'Name: ' + (data.get('name') || '') + '\n' +
        'Company: ' + (data.get('company') || 'Not provided') + '\n' +
        'Phone: ' + (data.get('phone') || '') + '\n' +
        'Requirement: ' + (data.get('message') || '');

      openWhatsApp(message);
    });
  }

  /* ---------- Reveal on scroll ---------- */

  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- Initial state ---------- */

  applyFilters();
}());