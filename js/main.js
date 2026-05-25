// ── NAVBAR ──
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.navbar-nav');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
  });
}

// Mobile dropdown toggle
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      link.parentElement.classList.toggle('open');
    }
  });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ── SCROLL FADE-IN ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2a7a3b';
    btn.style.borderColor = '#2a7a3b';
    btn.disabled = true;
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.disabled = false;
    }, 4000);
  });
}

// ── INJECT IMAGES (base64) ──
function injectImages() {
  if (typeof IMAGES === 'undefined') return;
  document.querySelectorAll('[data-img]').forEach(el => {
    const key = el.getAttribute('data-img');
    if (IMAGES[key]) el.src = IMAGES[key];
  });
}
// Run after images.js is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectImages);
} else {
  injectImages();
}
