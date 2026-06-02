// ─── Custom cursor ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-card, .app-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(2)';
    ring.style.opacity = '0.7';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.opacity = '0.4';
  });
});

// ─── Typing effect ────────────────────────────────────────────────────────────
const roles   = ['Développeur Full Stack.', 'Expert React & Laravel.', 'Passionné Cybersécurité.', 'Développeur Android.'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function type() {
  const current = roles[ri];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ci + 1);
    ci++;
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      ri = (ri + 1) % roles.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}
type();

// ─── Scroll reveal ────────────────────────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ─── Counter animation ────────────────────────────────────────────────────────
function animateCounter(el, target) {
  let current = 0;
  const step = target / 40;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (target === 100 ? '%' : '+');
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
    }
  }, 40);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.target);
      animateCounter(e.target, target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ─── Avatar photo upload ──────────────────────────────────────────────────────
const avatarImg  = document.getElementById('avatarImg');
const photoInput = document.getElementById('photoInput');

if (avatarImg && photoInput) {
  avatarImg.addEventListener('click', () => photoInput.click());

  photoInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      avatarImg.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="Photo de profil"/>`;
    };
    reader.readAsDataURL(file);
  });
}

// ─── Active nav link on scroll ────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// ─── Hamburger menu ───────────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function openMenu() {
  hamburger.classList.add('open');
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Fermer quand on clique sur un lien
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Fermer avec la touche Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// Mettre à jour le lien actif aussi dans le menu mobile
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  mobileLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});
