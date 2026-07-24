// Canine Intuition — shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('nav.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
    });
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('nav-open'); });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (o) { o.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Scroll-reveal animations (position-based so it works everywhere, with a
  // safety timeout that guarantees content can never stay hidden)
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  // stagger children inside reveal-group containers
  document.querySelectorAll('.reveal-group').forEach(function (group) {
    group.querySelectorAll('.reveal').forEach(function (kid, i) {
      kid.style.transitionDelay = (i * 90) + 'ms';
    });
  });
  var showAll = function () { reveals.forEach(function (el) { el.classList.add('in'); }); reveals = []; };
  if (reduceMotion) {
    showAll();
  } else {
    var checkReveal = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = reveals.length - 1; i >= 0; i--) {
        if (reveals[i].getBoundingClientRect().top < vh * 0.9) {
          reveals[i].classList.add('in');
          reveals.splice(i, 1);
        }
      }
      if (!reveals.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    };
    var ticking = false;
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; checkReveal(); }); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // reveal in-view content as soon as the tab becomes visible (handles pages
    // that load in a background tab, where rAF/timers are paused)
    document.addEventListener('visibilitychange', function () { if (!document.hidden) checkReveal(); });
    checkReveal();               // reveal whatever is already in view
    setTimeout(checkReveal, 400); // catch late layout/font shifts
    setTimeout(showAll, 2500);    // safety net: never leave anything hidden
  }

  // Generic form -> success state (pitch demo, no backend)
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.parentElement.querySelector('.form-success');
      if (success) {
        form.style.display = 'none';
        success.classList.add('show');
      }
    });
  });
});
