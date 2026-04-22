/* ══════════════════════════════════════════════════════
   PORTFOLIO SCRIPT — ATHANG BACHHAV
══════════════════════════════════════════════════════ */

/* ── Mobile menu toggle ── */
function toggleMenu() {
  const btn  = document.querySelector('.hamburger-icon');
  const menu = document.querySelector('.menu-links');
  if (!btn || !menu) return;
  btn.classList.toggle('open');
  menu.classList.toggle('open');
}

/* ── Close menu on outside click ── */
document.addEventListener('click', function (e) {
  const nav  = document.getElementById('hamburger-nav');
  const btn  = document.querySelector('.hamburger-icon');
  const menu = document.querySelector('.menu-links');
  if (!nav || !menu) return;
  if (!nav.contains(e.target)) {
    btn && btn.classList.remove('open');
    menu.classList.remove('open');
  }
});

/* ── Nav scroll effect ── */
(function initNavScroll() {
  const desktopNav = document.getElementById('desktop-nav');
  if (!desktopNav) return;
  const onScroll = () => {
    desktopNav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Scroll-triggered reveal animations ── */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* Stagger cards and timeline items within the same parent */
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'))
            : [];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.max(0, idx * 60);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ── Active nav link on scroll ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#desktop-nav .nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--ink)';
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ── Smooth scroll polyfill for older Safari ── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
