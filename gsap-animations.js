// ═══════════════════════════════════════════════════════════════
// GSAP ANIMATIONS · MáximoEsfuerzo.cl
// Optimización completa: scroll triggers, hover, modales, gráficos
// ═══════════════════════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ─ UTILIDAD: Delay aleatorio entre elementos ─
const staggerDelay = (i) => i * 0.08;

// ═══════════════════════════════════════════════════════════════
// 1. HERO & HERO SLIDER
// ═══════════════════════════════════════════════════════════════

function animateHero() {
  // Fade-in del hero texto + imagen
  const heroElements = document.querySelectorAll('#hero .hero-txt, #hero .hero-img-wrap');
  if (heroElements.length > 0) {
    gsap.fromTo(
      heroElements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2
      }
    );
  }

  // Slider fades
  const slides = document.querySelectorAll('#heroSlider .slide');
  if (slides.length > 0) {
    gsap.fromTo(
      slides,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay: 0.5
      }
    );
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. SECCIONES - Scroll Reveal
// ═══════════════════════════════════════════════════════════════

function animateSections() {
  // Cada sección fade-in + slide up al entrar en viewport
  document.querySelectorAll('section, .psec').forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ═══════════════════════════════════════════════════════════════
// 3. CARDS & LISTAS - Stagger
// ═══════════════════════════════════════════════════════════════

function animateCards() {
  // Tarjetas de planes
  document.querySelectorAll('.plan-card, .pcard').forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: staggerDelay(i),
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Cards atletas (panel coach)
  document.querySelectorAll('.acard').forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: staggerDelay(i),
        ease: 'power2.out'
      }
    );
  });

  // Stats boxes
  document.querySelectorAll('.sbox').forEach((box, i) => {
    gsap.fromTo(
      box,
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: staggerDelay(i),
        ease: 'back.out(1.3)',
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ═══════════════════════════════════════════════════════════════
// 4. BOTONES - Hover Effects
// ═══════════════════════════════════════════════════════════════

function addButtonHovers() {
  // Botones principales
  document.querySelectorAll('button:not(.me-accord-btn), .btn-ingresar, .nav-cta, .login-btn-primary').forEach((btn) => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Botones filtro
  document.querySelectorAll('.f-btn').forEach((btn) => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -2,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        duration: 0.25,
        ease: 'power2.out'
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 5. MODALES - Open/Close Animations
// ═══════════════════════════════════════════════════════════════

function animateModals() {
  // Interceptar abrirModal
  const originalAbrirModal = window.abrirModal;
  window.abrirModal = function(nombre, precio, desc) {
    originalAbrirModal.call(this, nombre, precio, desc);

    const overlay = document.getElementById('modalOverlay');
    const modal = overlay?.querySelector('.modal-content, .login-modal');

    if (overlay && modal) {
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power1.inOut' }
      );

      gsap.fromTo(
        modal,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }
  };

  // Cerrar modal con animación
  const originalCerrarModal = window.cerrarModal;
  if (originalCerrarModal) {
    window.cerrarModal = function() {
      const overlay = document.getElementById('modalOverlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.inOut',
          onComplete: () => {
            originalCerrarModal.call(this);
          }
        });
      }
    };
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. LOGIN OVERLAY
// ═══════════════════════════════════════════════════════════════

function animateLoginOverlay() {
  const originalAbrirLogin = window.abrirLogin;
  if (originalAbrirLogin) {
    window.abrirLogin = function() {
      const overlay = document.getElementById('loginOverlay');
      originalAbrirLogin.call(this);

      if (overlay) {
        const modal = overlay.querySelector('.login-modal');
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power1.inOut' }
        );

        if (modal) {
          gsap.fromTo(
            modal,
            { opacity: 0, scale: 0.92, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
          );
        }
      }
    };
  }

  const originalCerrarLogin = window.cerrarLogin;
  if (originalCerrarLogin) {
    window.cerrarLogin = function() {
      const overlay = document.getElementById('loginOverlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.inOut',
          onComplete: () => {
            originalCerrarLogin.call(this);
          }
        });
      }
    };
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. MOBILE MENU
// ═══════════════════════════════════════════════════════════════

function animateMenuMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    const originalToggleMenu = window.toggleMenu;
    window.toggleMenu = function() {
      const isOpen = menu.classList.contains('open');

      if (isOpen) {
        // Cerrar
        gsap.to(menu, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            originalToggleMenu.call(this);
          }
        });
      } else {
        // Abrir
        originalToggleMenu.call(this);
        gsap.fromTo(
          menu,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      }
    };
  }
}

// ═══════════════════════════════════════════════════════════════
// 8. GRÁFICOS - Animación de barras Chart.js + Scroll Trigger
// ═══════════════════════════════════════════════════════════════

function animateCharts() {
  // Animar todos los canvas de gráficos con scroll trigger
  document.querySelectorAll('canvas').forEach((canvas) => {
    const container = canvas.closest('.th-chart-wrap') || canvas.parentElement;

    gsap.fromTo(
      canvas,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Re-animar charts cuando se carguen nuevos datos
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    return originalFetch.apply(this, args).then((response) => {
      // Después de 500ms, volver a animar charts
      setTimeout(() => {
        document.querySelectorAll('canvas').forEach((canvas) => {
          if (!canvas.dataset.animatedGsap) {
            canvas.dataset.animatedGsap = true;
            gsap.fromTo(
              canvas,
              { opacity: 0 },
              { opacity: 1, duration: 0.5 }
            );
          }
        });
      }, 500);
      return response;
    });
  };
}

// ═══════════════════════════════════════════════════════════════
// 9. ACORDEÓN - Smooth expand/collapse
// ═══════════════════════════════════════════════════════════════

function animateAccordion() {
  document.querySelectorAll('.me-accord-btn').forEach((btn) => {
    btn.addEventListener('click', function() {
      const body = this.nextElementSibling;
      const arrow = this.querySelector('.me-accord-arrow');

      if (this.classList.contains('is-open')) {
        // Cerrar
        gsap.to(body, {
          maxHeight: 0,
          duration: 0.35,
          ease: 'power2.inOut'
        });

        gsap.to(arrow, {
          rotation: 0,
          duration: 0.35
        });
      } else {
        // Abrir
        gsap.to(body, {
          maxHeight: 6000,
          duration: 0.35,
          ease: 'power2.inOut'
        });

        gsap.to(arrow, {
          rotation: 180,
          duration: 0.35
        });
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 10. SCROLL ANIMATIONS - Parallax suave (opcional)
// ═══════════════════════════════════════════════════════════════

function addParallaxEffect() {
  document.querySelectorAll('.hero-slider .slide img').forEach((img) => {
    gsap.to(img, {
      y: (i, target) => -window.innerHeight * 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top top',
        scrub: 1,
        markers: false
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// 10a. ANIMACIÓN DE BARRAS DE ZONAS FC
// ═══════════════════════════════════════════════════════════════

function animateFCZones() {
  // Observar el contenedor de zonas FC
  const zonasContainer = document.getElementById('resZonasFC');
  if (!zonasContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animar todas las barras dentro
        const bars = zonasContainer.querySelectorAll('div[style*="background"]');
        bars.forEach((bar, i) => {
          const innerBar = bar.querySelector('div[style*="width"]');
          if (innerBar && !innerBar.dataset.animated) {
            innerBar.dataset.animated = true;
            const width = innerBar.style.width;
            innerBar.style.width = '0';

            gsap.to(innerBar, {
              width: width,
              duration: 0.9,
              delay: i * 0.1,
              ease: 'power2.out'
            });
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(zonasContainer);

  // Re-observar cuando el contenido cambia
  const mutationObserver = new MutationObserver(() => {
    observer.observe(zonasContainer);
  });

  mutationObserver.observe(zonasContainer, {
    childList: true,
    subtree: true
  });
}

// ═══════════════════════════════════════════════════════════════
// 10b. NAVEGACIÓN ENTRE SECCIONES DEL DASHBOARD
// ═══════════════════════════════════════════════════════════════

function createSectionNavigation() {
  const secciones = [
    { id: 'tab-atletas', label: 'Atletas', icon: '👥' },
    { id: 'tab-resumen', label: 'Resumen', icon: '📊' },
    { id: 'tab-nutricion', label: 'Nutrición', icon: '🥗' },
    { id: 'tab-rucking', label: 'Rucking', icon: '🎒' },
    { id: 'tab-entrenamiento', label: 'Entrenamiento', icon: '💪' }
  ];

  // Función para insertar navegación al final de cada sección
  function insertNavigation() {
    secciones.forEach((sec, idx) => {
      const secEl = document.getElementById(sec.id);
      if (!secEl || secEl.querySelector('.gsap-section-nav')) return;

      const navHtml = `
        <div class="gsap-section-nav" style="margin-top:40px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
          ${secciones.map((s, i) => `
            <button onclick="document.getElementById('${s.id}').scrollIntoView({behavior:'smooth'}); this.classList.add('active');"
              style="padding:10px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);background:${s.id === sec.id ? 'rgba(212,168,67,0.2)' : 'transparent'};color:#fff;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:13px;letter-spacing:1px;text-transform:uppercase;transition:all 0.3s;${s.id === sec.id ? 'border-color:#d4a843;' : ''}"
              onmouseover="this.style.borderColor='#d4a843';this.style.background='rgba(212,168,67,0.15)';"
              onmouseout="this.style.borderColor='${s.id === sec.id ? '#d4a843' : 'rgba(255,255,255,0.2)'}';this.style.background='${s.id === sec.id ? 'rgba(212,168,67,0.2)' : 'transparent'}';"
            >${s.icon} ${s.label}</button>
          `).join('')}
        </div>
      `;

      const navEl = document.createElement('div');
      navEl.innerHTML = navHtml;
      secEl.appendChild(navEl.firstElementChild);
    });
  }

  // Insertar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertNavigation);
  } else {
    insertNavigation();
  }

  // Reinsertar cuando el contenido cambia
  const observer = new MutationObserver(() => {
    setTimeout(insertNavigation, 100);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false
  });
}

// ═══════════════════════════════════════════════════════════════
// 11. INIT - Ejecutar todas las animaciones
// ═══════════════════════════════════════════════════════════════

function initGSAPAnimations() {
  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    animateHero();
    animateSections();
    animateCards();
    addButtonHovers();
    animateModals();
    animateLoginOverlay();
    animateMenuMobile();
    animateCharts();
    animateFCZones();
    animateAccordion();
    addParallaxEffect();
    createSectionNavigation();

    // Re-iniciar animaciones cuando el contenido cambia dinámicamente
    const observer = new MutationObserver(() => {
      // Pequeño delay para que se renderice el DOM
      setTimeout(() => {
        addButtonHovers();
        animateAccordion();
        animateCharts();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });
  }
}

// Ejecutar automáticamente
initGSAPAnimations();
