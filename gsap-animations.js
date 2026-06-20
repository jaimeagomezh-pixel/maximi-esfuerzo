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

  const srBottom = scroller.getBoundingClientRect().bottom;

  // Elementos ya visibles → animación directa con stagger de posición
  // Elementos debajo del fold → ScrollTrigger cuando entran al viewport
  let visibleIdx = 0;
  function animate(el, fromV, toV) {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    const rect = el.getBoundingClientRect();
    if (rect.top < srBottom) {
      // Ya visible: animar con delay escalonado por orden de aparición
      gsap.fromTo(el, fromV, { ...toV, delay: visibleIdx * 0.07 });
      visibleIdx++;
    } else {
      // Bajo el fold: ScrollTrigger
      gsap.fromTo(el, fromV, {
        ...toV,
        scrollTrigger: {
          trigger: el, scroller,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      });
    }
  }

  // Títulos: desliz desde izquierda
  secEl.querySelectorAll('.dash-section-title').forEach(el =>
    animate(el, { opacity: 0, x: -22 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
  );

  // Stat cells: fade-up
  secEl.querySelectorAll('.dash-stat-cell').forEach(el =>
    animate(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
  );

  // Encabezados de métricas
  secEl.querySelectorAll('.th-working-max').forEach(el =>
    animate(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' })
  );

  // Gráficos: fade + scale
  secEl.querySelectorAll('.dash-chart-card, .th-chart-container').forEach(el =>
    animate(el, { opacity: 0, y: 24, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power2.out' })
  );

  // Filas de zonas FC (última actividad): cascade izquierda
  secEl.querySelectorAll('.dash-zone-row').forEach(el =>
    animate(el, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.38, ease: 'power2.out' })
  );

  // Cards resultado test: entrada con rebote
  secEl.querySelectorAll('.rkr, .flat-box').forEach(el =>
    animate(el, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(1.2)' })
  );

  // Elementos varios: fade-up simple
  secEl.querySelectorAll('.dash-connect-card, .me-live-badge').forEach(el =>
    animate(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' })
  );

  // Barras mensuales (resZonasFC): observar cuando se renderizan y animar width
  secEl.querySelectorAll('#resZonasFC').forEach(el => {
    if (el.dataset.gsapAnim) return;
    el.dataset.gsapAnim = '1';
    const doAnim = () => {
      el.querySelectorAll('div[style*="height:100%"]').forEach((bar, i) => {
        const tw = bar.style.width || '0%';
        if (tw === '0%') return;
        bar.style.width = '0%';
        gsap.to(bar, { width: tw, duration: 0.9, delay: i * 0.08, ease: 'power2.out' });
      });
    };
    if (el.children.length) doAnim();
    else new MutationObserver((_, ob) => { if (el.children.length) { ob.disconnect(); doAnim(); } })
      .observe(el, { childList: true });
  });

  ScrollTrigger.refresh();
}

// Anima las barras de zonas FC de la ÚLTIMA ACTIVIDAD (#zBar1-#zBar5).
// cargarZonasActividad pone style.transition CSS en los bars; hay que
// limpiarlo antes de que GSAP tome el control o ambos se anulan entre sí.
function animarBarrasZonaFC() {
  const barIds = ['zBar5', 'zBar4', 'zBar3', 'zBar2', 'zBar1'];
  const bars = barIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!bars.length) return;

  function doGrow() {
    bars.forEach((bar, i) => {
      const tw = bar.style.width;
      if (!tw || tw === '0%') return;
      bar.style.transition = 'none'; // matar transición CSS para que no interfiera
      bar.style.width = '0%';
      void bar.offsetWidth; // forzar reflow
      gsap.to(bar, {
        width: tw,
        duration: 0.88,
        delay: i * 0.1,
        ease: 'power2.out',
        onComplete: () => { bar.style.transition = ''; }
      });
    });
  }

  const hasData = bars.some(b => b.style.width && b.style.width !== '0%');
  if (hasData) { doGrow(); return; }

  // Si los datos aún no llegaron de Strava, esperar con MutationObserver
  let done = false;
  const obs = new MutationObserver(() => {
    if (done) return;
    if (bars.some(b => b.style.width && b.style.width !== '0%')) {
      done = true;
      obs.disconnect();
      setTimeout(doGrow, 80);
    }
  });
  bars.forEach(bar => obs.observe(bar, { attributes: true, attributeFilter: ['style'] }));
  setTimeout(() => { if (!done) obs.disconnect(); }, 8000);
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

    // Scroll al tope de la sección al navegar entre secciones
    const box = document.querySelector('#dashboardAtleta .dashboard-box');
    if (box) box.scrollTop = 0;

    setTimeout(() => {
      const secEl = document.getElementById(id);
      if (secEl) {
        setupSectionScrollAnimations(secEl);
        animarBarrasZonaFC(); // barras coloreadas de la última actividad
      }
    }, 150);
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
