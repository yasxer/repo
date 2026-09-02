/* ═══════════════════════════════════════════════════
   Yasser Haoues — portfolio
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── Theme (initial value is set inline in <head>) ─ */
  document.getElementById('themeToggle').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ── Algiers clock ─────────────────────────────── */
  var clocks = ['clock', 'clock2', 'clock3']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var fmt = null;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Algiers', hour: '2-digit', minute: '2-digit', hour12: false
    });
  } catch (e) {}

  function tick() {
    var t = fmt ? fmt.format(new Date()) : new Date().toTimeString().slice(0, 5);
    clocks.forEach(function (el) { el.textContent = t; });
  }
  tick();
  setInterval(tick, 15000);

  /* ── Sticky nav ────────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-stuck', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile menu ───────────────────────────────── */
  var burger = document.getElementById('burger');
  var menu   = document.getElementById('mobileMenu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
  burger.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ── Scroll reveal ─────────────────────────────── */
  var revealables = document.querySelectorAll('.reveal');
  revealables.forEach(function (el) { el.style.setProperty('--d', el.dataset.d || 0); });

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ── Scrollspy ─────────────────────────────────── */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── Copy email ────────────────────────────────── */
  var copyBtn = document.getElementById('copyMail');
  copyBtn.addEventListener('click', function () {
    var mail  = copyBtn.dataset.mail;
    var label = copyBtn.querySelector('span');
    function done() {
      label.textContent = 'Copied';
      setTimeout(function () { label.textContent = 'Copy email'; }, 1600);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = mail; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(mail).then(done).catch(fallback);
    } else {
      fallback();
    }
  });

  /* ── Year ──────────────────────────────────────── */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
