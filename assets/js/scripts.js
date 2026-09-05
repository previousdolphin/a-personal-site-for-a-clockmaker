/* ============================================================
   MARCHANT HOROLOGY — interactive layer
   Live clock, reveal-on-scroll, mobile nav, compact header.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  /* --- LIVE CLOCK: nav digital readout + hero analog hands --- */
  var navClock = document.getElementById('navClock');
  var hourHand = document.getElementById('hourHand');
  var minuteHand = document.getElementById('minuteHand');
  var secondHand = document.getElementById('secondHand');

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var now = new Date();
    var h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();

    if (navClock) {
      navClock.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
    }

    if (hourHand && minuteHand && secondHand) {
      var hDeg = ((h % 12) + m / 60) * 30;
      var mDeg = (m + s / 60) * 6;
      var sDeg = s * 6;
      hourHand.style.transform = 'rotate(' + hDeg + 'deg)';
      minuteHand.style.transform = 'rotate(' + mDeg + 'deg)';
      secondHand.style.transform = 'rotate(' + sDeg + 'deg)';
    }
  }
  tick();
  setInterval(tick, 1000);

  /* --- MOBILE NAV TOGGLE --- */
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- SCROLL REVEAL --- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- HEADER COMPACT ON SCROLL --- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('is-compact');
      } else {
        header.classList.remove('is-compact');
      }
    }, { passive: true });
  }
})();