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

  // Services split panel — swap detail on select
  var svcRows = document.querySelectorAll('.svc-row');
  var svcImg = document.getElementById('svcImg');
  var svcTag = document.getElementById('svcTag');
  var svcTitle = document.getElementById('svcTitle');
  var svcDesc = document.getElementById('svcDesc');
  if (svcRows.length && svcImg) {
    svcRows.forEach(function (row) {
      var activate = function () {
        svcRows.forEach(function (r) { r.classList.remove('is-active'); });
        row.classList.add('is-active');
        svcImg.src = row.getAttribute('data-img');
        svcImg.alt = row.getAttribute('data-title');
        // restart fade animation
        svcImg.style.animation = 'none';
        void svcImg.offsetWidth;
        svcImg.style.animation = '';
        svcTag.textContent = row.getAttribute('data-tag');
        svcTitle.innerHTML = row.getAttribute('data-title');
        svcDesc.innerHTML = row.getAttribute('data-desc');
      };
      row.addEventListener('click', activate);
      row.addEventListener('mouseenter', activate);
    });
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
