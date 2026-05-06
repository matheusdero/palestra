/* ================================================================
   countdown.js – Timer + Butter Scroll + Form Validation
   Palestra Finanças com Torrente
   ================================================================ */

// ------- COUNTDOWN -------
function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;

  // 25 May 2026 18:00 Porto Velho (UTC‑4)
  const target = new Date('2026-05-25T18:00:00-04:00');

  const labels = ['Dias', 'Horas', 'Min', 'Seg'];
  const divs   = [24*3600000, 3600000, 60000, 1000];

  function tick() {
    let diff = target - new Date();
    if (diff <= 0) {
      el.innerHTML = '<div class="unit"><span>🔴</span><small>AO VIVO</small></div>';
      clearInterval(timer);
      return;
    }
    el.innerHTML = divs.map((d, i) => {
      const v = Math.floor(diff / d);
      diff %= d;
      return `<div class="unit"><span>${String(v).padStart(2,'0')}</span><small>${labels[i]}</small></div>`;
    }).join('');
  }

  tick();
  const timer = setInterval(tick, 1000);
}

// ------- BUTTER SCROLL (IntersectionObserver) -------
function butterScroll() {
  const items = document.querySelectorAll('.fade-in');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
}

// ------- SMOOTH SCROLL (butter-like via JS) -------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
}

// ------- FORM VALIDATION -------
function initFormValidation() {
  const form = document.getElementById('form-inscricao');
  if (!form) return;

  form.addEventListener('submit', e => {
    const errEl = document.getElementById('form-error');
    errEl.className = 'form-msg'; // reset
    errEl.textContent = '';

    const nome  = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const tel   = document.getElementById('whatsapp').value.trim();
    const qtde  = parseInt(document.getElementById('qtde').value, 10);

    const errors = [];
    if (nome.length < 3) errors.push('Informe seu nome completo.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('E‑mail inválido.');
    if (!/^\(?[0-9]{2}\)?[\s.-]?9?[0-9]{4}[\s.-]?[0-9]{4}$/.test(tel.replace(/\s/g, '')))
      errors.push('Telefone inválido. Use o formato (69) 9 9999-9999.');
    if (isNaN(qtde) || qtde < 1) errors.push('Selecione pelo menos 1 ingresso.');

    if (errors.length) {
      e.preventDefault();
      errEl.className = 'form-msg error';
      errEl.textContent = errors.join(' ');
    }
  });
}

// ------- BOOT -------
document.addEventListener('DOMContentLoaded', () => {
  startCountdown();
  butterScroll();
  initSmoothScroll();
  initFormValidation();
});
