// ========================================
// Lenis smooth scroll
// ========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function lenisRaf(time) {
  lenis.raf(time);
  requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);
// ========================================
// AOS init
// ========================================
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
});
lenis.on('scroll', AOS.refresh);

var burger = document.querySelector('.burger');
var mobMenu = document.querySelector('.mob-menu');
var mobClose = document.querySelector('.mob-menu__close');

burger.addEventListener('click', function() {
  mobMenu.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

mobClose.addEventListener('click', function() {
  mobMenu.classList.remove('is-open');
  document.body.style.overflow = '';
});

// ========================================
// Products mobile pagination
// ========================================
(function() {
  var BREAKPOINT = 570;
  var PER_PAGE = 3;
  var currentPage = 1;

  var grid = document.querySelector('.products__grid');
  var prevBtn = document.querySelector('.products__btn-prev');
  var nextBtn = document.querySelector('.products__btn-next');
  var numsEl = document.querySelector('.products__pagination-nums');

  function getCards() {
    return Array.from(grid.querySelectorAll('.product-card'));
  }

  function totalPages() {
    return Math.ceil(getCards().length / PER_PAGE);
  }

  function isActive() {
    return window.innerWidth <= BREAKPOINT;
  }

  function scrollToGrid() {
    var top = grid.getBoundingClientRect().top + window.scrollY - 130;
    lenis.scrollTo(top, { duration: 0.6 });
  }

  function renderNums() {
    var total = totalPages();
    numsEl.innerHTML = '';
    for (var i = 1; i <= total; i++) {
      (function(page) {
        var btn = document.createElement('button');
        btn.className = 'products__pagination-num' + (page === currentPage ? ' is-active' : '');
        btn.textContent = page;
        btn.addEventListener('click', function() {
          goTo(page);
          scrollToGrid();
        });
        numsEl.appendChild(btn);
      })(i);
    }
  }

  function goTo(page) {
    var total = totalPages();
    currentPage = Math.max(1, Math.min(page, total));
    var cards = getCards();
    var start = (currentPage - 1) * PER_PAGE;

    if (isActive()) {
      cards.forEach(function(c, i) {
        c.style.display = (i >= start && i < start + PER_PAGE) ? '' : 'none';
      });
    } else {
      cards.forEach(function(c) { c.style.display = ''; });
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === total;

    numsEl.querySelectorAll('.products__pagination-num').forEach(function(btn, i) {
      btn.classList.toggle('is-active', i + 1 === currentPage);
    });
  }

  prevBtn.addEventListener('click', function() {
    scrollToGrid();
    goTo(currentPage - 1);
  });

  nextBtn.addEventListener('click', function() {
    scrollToGrid();
    goTo(currentPage + 1);
  });

  window.addEventListener('resize', function() {
    goTo(currentPage);
  });

  renderNums();
  goTo(1);
})();

// ========================================
// Order Popup
// ========================================
(function() {
  var popup = document.getElementById('orderPopup');
  var trigger = document.querySelector('.hero__btn-primary');
  var closeBtn = document.getElementById('orderClose');
  var overlay = document.getElementById('orderOverlay');

  function openPopup(e) {
    e.preventDefault();
    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePopup();
  });

  document.querySelectorAll('.order-popup__method').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.order-popup__method').forEach(function(b) {
        b.classList.remove('order-popup__method--active');
      });
      btn.classList.add('order-popup__method--active');
    });
  });
})();

// ========================================
// Consult Popup
// ========================================
(function() {
  var popup = document.getElementById('consultPopup');
  var trigger = document.querySelector('.hero__btn-secondary');
  var closeBtn = document.getElementById('consultClose');
  var overlay = document.getElementById('consultOverlay');

  function openPopup(e) {
    e.preventDefault();
    popup.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    popup.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  trigger.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closePopup();
  });
})();

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var target = anchor.getAttribute('href');
    if (target === '#') return;
    e.preventDefault();
    lenis.scrollTo(target);
  });
});