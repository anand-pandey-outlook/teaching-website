/* ═══════════════════════════════════════════
   Utkarsh Home Tuition — main.js v2
   Full interactivity: particles, typewriter,
   counters, ripple, popup, toast, FAQ,
   testimonial slider, form validation
   ═══════════════════════════════════════════ */

/* ─────────────────────────────
   1. SCROLL PROGRESS BAR
───────────────────────────── */
const scrollBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollBar) return;
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scrollBar.style.width = (p * 100) + '%';
}, { passive: true });

/* ─────────────────────────────
   2. NAVBAR
───────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    if (open) {
      s1.style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
      s2.style.opacity = '0';
      s3.style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
    } else {
      [s1, s2, s3].forEach(s => s.style.cssText = '');
    }
  });
  document.addEventListener('click', e => {
    if (navbar && !navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => s.style.cssText = '');
    });
  });
}

/* ─────────────────────────────
   3. RIPPLE EFFECT
───────────────────────────── */
document.addEventListener('click', e => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const r = document.createElement('span');
  r.className = 'ripple-wave';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
});

/* ─────────────────────────────
   4. TOAST NOTIFICATIONS
───────────────────────────── */
function showToast(msg, type = 'success', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icon = type === 'success' ? 'fa-check-circle' : 'fa-times-circle';
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
  container.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastIn .3s ease reverse';
    t.addEventListener('animationend', () => t.remove());
  }, duration);
}

/* ─────────────────────────────
   5. POPUP / MODAL
───────────────────────────── */
const leadPopup  = document.getElementById('leadPopup');
const popupClose = document.getElementById('popupClose');
const popupForm  = document.getElementById('popupForm');

function openPopup() {
  if (leadPopup) leadPopup.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePopup() {
  if (leadPopup) leadPopup.classList.remove('open');
  document.body.style.overflow = '';
}
window.openPopup = openPopup;

if (popupClose) popupClose.addEventListener('click', closePopup);
if (leadPopup)  leadPopup.addEventListener('click', e => { if (e.target === leadPopup) closePopup(); });

// Auto-open popup after 20 seconds (only once per session)
if (!sessionStorage.getItem('popupShown')) {
  setTimeout(() => {
    if (!leadPopup.classList.contains('open')) {
      openPopup();
      sessionStorage.setItem('popupShown', '1');
    }
  }, 20000);
}

if (popupForm) {
  popupForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = popupForm.querySelectorAll('input, select');
    const name   = inputs[0].value.trim();
    const phone  = inputs[1].value.trim();
    const cls    = inputs[2].value;
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      showToast('Please enter a valid 10-digit WhatsApp number.', 'error');
      return;
    }
    const msg = encodeURIComponent(`Hi Utkarsh Home Tuition!\n\nI want to book a FREE Demo Class.\n\nStudent Name: ${name}\nClass: ${cls}\nPhone: ${phone}\n\nPlease contact me.`);
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    closePopup();
    showToast('Opening WhatsApp... We will respond shortly!');
  });
}

/* ─────────────────────────────
   6. HERO PARTICLES
───────────────────────────── */
const particleContainer = document.getElementById('heroParticles');
if (particleContainer) {
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 40 + 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
      opacity:${Math.random() * .08 + .02};
    `;
    particleContainer.appendChild(p);
  }
}

/* ─────────────────────────────
   7. TYPEWRITER EFFECT
───────────────────────────── */
const typeEl   = document.getElementById('typewriter');
const phrases  = ['At Your Doorstep', 'Online & Offline', 'Individual & Group', 'CBSE · ICSE · State Board', 'Starting ₹300/month'];
let   pIdx = 0, cIdx = 0, deleting = false;

function typeStep() {
  if (!typeEl) return;
  const current = phrases[pIdx];
  if (!deleting) {
    typeEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) { deleting = true; setTimeout(typeStep, 1800); return; }
    setTimeout(typeStep, 70);
  } else {
    typeEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeStep, 400); return; }
    setTimeout(typeStep, 40);
  }
}
setTimeout(typeStep, 800);

/* ─────────────────────────────
   8. COUNTER ANIMATION
───────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ─────────────────────────────
   9. INTERSECTION OBSERVER (AOS + Counters)
───────────────────────────── */
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      // Trigger counters inside newly visible elements
      entry.target.querySelectorAll('.counter').forEach(c => {
        if (!c.dataset.animated) { c.dataset.animated = '1'; animateCounter(c); }
      });
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos], .counter').forEach(el => {
  if (el.classList.contains('counter')) {
    // Observe counters directly (they may be inside a [data-aos] element)
    const wrapper = el.closest('[data-aos]') || el;
    aosObserver.observe(wrapper);
  } else {
    aosObserver.observe(el);
  }
});

/* ─────────────────────────────
   10. CLASS FILTER TABS
───────────────────────────── */
const modeTabs    = document.querySelectorAll('.mode-tab');
const classCards  = document.querySelectorAll('.class-card');

modeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    modeTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const mode = tab.dataset.mode;
    classCards.forEach(card => {
      if (mode === 'all' || card.dataset.mode === mode) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        requestAnimationFrame(() => { card.style.animation = ''; });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─────────────────────────────
   11. TESTIMONIAL SLIDER
───────────────────────────── */
const track    = document.getElementById('testiTrack');
const prevBtn  = document.getElementById('testiPrev');
const nextBtn  = document.getElementById('testiNext');
const dotsWrap = document.getElementById('testiDots');

if (track) {
  const cards  = track.querySelectorAll('.testi-card');
  let current  = 0;
  let autoPlay;

  function getVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const count = Math.ceil(cards.length / getVisible());
    for (let i = 0; i < count; i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx) {
    const vis = getVisible();
    const max = Math.ceil(cards.length / vis) - 1;
    current = Math.max(0, Math.min(idx, max));
    const cardW = cards[0].getBoundingClientRect().width;
    const gap   = 24;
    track.style.transform = `translateX(-${current * (cardW * vis + gap * vis)}px)`;
    dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  buildDots();
  if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(autoPlay); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(autoPlay); goTo(current + 1); startAuto(); });

  function startAuto() {
    autoPlay = setInterval(() => {
      const max = Math.ceil(cards.length / getVisible()) - 1;
      goTo(current >= max ? 0 : current + 1);
    }, 5000);
  }
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); });
}

/* ─────────────────────────────
   12. FAQ ACCORDION
───────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ─────────────────────────────
   13. LEAD FORM (Main)
───────────────────────────── */
const leadForm = document.getElementById('leadForm');
if (leadForm) {
  // Checkbox pills toggle
  leadForm.querySelectorAll('.check-pill').forEach(pill => {
    pill.addEventListener('click', () => pill.classList.toggle('selected'));
  });

  leadForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const nameInput  = leadForm.querySelector('[name="name"]');
    const phoneInput = leadForm.querySelector('[name="phone"]');
    const errName    = document.getElementById('err-name');
    const errPhone   = document.getElementById('err-phone');

    // Validate name
    if (nameInput && nameInput.value.trim().length < 2) {
      if (errName) { errName.textContent = 'Please enter student name.'; errName.classList.add('show'); }
      valid = false;
    } else if (errName) errName.classList.remove('show');

    // Validate phone
    const phone = phoneInput ? phoneInput.value.trim() : '';
    if (!/^\d{10}$/.test(phone)) {
      if (errPhone) { errPhone.textContent = 'Enter a valid 10-digit number.'; errPhone.classList.add('show'); }
      valid = false;
    } else if (errPhone) errPhone.classList.remove('show');

    if (!valid) { showToast('Please fix the errors before submitting.', 'error'); return; }

    // Collect all data
    const data = Object.fromEntries(new FormData(leadForm));
    const subjects = [...leadForm.querySelectorAll('.check-pill.selected')].map(p => p.textContent.trim()).join(', ') || 'Not specified';

    const msg = encodeURIComponent(
      `Hi Utkarsh Home Tuition! 👋\n\n` +
      `📋 *Enrolment Request*\n\n` +
      `👤 Student: ${data.name || ''}\n` +
      `📚 Class: ${data.class || ''} (${data.board || ''})\n` +
      `📖 Subjects: ${subjects}\n` +
      `🎯 Mode: ${data.mode || ''}\n` +
      `⏰ Preferred Time: ${data.time || ''}\n` +
      `📱 Phone: ${phone}\n` +
      `📍 City: ${data.city || 'Not specified'}\n` +
      `💬 Message: ${data.message || 'None'}\n\n` +
      `Please contact me to schedule a FREE demo class. Thank you!`
    );

    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
      showToast('Opening WhatsApp! We will reach you within 30 minutes.', 'success');
      leadForm.reset();
      leadForm.querySelectorAll('.check-pill').forEach(p => p.classList.remove('selected'));
      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fab fa-whatsapp"></i> Book FREE Demo on WhatsApp';
        submitBtn.disabled = false;
      }
    }, 600);
  });
}

/* ─────────────────────────────
   14. HERO MINI FORM
───────────────────────────── */
const heroMiniForm = document.getElementById('heroMiniForm');
if (heroMiniForm) {
  heroMiniForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = heroMiniForm.querySelector('input');
    const phone = input ? input.value.trim() : '';
    if (!/^\d{10}$/.test(phone)) {
      showToast('Enter a valid 10-digit WhatsApp number.', 'error');
      return;
    }
    const msg = encodeURIComponent(`Hi! I want to enquire about classes. My number is ${phone}. Please contact me.`);
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    input.value = '';
    showToast('Opening WhatsApp... We will call you back!');
  });
}

/* ─────────────────────────────
   15. CONTACT FORM
───────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs  = contactForm.querySelectorAll('input, textarea');
    const name    = inputs[0]?.value.trim() || '';
    const phone   = inputs[1]?.value.trim() || '';
    const message = inputs[2]?.value.trim() || '';
    if (!name || !/^\d{10}$/.test(phone)) {
      showToast('Please fill name and a valid phone number.', 'error');
      return;
    }
    const msg = encodeURIComponent(`Hi Utkarsh Home Tuition!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message || 'I want to know more.'}`);
    window.open(`https://wa.me/919999999999?text=${msg}`, '_blank');
    showToast('Message sent via WhatsApp!');
    contactForm.reset();
  });
}

/* ─────────────────────────────
   16. POPUP FORM (inner pages)
───────────────────────────── */
// For inner pages that use generic buy modal
document.querySelectorAll('[onclick^="buyNow"]').forEach(btn => {
  // These are handled inline in each page script
});

/* ─────────────────────────────
   17. BACK TO TOP
───────────────────────────── */
const backTop = document.getElementById('backTop');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────
   18. STICKY CTA (mobile)
───────────────────────────── */
const stickyCta = document.getElementById('stickyCta');
if (stickyCta) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) return; // desktop: CSS handles it (display:none)
    const enroll = document.getElementById('enroll');
    if (enroll) {
      const rect = enroll.getBoundingClientRect();
      stickyCta.style.display = rect.top < 0 ? 'none' : 'block';
    }
  }, { passive: true });
}

/* ─────────────────────────────
   19. SMOOTH SCROLL for anchors
───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = (navbar ? navbar.offsetHeight : 70) + 16;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ─────────────────────────────
   20. FILTER BUTTONS (inner pages)
───────────────────────────── */
document.querySelectorAll('.filter-bar').forEach(bar => {
  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

/* ─────────────────────────────
   21. SUBJECT CHIP HOVER (hero card)
───────────────────────────── */
document.querySelectorAll('.sub-chip').forEach((chip, i) => {
  chip.style.transitionDelay = `${i * 40}ms`;
});

/* ─────────────────────────────
   22. ACTIVE NAV HIGHLIGHT
───────────────────────────── */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href') || '';
  if (href === page || (page === '' && href === 'index.html') || href === `#${page.replace('.html', '')}`) {
    link.style.color = 'var(--saffron)';
  }
});

/* ─────────────────────────────
   23. INPUT FOCUS EFFECTS
───────────────────────────── */
document.querySelectorAll('.input-wrap input, .input-wrap select, .input-wrap textarea').forEach(input => {
  input.addEventListener('focus', () => {
    input.closest('.input-wrap')?.classList.add('focused');
  });
  input.addEventListener('blur', () => {
    input.closest('.input-wrap')?.classList.remove('focused');
  });
});

/* ─────────────────────────────
   24. INLINE PAGE SWITCH (individual/group/online/offline pages)
───────────────────────────── */
window.switchMode = function(btn, showId, hideId) {
  const showEl = document.getElementById(showId);
  const hideEl = document.getElementById(hideId);
  if (showEl) { showEl.style.display = 'grid'; }
  if (hideEl) { hideEl.style.display = 'none'; }
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

console.log('%c Utkarsh Home Tuition ✦', 'color:#FF6B00;font-size:18px;font-weight:bold;');
console.log('%c Website loaded successfully!', 'color:#3A0CA3;font-size:12px;');
