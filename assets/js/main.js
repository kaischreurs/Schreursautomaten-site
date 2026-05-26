/* =====================================================
   Schreurs-Automaten — interactiviteit
   ===================================================== */

(function () {
  'use strict';

  /* ----- Jaar in footer ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Mobiel menu ----- */
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');

  function closeNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menu openen');
  }

  function openNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menu sluiten');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });
    primaryNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => closeNav());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ----- Back-to-top ----- */
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 600) toTop.classList.add('is-visible');
      else toTop.classList.remove('is-visible');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----- Image fallback voor externe afbeeldingen ----- */
  document.querySelectorAll('img[data-fallback]').forEach((img) => {
    const parent = img.parentElement;
    if (!parent) return;
    const mode = img.dataset.fallback;
    const emoji = img.dataset.emoji || '✨';

    img.addEventListener('error', () => {
      img.remove();
      if (mode === 'emoji') {
        parent.innerHTML = `<span style="font-size:3rem;line-height:1">${emoji}</span>`;
      } else {
        parent.style.background = 'linear-gradient(135deg, #1f3a66, #0a1426)';
      }
    });
  });

  /* ----- Smooth scroll met header-offset ----- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const header = document.querySelector('.site-header');
      const offset = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', href);
    });
  });

  /* ----- Contact / lead form ----- */
  document.querySelectorAll('form[action^="mailto:"]').forEach((form) => {
    form.addEventListener('submit', function (e) {
      const nameEl = form.querySelector('input[name="Naam"], #name, #lf-name');
      const emailEl = form.querySelector('input[name="Email"], #email, #lf-email');
      const name = (nameEl && nameEl.value) || '';
      const email = (emailEl && emailEl.value) || '';

      if (!name.trim() || !email.trim()) {
        e.preventDefault();
        alert('Vul uw naam en e-mailadres in.');
      }
    });
  });

  /* ----- Reveal on scroll ----- */
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll(
      '.hero-card, .hero-form, .service, .healthy-card, .why-card, .case-card, .frame, .lead-form, .quote-card, .big-quote, .proof-item, .pricing-card'
    );
    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 600ms ease, transform 600ms ease';
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.06 }
    );
    els.forEach((el) => obs.observe(el));
  }
})();
