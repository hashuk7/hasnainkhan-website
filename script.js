// Only hide elements for animation after JS confirms it can reveal them
document.body.classList.add('js-ready');

const els = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

// Small delay so browser paints first, then we hide+reveal
setTimeout(() => {
  els.forEach(el => io.observe(el));
}, 100);

// Nav scroll tint
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40 ? '0 1px 20px rgba(0,0,0,0.06)' : '';
});
