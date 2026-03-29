const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function showToast(message, type = 'info') {
  const wrap = $('#toastContainer');
  if (!wrap) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

const scrollProgress = $('#scrollProgress');
window.addEventListener('scroll', () => {
  if (!scrollProgress) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const p = total > 0 ? (window.scrollY / total) * 100 : 0;
  scrollProgress.style.width = `${p}%`;
}, { passive: true });

const navbar = $('#navbar');
const navLinks = $('#navLinks');
const hamburger = $('#hamburger');
const onboardModal = $('#onboardModal');
const onboardClose = $('#onboardClose');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!navbar) return;
    if (!navbar.contains(e.target)) navLinks.classList.remove('open');
  });
}

function openOnboardModal(role = 'student') {
  if (!onboardModal) return;
  onboardModal.hidden = false;
  document.body.style.overflow = 'hidden';
  setOnboardTab(role);
}

function closeOnboardModal() {
  if (!onboardModal) return;
  onboardModal.hidden = true;
  document.body.style.overflow = '';
}

function setOnboardTab(role) {
  const studentPanel = $('#studentPanel');
  const teacherPanel = $('#teacherPanel');
  if (studentPanel) studentPanel.classList.toggle('active', role === 'student');
  if (teacherPanel) teacherPanel.classList.toggle('active', role === 'teacher');
}

$$('[data-open-onboard]').forEach((btn) => {
  btn.addEventListener('click', () => openOnboardModal(btn.dataset.openOnboard || 'student'));
});

if (onboardClose) onboardClose.addEventListener('click', closeOnboardModal);
if (onboardModal) {
  onboardModal.addEventListener('click', (e) => {
    if (e.target === onboardModal) closeOnboardModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && onboardModal && !onboardModal.hidden) closeOnboardModal();
});

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = $(href);
    if (!target) return;
    e.preventDefault();
    const offset = (navbar ? navbar.offsetHeight : 0) + 12;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    navLinks?.classList.remove('open');
  });
});

$$('.faq-item').forEach((item) => {
  const trigger = $('.faq-q', item);
  if (!trigger) return;
  trigger.addEventListener('click', () => item.classList.toggle('open'));
});

function setInvalidState(input, invalid) {
  if (!input) return;
  input.classList.toggle('invalid', invalid);
}

function validateStep(step) {
  const fields = $$('input, select, textarea', step);
  let ok = true;
  fields.forEach((field) => {
    if (field.disabled || field.type === 'hidden') return;
    const valid = field.checkValidity();
    setInvalidState(field, !valid);
    if (!valid) ok = false;
  });
  return ok;
}

function renderReview(form, targetId) {
  const review = $(`#${targetId}`);
  if (!review) return;
  const data = new FormData(form);
  const list = document.createElement('ul');
  data.forEach((val, key) => {
    if (!val) return;
    const row = document.createElement('li');
    row.textContent = `${key}: ${val}`;
    list.appendChild(row);
  });
  review.innerHTML = '';
  review.appendChild(list);
}

function initWizard({ formId, progressId, successId, reviewId }) {
  const form = $(`#${formId}`);
  if (!form) return;

  const steps = $$('.form-step', form);
  const progress = $(`#${progressId}`);
  const success = $(`#${successId}`);
  const top = form.closest('.wizard-card') ? $('.wizard-top', form.closest('.wizard-card')) : null;
  const labels = top ? $$('.wizard-steps span', top) : [];

  let index = 0;

  function paint() {
    steps.forEach((step, i) => step.classList.toggle('active', i === index));
    labels.forEach((l, i) => l.classList.toggle('active', i <= index));
    if (progress) {
      const ratio = steps.length <= 1 ? 100 : (index / (steps.length - 1)) * 100;
      progress.style.width = `${ratio}%`;
    }
    if (reviewId && index === steps.length - 1) renderReview(form, reviewId);
  }

  form.addEventListener('click', (e) => {
    const next = e.target.closest('[data-next]');
    const prev = e.target.closest('[data-prev]');

    if (next) {
      if (!validateStep(steps[index])) {
        showToast('Please fill all required fields correctly.', 'error');
        return;
      }
      index = Math.min(index + 1, steps.length - 1);
      paint();
    }

    if (prev) {
      index = Math.max(index - 1, 0);
      paint();
    }
  });

  form.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement)) return;
    if (t.classList.contains('invalid')) setInvalidState(t, !t.checkValidity());
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(steps[index])) {
      showToast('Please complete required details before submit.', 'error');
      return;
    }
    form.hidden = true;
    if (top) top.hidden = true;
    if (success) success.hidden = false;
    showToast('Form submitted successfully (UI prototype).', 'success');
  });

  paint();
}

initWizard({
  formId: 'leadWizard',
  progressId: 'leadProgress',
  successId: 'leadSuccess',
  reviewId: 'leadReview'
});

initWizard({
  formId: 'studentWizard',
  progressId: 'studentProgress',
  successId: 'studentSuccess',
  reviewId: 'studentReview'
});

initWizard({
  formId: 'teacherWizard',
  progressId: 'teacherProgress',
  successId: 'teacherSuccess',
  reviewId: 'teacherReview'
});

const roleSwitch = $('#roleSwitch');
const loginRole = $('#loginRole');
const roleHelp = $('#roleHelp');
const identifierLabel = $('#identifierLabel');
const identifierInput = $('#loginForm [name="identifier"]');
if (roleSwitch && loginRole) {
  const roleMeta = {
    student: {
      help: 'Student mode: track classes, schedules, and progress.',
      label: 'Email or Phone *',
      placeholder: 'Enter email or 10-digit phone'
    },
    teacher: {
      help: 'Teacher mode: manage sessions, assignments, and batches.',
      label: 'Email or Phone *',
      placeholder: 'Enter email or 10-digit phone'
    },
    admin: {
      help: 'Admin mode: configure programs, subjects, and admissions.',
      label: 'Admin Email or Username *',
      placeholder: 'Enter admin email or username'
    }
  };

  function paintRole(role) {
    const meta = roleMeta[role] || roleMeta.student;
    if (roleHelp) roleHelp.textContent = meta.help;
    if (identifierLabel) identifierLabel.textContent = meta.label;
    if (identifierInput) identifierInput.placeholder = meta.placeholder;
  }

  $$('button', roleSwitch).forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('button', roleSwitch).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const role = btn.dataset.role || 'student';
      loginRole.value = role;
      paintRole(role);
    });
  });

  paintRole(loginRole.value);
}

$$('[data-toggle-password]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const wrap = btn.closest('.password-wrap');
    const input = wrap ? $('input', wrap) : null;
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.innerHTML = input.type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
  });
});

const loginForm = $('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = $('[name="identifier"]', loginForm);
    const password = $('[name="password"]', loginForm);
    if (!identifier || !password) return;

    const idValue = identifier.value.trim();
    const passValue = password.value.trim();
    const role = loginRole ? loginRole.value : 'student';
    const phoneLike = /^\d{10}$/.test(idValue);
    const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(idValue);
    const usernameLike = /^[a-zA-Z0-9._-]{4,}$/.test(idValue);

    const identifierValid = role === 'admin' ? (emailLike || usernameLike) : (phoneLike || emailLike);

    setInvalidState(identifier, !identifierValid);
    setInvalidState(password, passValue.length < 6);

    if (!identifierValid || passValue.length < 6) {
      showToast('Enter valid login credentials.', 'error');
      return;
    }

    const btn = $('#loginBtn');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Logging in...';
    }

    setTimeout(() => {
      if (role === 'admin') {
        showToast('Admin login successful. Opening control panel UI.', 'success');
        window.location.href = 'admin-panel.html';
        return;
      }

      loginForm.hidden = true;
      const success = $('#loginSuccess');
      if (success) success.hidden = false;
      showToast('Login success state shown. Backend pending.', 'success');
    }, 700);
  });
}

const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('[name="name"]', contactForm);
    const phone = $('[name="phone"]', contactForm);

    const nameValid = !!name && name.value.trim().length >= 2;
    const phoneValid = !!phone && /^\d{10}$/.test(phone.value.trim());

    setInvalidState(name, !nameValid);
    setInvalidState(phone, !phoneValid);

    if (!nameValid || !phoneValid) {
      showToast('Please add valid name and 10-digit phone.', 'error');
      return;
    }

    contactForm.reset();
    showToast('Thanks! We will contact you soon.', 'success');
  });
}

function initAdminCrud() {
  const adminGrid = $('.admin-grid');
  if (!adminGrid) return;

  const models = {
    program: {
      formId: 'programForm',
      bodyId: 'programTableBody',
      fields: ['program', 'mode', 'classRange', 'fee'],
      seed: [
        { program: 'Board Booster', mode: 'Hybrid', classRange: 'Class 10', fee: '2200' },
        { program: 'Foundation Plus', mode: 'Online', classRange: 'Class 8', fee: '1800' }
      ]
    },
    class: {
      formId: 'classForm',
      bodyId: 'classTableBody',
      fields: ['className', 'board', 'session', 'status'],
      seed: [
        { className: 'Class 10', board: 'CBSE', session: '2026-27', status: 'Active' },
        { className: 'Class 12', board: 'CBSE', session: '2026-27', status: 'Planned' }
      ]
    },
    subject: {
      formId: 'subjectForm',
      bodyId: 'subjectTableBody',
      fields: ['subject', 'stream', 'mappedClass', 'weeklySlots'],
      seed: [
        { subject: 'Physics', stream: 'Science', mappedClass: 'Class 11', weeklySlots: '3' },
        { subject: 'Maths', stream: 'Middle', mappedClass: 'Class 8', weeklySlots: '4' }
      ]
    },
    batch: {
      formId: 'batchForm',
      bodyId: 'batchTableBody',
      fields: ['batch', 'programName', 'capacity', 'schedule'],
      seed: [
        { batch: 'Batch A Evening', programName: 'Board Booster', capacity: '20', schedule: 'Mon/Wed/Fri 6 PM' },
        { batch: 'Batch B Morning', programName: 'Foundation Plus', capacity: '16', schedule: 'Tue/Thu/Sat 8 AM' }
      ]
    }
  };

  const state = {};
  Object.keys(models).forEach((k) => { state[k] = [...models[k].seed]; });

  function tableRow(moduleKey, item, index) {
    const row = document.createElement('tr');
    models[moduleKey].fields.forEach((f) => {
      const td = document.createElement('td');
      td.textContent = item[f] ?? '';
      row.appendChild(td);
    });
    const actions = document.createElement('td');
    actions.className = 'action-buttons';
    actions.innerHTML = `<button type="button" class="btn-mini" data-edit="${moduleKey}" data-index="${index}">Edit</button>
      <button type="button" class="btn-mini delete" data-delete="${moduleKey}" data-index="${index}">Delete</button>`;
    row.appendChild(actions);
    return row;
  }

  function render(moduleKey) {
    const body = document.getElementById(models[moduleKey].bodyId);
    if (!body) return;
    body.innerHTML = '';
    state[moduleKey].forEach((item, i) => body.appendChild(tableRow(moduleKey, item, i)));
  }

  function resetForm(form) {
    form.reset();
    const editIdx = form.querySelector('[name="editIndex"]');
    if (editIdx) editIdx.value = '';
    $$('input, select, textarea', form).forEach((c) => setInvalidState(c, false));
  }

  function validateForm(form) {
    let valid = true;
    $$('input, select, textarea', form).forEach((c) => {
      if (c.name === 'editIndex') return;
      const isValid = c.checkValidity();
      setInvalidState(c, !isValid);
      if (!isValid) valid = false;
    });
    return valid;
  }

  function formDataObject(form, fields) {
    const data = new FormData(form);
    const out = {};
    fields.forEach((f) => { out[f] = (data.get(f) || '').toString().trim(); });
    return out;
  }

  Object.entries(models).forEach(([moduleKey, meta]) => {
    const form = document.getElementById(meta.formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(form)) {
        showToast('Please complete required fields.', 'error');
        return;
      }
      const editIdx = form.querySelector('[name="editIndex"]');
      const idx = editIdx && editIdx.value !== '' ? Number(editIdx.value) : -1;
      const payload = formDataObject(form, meta.fields);

      if (idx >= 0) {
        state[moduleKey][idx] = payload;
        showToast(`${moduleKey} updated successfully.`, 'success');
      } else {
        state[moduleKey].push(payload);
        showToast(`${moduleKey} added successfully.`, 'success');
      }
      render(moduleKey);
      resetForm(form);
    });
  });

  document.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit]');
    const deleteBtn = e.target.closest('[data-delete]');
    const resetBtn = e.target.closest('[data-reset]');

    if (resetBtn) {
      const form = document.getElementById(resetBtn.dataset.reset);
      if (form) resetForm(form);
    }

    if (editBtn) {
      const moduleKey = editBtn.dataset.edit;
      const idx = Number(editBtn.dataset.index);
      const meta = models[moduleKey];
      const form = document.getElementById(meta.formId);
      const rowData = state[moduleKey][idx];
      if (!form || !rowData) return;
      meta.fields.forEach((f) => {
        const input = form.querySelector(`[name="${f}"]`);
        if (input) input.value = rowData[f] ?? '';
      });
      const editIdx = form.querySelector('[name="editIndex"]');
      if (editIdx) editIdx.value = String(idx);
      showToast(`Editing ${moduleKey}.`, 'info');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (deleteBtn) {
      const moduleKey = deleteBtn.dataset.delete;
      const idx = Number(deleteBtn.dataset.index);
      state[moduleKey].splice(idx, 1);
      render(moduleKey);
      showToast(`${moduleKey} deleted.`, 'success');
    }
  });

  Object.keys(models).forEach((k) => render(k));
}

initAdminCrud();

window.switchMode = function switchMode(btn, showId, hideId) {
  const showEl = document.getElementById(showId);
  const hideEl = document.getElementById(hideId);
  if (showEl) showEl.style.display = 'grid';
  if (hideEl) hideEl.style.display = 'none';
  $$('.filter-btn').forEach((el) => el.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

window.buyNow = function buyNow(item, price) {
  const modal = $('#buy-modal');
  const title = $('#modal-title');
  const link = $('#modal-wa');

  if (!modal || !title || !link) {
    showToast(`Selected: ${item} (Rs.${price})`, 'info');
    return;
  }

  title.textContent = `${item} - Rs.${price}`;
  const msg = encodeURIComponent(`Hi Utkarsh Team, I want to buy: ${item} (Rs.${price}). Please share payment steps.`);
  link.href = `https://wa.me/919999999999?text=${msg}`;
  modal.style.display = 'flex';
};
