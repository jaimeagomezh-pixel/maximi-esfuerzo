// ═══════════════════════════════════════════════════════════════
// GSAP ANIMATIONS · MáximoEsfuerzo.cl  v2
// ═══════════════════════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// 1. HERO fade-in
// ─────────────────────────────────────────────────────────────
function animateHero() {
  const heroElements = document.querySelectorAll('#hero .hero-txt, #hero .hero-img-wrap');
  if (heroElements.length) {
    gsap.fromTo(heroElements,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// 2. SCROLL REVEAL para secciones públicas (fuera del dashboard)
// ─────────────────────────────────────────────────────────────
function animateSections() {
  document.querySelectorAll('body > section').forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 82%', toggleActions: 'play none none none' }
      }
    );
  });
}

// ─────────────────────────────────────────────────────────────
// 3. CARDS stagger
// ─────────────────────────────────────────────────────────────
function animateCards() {
  document.querySelectorAll('.plan-card, .pcard').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });
}

// ─────────────────────────────────────────────────────────────
// 4. HOVER en botones públicos
// ─────────────────────────────────────────────────────────────
function addButtonHovers() {
  document.querySelectorAll('.plan-card button, .nav-cta, .login-btn-primary, .f-btn').forEach(btn => {
    if (btn.dataset.gsapHover) return;
    btn.dataset.gsapHover = '1';
    btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.03, duration: 0.25, ease: 'power2.out' }));
    btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' }));
  });
}

// ─────────────────────────────────────────────────────────────
// 5. MODAL de pago: fade + scale
// ─────────────────────────────────────────────────────────────
function animateModals() {
  const originalAbrirModal = window.abrirModal;
  if (!originalAbrirModal) return;
  window.abrirModal = function(nombre, precio, desc) {
    originalAbrirModal.call(this, nombre, precio, desc);
    const ov = document.getElementById('modalOverlay');
    if (!ov) return;
    gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power1.inOut' });
    const modal = ov.querySelector('.login-modal, .modal-content, [class*="modal"]');
    if (modal) gsap.fromTo(modal, { opacity: 0, scale: 0.94, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' });
  };
}

// ─────────────────────────────────────────────────────────────
// 6. LOGIN overlay
// ─────────────────────────────────────────────────────────────
function animateLoginOverlay() {
  const originalAbrirLogin = window.abrirLogin;
  if (!originalAbrirLogin) return;
  window.abrirLogin = function() {
    originalAbrirLogin.call(this);
    const ov = document.getElementById('loginOverlay');
    if (!ov) return;
    gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    const modal = ov.querySelector('.login-modal');
    if (modal) gsap.fromTo(modal, { opacity: 0, scale: 0.92, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' });
  };
}

// ─────────────────────────────────────────────────────────────
// 7. MOBILE MENU hamburguesa pública
// ─────────────────────────────────────────────────────────────
function animateMenuMobile() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  const originalToggle = window.toggleMenu;
  if (!originalToggle) return;
  window.toggleMenu = function() {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      gsap.to(menu, { opacity: 0, y: -16, duration: 0.25, ease: 'power2.inOut', onComplete: () => originalToggle.call(this) });
    } else {
      originalToggle.call(this);
      gsap.fromTo(menu, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
    }
  };
}

// ─────────────────────────────────────────────────────────────
// 8. CHARTS — fade-in de canvas (no interfiere con el width)
// ─────────────────────────────────────────────────────────────
function animateNewCharts() {
  const seen = new WeakSet();
  const observer = new MutationObserver(() => {
    document.querySelectorAll('canvas').forEach(canvas => {
      if (seen.has(canvas)) return;
      seen.add(canvas);
      gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.7, delay: 0.1, ease: 'power1.inOut' });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ─────────────────────────────────────────────────────────────
// 9. FIX HEADER STICKY del dashboard atleta
//    Mueve .dash-header fuera de .dashboard-box para que nunca
//    scrollee — queda fijo en la cima del contenedor fixed.
// ─────────────────────────────────────────────────────────────
function fixDashboardHeader() {
  const dash = document.getElementById('dashboardAtleta');
  if (!dash || dash.dataset.headerFixed) return;

  const header = dash.querySelector('.dash-header');
  const box    = dash.querySelector('.dashboard-box');
  if (!header || !box) return;

  dash.dataset.headerFixed = '1';

  // Insertar el header como hermano ANTES de .dashboard-box
  dash.insertBefore(header, box);

  // #dashboardAtleta pasa a columna + sin scroll propio
  dash.style.flexDirection  = 'column';
  dash.style.overflow       = 'hidden';
  dash.style.alignItems     = 'stretch';

  // Header: no scrollea, siempre visible
  header.style.flexShrink   = '0';
  header.style.position     = 'relative';
  header.style.zIndex       = '200';
  header.style.width        = '100%';

  // .dashboard-box es el área scrolleable
  box.style.flex                    = '1';
  box.style.overflowY               = 'auto';
  box.style.webkitOverflowScrolling = 'touch';
  box.style.minHeight               = '0';
  box.style.overflowX               = 'hidden';

  // Entrada animada del header
  gsap.fromTo(header,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
  );
}

// ─────────────────────────────────────────────────────────────
// 10. NAVEGACIÓN ENTRE SECCIONES (al final de cada sección)
//     Se agrega después de que buildCardNav() asigna IDs dashSec0…N
// ─────────────────────────────────────────────────────────────
function buildSectionFooterNav() {
  const dash = document.getElementById('dashboardAtleta');
  if (!dash) return;

  const accords = [...dash.querySelectorAll('.me-accord')];
  if (!accords.length || !accords[0].id) return; // buildCardNav no corrió aún

  accords.forEach((acc, idx) => {
    const body = acc.querySelector('.me-accord-body');
    if (!body || body.querySelector('.gsap-footer-nav')) return;

    // Construir lista de otras secciones
    const otros = accords.filter((_, i) => i !== idx);
    if (!otros.length) return;

    const nav = document.createElement('div');
    nav.className = 'gsap-footer-nav';
    nav.style.cssText = `
      margin-top:32px; padding:20px 16px 8px;
      border-top:1px solid rgba(0,229,240,0.15);
    `;

    const titulo = document.createElement('div');
    titulo.style.cssText = `
      font-family:'Barlow Condensed',sans-serif; font-size:10px; letter-spacing:3px;
      color:rgba(255,255,255,0.35); text-transform:uppercase; margin-bottom:12px;
    `;
    titulo.textContent = 'IR A';
    nav.appendChild(titulo);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex; flex-wrap:wrap; gap:8px;';

    otros.forEach(otroAcc => {
      const lbl = otroAcc.querySelector('.me-accord-label');
      const iconEl = otroAcc.querySelector('.me-accord-icon');
      if (!lbl) return;

      const btn = document.createElement('button');
      const accent = {
        'endurance':'#00e5f0','fuerza':'#d4a843','potencia':'#e07b00',
        'rucking':'#00e5f0','composición':'#00e5f0','composicion':'#00e5f0',
        'nutrición':'#27ae60','nutricion':'#27ae60'
      }[lbl.textContent.trim().toLowerCase()] || '#00e5f0';

      btn.style.cssText = `
        display:flex; align-items:center; gap:7px;
        padding:9px 14px; border-radius:8px;
        border:1px solid rgba(255,255,255,0.12);
        background:rgba(255,255,255,0.04);
        color:#e0ddd8; cursor:pointer;
        font-family:'Barlow Condensed',sans-serif;
        font-size:13px; letter-spacing:1.5px; text-transform:uppercase;
        transition: border-color .2s, background .2s, color .2s;
      `;

      // Icono pequeño (clona SVG del accordion)
      if (iconEl) {
        const svg = iconEl.querySelector('svg');
        if (svg) {
          const s = svg.cloneNode(true);
          s.setAttribute('width', '16'); s.setAttribute('height', '16');
          s.style.flexShrink = '0';
          s.style.stroke = accent;
          btn.appendChild(s);
        }
      }

      const span = document.createElement('span');
      span.textContent = lbl.textContent.trim();
      btn.appendChild(span);

      btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = accent;
        btn.style.background  = `rgba(0,0,0,0.15)`;
        btn.style.color       = accent;
        gsap.to(btn, { scale: 1.03, duration: 0.2 });
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'rgba(255,255,255,0.12)';
        btn.style.background  = 'rgba(255,255,255,0.04)';
        btn.style.color       = '#e0ddd8';
        gsap.to(btn, { scale: 1, duration: 0.2 });
      });

      btn.addEventListener('click', () => {
        if (typeof window.openDashSection === 'function') {
          window.openDashSection(otroAcc.id);
        }
      });

      grid.appendChild(btn);
    });

    nav.appendChild(grid);
    body.appendChild(nav);
  });
}

// ─────────────────────────────────────────────────────────────
// 11. ANIMACIONES DE SCROLL dentro de cada sección del dashboard
//     ScrollTrigger usa .dashboard-box como scroller (no window)
// ─────────────────────────────────────────────────────────────

function setupSectionScrollAnimations(secEl) {
  const scroller = document.querySelector('#dashboardAtleta .dashboard-box');
  if (!scroller || !secEl) return;

  const opts = { scroller, start: 'top 88%', toggleActions: 'play none none none' };

  // Títulos de sub-sección: línea que entra desde la izquierda
  secEl.querySelectorAll('.dash-section-title').forEach(el => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    gsap.fromTo(el,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out',
        scrollTrigger: { trigger: el, ...opts } }
    );
  });

  // Celdas de stats: stagger fade-up en grupo
  secEl.querySelectorAll('.dash-stats-row, .th-working-max').forEach(row => {
    if (row.dataset.gsapAnim) return;
    row.dataset.gsapAnim = '1';
    const cells = row.querySelectorAll('.dash-stat-cell, .th-wm-value, .th-wm-label');
    if (cells.length) {
      gsap.fromTo(cells,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
          scrollTrigger: { trigger: row, ...opts } }
      );
    } else {
      gsap.fromTo(row,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: row, ...opts } }
      );
    }
  });

  // Gráficos: fade-up + ligero scale
  secEl.querySelectorAll('.dash-chart-card, .th-chart-container, .th-chart-wrap').forEach(el => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    gsap.fromTo(el,
      { opacity: 0, y: 28, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, ...opts } }
    );
  });

  // Filas de zonas FC (última actividad): stagger desde izquierda
  secEl.querySelectorAll('.dash-zone-row').forEach((row, i) => {
    if (row.dataset.gsapAnim) return;
    row.dataset.gsapAnim = '1';
    gsap.fromTo(row,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.4, delay: i * 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: row, ...opts } }
    );
  });

  // Barras del resumen mensual (resZonasFC): fade + grow
  secEl.querySelectorAll('#resZonasFC').forEach(el => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    const animarBarrasMensual = () => {
      const rows2 = el.querySelectorAll('div[style*="display:flex"]');
      gsap.fromTo(rows2,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
      );
      // Barras de color: animar width
      el.querySelectorAll('div[style*="height:100%"]').forEach((bar, i) => {
        const tw = bar.style.width || '0%';
        if (tw === '0%') return;
        bar.style.width = '0%';
        gsap.to(bar, { width: tw, duration: 0.85, delay: i * 0.08, ease: 'power2.out' });
      });
    };
    // Observar cuando el contenido se renderiza
    new MutationObserver(() => { if (el.children.length) { animarBarrasMensual(); } })
      .observe(el, { childList: true });
  });

  // Cards rkFTP y resultado de tests: entrada dramática
  secEl.querySelectorAll('.rkr').forEach(el => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    gsap.fromTo(el,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.3)',
        scrollTrigger: { trigger: el, ...opts } }
    );
  });

  // Elementos genéricos con padding/margin visibles (subsecciones planas)
  secEl.querySelectorAll('.dash-connect-card, .me-live-badge').forEach((el, i) => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    gsap.fromTo(el,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, delay: i * 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: el, ...opts } }
    );
  });

  // Refresh ScrollTrigger para que detecte las nuevas alturas
  ScrollTrigger.refresh();
}

// ─────────────────────────────────────────────────────────────
// 12. BARRAS FC + scroll animations al abrir sección
// ─────────────────────────────────────────────────────────────
function animateFCBarsOnOpen() {
  const originalOpen = window.openDashSection;
  if (!originalOpen || window._gsapOpenWrapped) return;
  window._gsapOpenWrapped = true;

  window.openDashSection = function(id) {
    originalOpen.call(this, id);

    setTimeout(() => {
      const secEl = document.getElementById(id);
      if (secEl) setupSectionScrollAnimations(secEl);
    }, 120);
  };
}

// ─────────────────────────────────────────────────────────────
// 12. WATCH DASHBOARD — ejecuta fixes cuando el dashboard abre
// ─────────────────────────────────────────────────────────────
function watchDashboard() {
  const dash = document.getElementById('dashboardAtleta');
  if (!dash) return;

  const observer = new MutationObserver(() => {
    if (!dash.classList.contains('open')) return;

    // Fix header sticky (solo una vez)
    fixDashboardHeader();

    // Esperar a que buildCardNav asigne IDs (ocurre justo después)
    setTimeout(() => {
      buildSectionFooterNav();
      animateFCBarsOnOpen();
    }, 300);
  });

  observer.observe(dash, { attributes: true, attributeFilter: ['class'] });
}

// ─────────────────────────────────────────────────────────────
// 13. INIT
// ─────────────────────────────────────────────────────────────
function initGSAPAnimations() {
  function run() {
    animateHero();
    animateSections();
    animateCards();
    addButtonHovers();
    animateModals();
    animateLoginOverlay();
    animateMenuMobile();
    animateNewCharts();
    watchDashboard();

    // Re-aplicar hovers cuando el DOM cambia
    new MutationObserver(() => {
      addButtonHovers();
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}

initGSAPAnimations();
