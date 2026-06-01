  function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }

  function abrirModal(nombre, precio, desc) {
    document.getElementById('modalNombre').textContent = nombre;
    document.getElementById('modalPrecio').textContent = precio;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal(e) {
    if (!e || e.target === document.getElementById('modalOverlay')) {
      document.getElementById('modalOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
  }



  // ── FRASES MOTIVACIONALES ──
  const frases = [
    { frase: "El dolor que sientes hoy es la fuerza que sentirás mañana.", autor: "— Anónimo" },
    { frase: "El cuerpo debe ser tratado con rigor para que no desobedezca a la mente.", autor: "— Séneca" },
    { frase: "La disciplina es el puente entre metas y logros.", autor: "— Jim Rohn" },
    { frase: "No busques que sea fácil, busca que valga la pena.", autor: "— Anónimo" },
    { frase: "La fuerza no viene de la capacidad física. Viene de una voluntad indomable.", autor: "— Gandhi" },
    { frase: "Sufre el dolor del entrenamiento o sufre el dolor del arrepentimiento.", autor: "— Anónimo" },
    { frase: "El éxito no se otorga. Se gana en la sala de pesas, en la pista, en el campo.", autor: "— Anónimo" },
    { frase: "La mente ordena, el cuerpo ejecuta. Nunca al revés.", autor: "— Anónimo" },
    { frase: "Cuando creas que no puedes más, recuerda por qué empezaste.", autor: "— Anónimo" },
    { frase: "La victoria pertenece al más perseverante.", autor: "— Napoleón Bonaparte" },
    { frase: "No se trata de ser el mejor. Se trata de ser mejor que ayer.", autor: "— Anónimo" },
    { frase: "El único entrenamiento malo es el que no existe.", autor: "— Anónimo" },
    { frase: "Entrena como si tu vida dependiera de ello. Porque podría.", autor: "— Anónimo" },
    { frase: "La comodidad es el enemigo del progreso.", autor: "— P.T. Barnum" },
    { frase: "El hombre que mueve montañas comienza cargando pequeñas piedras.", autor: "— Confucio" },
    { frase: "No hay atajos hacia ningún lugar que valga la pena ir.", autor: "— Beverly Sills" },
    { frase: "La resistencia no es solo física. Es mental, emocional y espiritual.", autor: "— Anónimo" },
    { frase: "Cada repetición es un voto a favor de quien quieres convertirte.", autor: "— Anónimo" },
    { frase: "Los campeones no se hacen en los gimnasios. Se hacen con deseo, sueños y visión.", autor: "— Muhammad Ali" },
    { frase: "El sudor de hoy es el triunfo de mañana.", autor: "— Anónimo" },
    { frase: "Cuando más duro es el entrenamiento, más fácil es la batalla.", autor: "— Anónimo" },
    { frase: "La mente se rinde antes que el cuerpo.", autor: "— Anónimo" },
    { frase: "Forja tu cuerpo como forjas tu carácter: con constancia y fuego.", autor: "— Anónimo" },
    { frase: "No hay límites. Solo hay mesetas, y no debes quedarte ahí.", autor: "— Bruce Lee" },
    { frase: "El dolor es temporal. El orgullo es para siempre.", autor: "— Anónimo" },
    { frase: "Nadie que haya dado lo mejor de sí ha lamentado haberlo hecho.", autor: "— George Halas" },
    { frase: "La excelencia no es un acto, es un hábito.", autor: "— Aristóteles" },
    { frase: "Primero domina tu cuerpo. Luego domina todo lo demás.", autor: "— Anónimo" },
    { frase: "La motivación te pone en marcha. El hábito te mantiene en movimiento.", autor: "— Jim Ryun" },
    { frase: "El guerrero no se prepara cuando llega la batalla. Se prepara antes.", autor: "— Anónimo" },
    { frase: "Un cuerpo fuerte hace una mente fuerte.", autor: "— Thomas Jefferson" },
    { frase: "Eres más fuerte de lo que crees y más capaz de lo que imaginas.", autor: "— Anónimo" },
    { frase: "La fatiga hace cobardes a todos.", autor: "— Vince Lombardi" },
    { frase: "Cuida tu cuerpo. Es el único lugar donde tienes que vivir.", autor: "— Jim Rohn" },
    { frase: "El entrenamiento duro tiene su recompensa. La pereza, también.", autor: "— Anónimo" },
    { frase: "El que no arriesga no gana. El que no entrena no llega.", autor: "— Anónimo" },
    { frase: "Haz hoy lo que otros no harán. Mañana lograrás lo que otros no podrán.", autor: "— Anónimo" },
    { frase: "El guerrero que gana no es el más talentoso. Es el más preparado.", autor: "— Anónimo" },
    { frase: "Mide tu progreso contra ti mismo, no contra los demás.", autor: "— Anónimo" },
    { frase: "La constancia convierte lo imposible en inevitable.", autor: "— Anónimo" },
    { frase: "El cuerpo logra lo que la mente cree.", autor: "— Anónimo" },
    { frase: "No te detengas cuando estés cansado. Detente cuando hayas terminado.", autor: "— Anónimo" },
    { frase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", autor: "— Robert Collier" },
    { frase: "En el campo de batalla de la vida, el soldado más preparado siempre triunfa.", autor: "— Anónimo" },
    { frase: "El músculo más importante que debes entrenar está entre tus orejas.", autor: "— Anónimo" },
    { frase: "Levántate, sigue, supérate.", autor: "— Anónimo" },
    { frase: "Los límites existen solo en la mente.", autor: "— Anónimo" },
    { frase: "El sacrificio de hoy es la victoria de mañana.", autor: "— Anónimo" },
    { frase: "Ser fuerte es la única opción. Todo lo demás es excusa.", autor: "— Anónimo" },
    { frase: "Haz del esfuerzo tu identidad, no tu esfuerzo.", autor: "— Anónimo" },
  ];

  function getFraseDelDia() {
    const hoy = new Date().toDateString();
    const stored = localStorage.getItem('fraseDelDia');
    const storedDate = localStorage.getItem('fraseFecha');
    if (stored && storedDate === hoy) {
      return JSON.parse(stored);
    }
    const idx = Math.floor(Math.random() * frases.length);
    localStorage.setItem('fraseDelDia', JSON.stringify(frases[idx]));
    localStorage.setItem('fraseFecha', hoy);
    return frases[idx];
  }

  function mostrarRegistro() {
    alert('Próximamente: registro con email. Por ahora usa Google.');
  }

  // ── DASHBOARD ──
  function abrirDashboard(nombre) {
    try {
      cerrarLogin();
      localStorage.setItem('atletaNombre', nombre);
      localStorage.setItem('dashboardOpen', 'true');
      const frase = getFraseDelDia();
      
      // Actualizar nombre
      const elNombre = document.getElementById('dashNombre');
      if (elNombre) elNombre.textContent = nombre.toUpperCase();
      
      // Actualizar letra avatar (ID correcto: dashAvatarLetter)
      const elLetra = document.getElementById('dashAvatarLetter');
      if (elLetra) elLetra.textContent = nombre.charAt(0).toUpperCase();
      
      // Frase motivacional
      const elFrase = document.getElementById('dashFrase');
      if (elFrase) elFrase.textContent = frase.frase;
      const elAutor = document.getElementById('dashAutor');
      if (elAutor) elAutor.textContent = frase.autor;
      
      // Abrir dashboard
      const dash = document.getElementById('dashboardAtleta');
      if (dash) {
        dash.classList.add('open');
        document.body.style.overflow = 'hidden';
        // Init charts and real data after DOM is ready
        setTimeout(() => {
          if (typeof initCharts === 'function') initCharts();
          if (typeof initPRChart === 'function') initPRChart();
          if (typeof initStrengthChart === 'function') initStrengthChart();
          if (typeof loadRealTHData === 'function') loadRealTHData();
          if (typeof loadManualTimes === 'function') loadManualTimes();
          if (typeof initZonasCarrera    === 'function') initZonasCarrera();
          if (typeof initRuckingAtleta   === 'function') initRuckingAtleta();
          if (typeof lucide !== 'undefined') lucide.createIcons();
          // Animaciones de entrada
          if (typeof activarAnimaciones === 'function') activarAnimaciones();
          setTimeout(() => {
            if (typeof animarNumeros === 'function') animarNumeros();
            if (typeof agregarPulseDot === 'function') agregarPulseDot();
          }, 400);
          // Cargar datos reales de Strava si hay token guardado
          const stravaToken = localStorage.getItem('strava_token');
          const stravaExpiry = localStorage.getItem('strava_expiry');
          if (stravaToken && stravaExpiry && Date.now() / 1000 < parseInt(stravaExpiry)) {
            cargarDatosStrava(stravaToken);
          }
        }, 200);
      }
      
      // Cargar foto si hay guardada
      if (typeof cargarFotoGuardada === 'function') cargarFotoGuardada();
      
      // Actualizar botón nav
      const btnText = document.getElementById('btnIngresarText');
      if (btnText) btnText.textContent = nombre;
      
    } catch(e) {
      console.error('Error abriendo dashboard:', e);
      // Fallback: abrir igual
      const dash = document.getElementById('dashboardAtleta');
      if (dash) { dash.classList.add('open'); document.body.style.overflow = 'hidden'; }
    }
  }

  function cerrarDash() {
    document.getElementById('dashboardAtleta').classList.remove('open');
    document.body.style.overflow = '';
    localStorage.setItem('dashboardOpen', 'false');
  }

  function cerrarDashClick(e) {
    if (e.target === document.getElementById('dashboardAtleta')) cerrarDash();
  }

  function cerrarSesion() {
    cerrarDash();
    const btnTextReset = document.getElementById('btnIngresarText');
    if (btnTextReset) btnTextReset.textContent = 'Atleta';
  }

  // ── HERO SLIDER ──
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  let sliderInterval;

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  // Pausar en hover
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    heroEl.addEventListener('mouseleave', startSlider);
  }


  // ── STRAVA INTEGRATION ──
  const STRAVA_CLIENT_ID = '249036';
  const STRAVA_REDIRECT   = encodeURIComponent('https://maximi-esfuerzo.pages.dev');
  const STRAVA_SCOPE      = 'read,activity:read_all';
  const STRAVA_WORKER     = 'https://strava-auth.jaimea-gomezh.workers.dev/exchange';

  function conectarStrava() {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=https://maximi-esfuerzo.pages.dev&response_type=code&scope=${STRAVA_SCOPE}&approval_prompt=force`;
    window.location.href = authUrl;
  }

  async function cargarDatosStrava(accessToken) {
    try {
      // Marcar Strava como conectado
      const stravaCard = document.getElementById('btnStrava');
      if (stravaCard) {
        stravaCard.classList.add('conectado');
        const stravaStatus = document.getElementById('stravaStatus');
        if (stravaStatus) stravaStatus.textContent = '✓ Conectado';
      }

      // Última actividad
      const actRes = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=1', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      });
      const actividades = await actRes.json();

      if (actividades.length > 0) {
        const a = actividades[0];

        // Nombre y fecha
        const fecha = new Date(a.start_date_local);
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString('es', { month: 'short' });
        const hora = fecha.getHours().toString().padStart(2,'0') + ':' + fecha.getMinutes().toString().padStart(2,'0');
        const elNombre = document.getElementById('actNombre');
        const elFecha  = document.getElementById('actFecha');
        if (elNombre) elNombre.textContent = a.name || 'Actividad';
        if (elFecha)  elFecha.textContent  = `${dia} ${mes} · ${hora}`;

        // Distancia
        const elDist = document.getElementById('actDist');
        if (elDist) elDist.textContent = (a.distance / 1000).toFixed(2);

        // Tiempo
        const totalSeg = a.moving_time;
        const hh = Math.floor(totalSeg / 3600);
        const mm = Math.floor((totalSeg % 3600) / 60).toString().padStart(2,'0');
        const ss = (totalSeg % 60).toString().padStart(2,'0');
        const elTiempo = document.getElementById('actTiempo');
        if (elTiempo) elTiempo.textContent = hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;

        // Ritmo (solo para actividades terrestres)
        if (a.distance > 0 && a.type !== 'Swim') {
          const ritmoSeg = totalSeg / (a.distance / 1000);
          const rMin = Math.floor(ritmoSeg / 60);
          const rSeg = Math.round(ritmoSeg % 60).toString().padStart(2,'0');
          const elRitmo = document.getElementById('actRitmo');
          if (elRitmo) elRitmo.textContent = `${rMin}:${rSeg}`;
        }

        // FC media
        const fcProm = a.average_heartrate || '--';
        const elFC = document.getElementById('actFC');
        if (elFC) elFC.textContent = typeof fcProm === 'number' ? Math.round(fcProm) : fcProm;

        // Métricas globales
        const kcal = a.calories || Math.round(totalSeg / 60 * 8);
        const elKcal = document.getElementById('mKcalQuem');
        const elFCm  = document.getElementById('mFC');
        if (elKcal) elKcal.textContent = kcal.toLocaleString();
        if (elFCm)  elFCm.textContent  = typeof fcProm === 'number' ? Math.round(fcProm) : fcProm;

        // Icono según tipo de actividad
        actualizarIconoActividad(a.type);

        // Streams reales para gráficos FC y Ritmo
        cargarStreamsActividad(accessToken, a.id, a.type);
      }

      // PRs automáticos en background
      cargarPRsStrava(accessToken);

      // Info del atleta — guardar ID para sincronización de rucking
      const atletaRes  = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      });
      const atletaData = await atletaRes.json();
      if (atletaData.id) {
        localStorage.setItem('strava_athlete_id', String(atletaData.id));
        // Sincronizar rucking guardado si hay sesiones previas
        const prevSessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
        if (prevSessions.length) pushRuckingToCloud(prevSessions);
      }
      return atletaData;

    } catch(e) {
      console.error('Strava error:', e);
    }
  }

  // ── ICONOS POR TIPO DE ACTIVIDAD ──
  function actualizarIconoActividad(tipo) {
    const c = '#C9A84C';
    const a = `width="30" height="30" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = {
      Run:           `<svg viewBox="0 0 24 24" ${a}><circle cx="14" cy="4" r="1.5"/><path d="M7 21l4-9 3 3 3-6"/><path d="M9 13l-2.5 4"/><path d="M15 12l1.5 4"/></svg>`,
      Walk:          `<svg viewBox="0 0 24 24" ${a}><circle cx="12" cy="4" r="1.5"/><path d="M12 7l-3 3 5 2"/><path d="M10 14l-3 4"/><path d="M10 14l2 7"/><path d="M14 17l2 4"/></svg>`,
      Hike:          `<svg viewBox="0 0 24 24" ${a}><path d="M3 20l6-12 4 8 3-6 5 10"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
      Ride:          `<svg viewBox="0 0 24 24" ${a}><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="14" cy="6" r="1.5"/><path d="M14 7.5L11 11H6.5l4-4.5"/><path d="M11 11l5.5 4.5"/><path d="M5.5 17.5L9.5 13"/></svg>`,
      VirtualRide:   `<svg viewBox="0 0 24 24" ${a}><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="14" cy="6" r="1.5"/><path d="M14 7.5L11 11H6.5l4-4.5"/><path d="M11 11l5.5 4.5"/><path d="M5.5 17.5L9.5 13"/></svg>`,
      EBikeRide:     `<svg viewBox="0 0 24 24" ${a}><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/><circle cx="14" cy="6" r="1.5"/><path d="M14 7.5L11 11H6.5l4-4.5"/><path d="M11 11l5.5 4.5"/><path d="M5.5 17.5L9.5 13"/><path d="M11 3l-2 3"/></svg>`,
      Swim:          `<svg viewBox="0 0 24 24" ${a}><circle cx="15" cy="7" r="1.5"/><path d="M13 9l-5 5 3 2-1 3"/><path d="M8 14l-2.5 2"/><path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>`,
      WeightTraining:`<svg viewBox="0 0 24 24" ${a}><line x1="6" y1="5" x2="6" y2="19"/><line x1="18" y1="5" x2="18" y2="19"/><line x1="3" y1="8" x2="3" y2="16"/><line x1="21" y1="8" x2="21" y2="16"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
      Workout:       `<svg viewBox="0 0 24 24" ${a}><line x1="6" y1="5" x2="6" y2="19"/><line x1="18" y1="5" x2="18" y2="19"/><line x1="3" y1="8" x2="3" y2="16"/><line x1="21" y1="8" x2="21" y2="16"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
      CrossFit:      `<svg viewBox="0 0 24 24" ${a}><line x1="6" y1="5" x2="6" y2="19"/><line x1="18" y1="5" x2="18" y2="19"/><line x1="3" y1="8" x2="3" y2="16"/><line x1="21" y1="8" x2="21" y2="16"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
      Rowing:        `<svg viewBox="0 0 24 24" ${a}><circle cx="12" cy="5" r="1.5"/><path d="M10 7l-4 6h8"/><line x1="4" y1="13" x2="20" y2="13"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>`,
      Kayaking:      `<svg viewBox="0 0 24 24" ${a}><circle cx="12" cy="5" r="1.5"/><path d="M10 7l-4 6h8"/><line x1="4" y1="13" x2="20" y2="13"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>`,
      Soccer:        `<svg viewBox="0 0 24 24" ${a}><circle cx="12" cy="12" r="9"/><path d="M12 3l3 5.5h-6z"/><path d="M3.5 13l3.5-2"/><path d="M20.5 13l-3.5-2"/><path d="M9.5 20l2.5-4 2.5 4"/></svg>`,
      Skiing:        `<svg viewBox="0 0 24 24" ${a}><circle cx="13" cy="4" r="1.5"/><path d="M11 6l2 5-5 4 1 4 9 2"/><line x1="2" y1="21" x2="22" y2="21"/></svg>`,
      NordicSki:     `<svg viewBox="0 0 24 24" ${a}><circle cx="13" cy="4" r="1.5"/><path d="M11 6l2 5-5 4 1 4 9 2"/><line x1="2" y1="21" x2="22" y2="21"/></svg>`,
      Yoga:          `<svg viewBox="0 0 24 24" ${a}><circle cx="12" cy="4" r="1.5"/><path d="M8 9l4 3 4-3"/><path d="M12 12v5"/><path d="M8 15l4 3 4-3"/></svg>`,
      Elliptical:    `<svg viewBox="0 0 24 24" ${a}><ellipse cx="12" cy="12" rx="7" ry="4" transform="rotate(-30 12 12)"/><circle cx="12" cy="5.5" r="1.5"/><line x1="12" y1="7" x2="12" y2="10"/></svg>`,
    };
    const defaultIcon = `<svg viewBox="0 0 24 24" ${a}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;

    let el = document.getElementById('actTypeIcon');
    if (!el) {
      el = document.createElement('div');
      el.id = 'actTypeIcon';
      el.style.cssText = 'margin-bottom:8px;line-height:1;';
      const nombre = document.getElementById('actNombre');
      if (nombre && nombre.parentElement) nombre.parentElement.insertBefore(el, nombre);
    }
    el.innerHTML = icons[tipo] || defaultIcon;
  }

  // ── HELPER: muestrear array a N puntos uniformes ──
  function muestrarDatos(arr, n) {
    if (!arr || arr.length === 0) return [];
    if (arr.length <= n) return [...arr];
    const step = (arr.length - 1) / (n - 1);
    return Array.from({length: n}, (_, i) => arr[Math.round(i * step)]);
  }

  // ── ZONAS FC DESDE STRAVA ──
  async function cargarZonasActividad(token, actId) {
    // Limpiar siempre antes de cargar, para que no queden datos de otra actividad
    for (let z = 1; z <= 5; z++) {
      const elTime = document.getElementById('zTime' + z);
      const elPct  = document.getElementById('zPct' + z);
      const elBar  = document.getElementById('zBar' + z);
      if (elTime) elTime.textContent = '--:--';
      if (elPct)  elPct.textContent  = '—';
      if (elBar)  elBar.style.width  = '0%';
    }
    try {
      const res = await fetch(
        `https://www.strava.com/api/v3/activities/${actId}/zones`,
        { headers: { 'Authorization': 'Bearer ' + token } }
      );
      const zonas = await res.json();
      // Buscar la distribución de HR zones
      const hrZone = Array.isArray(zonas) ? zonas.find(z => z.type === 'heartrate') : null;
      if (!hrZone || !hrZone.distribution_buckets) return;

      const buckets = hrZone.distribution_buckets; // [z1, z2, z3, z4, z5]
      const totalSeg = buckets.reduce((sum, b) => sum + b.time, 0);
      if (totalSeg === 0) return;

      // Mapear: bucket[0]=Z1, bucket[1]=Z2, ..., bucket[4]=Z5
      // En el HTML: z1=Calent, z2=Suave, z3=Aerób, z4=Umbral, z5=Máx
      buckets.forEach((b, i) => {
        const z = i + 1; // 1-5
        const seg = b.time;
        const pct = Math.round(seg / totalSeg * 100);
        const mm = Math.floor(seg / 60).toString().padStart(2,'0');
        const ss = (seg % 60).toString().padStart(2,'0');
        const timeStr = mm + ':' + ss;

        const elTime = document.getElementById('zTime' + z);
        const elPct  = document.getElementById('zPct' + z);
        const elBar  = document.getElementById('zBar' + z);
        if (elTime) elTime.textContent = timeStr;
        if (elPct)  elPct.textContent  = pct + '%';
        if (elBar)  elBar.style.width  = pct + '%';
      });
    } catch(e) { console.error('Zonas error:', e); }
  }

  // ── STREAMS DE STRAVA → GRÁFICOS REALES ──
  async function cargarStreamsActividad(token, actId, tipo) {
    const cardio = ['Run','Ride','VirtualRide','EBikeRide','Swim','Walk','Hike','Rowing','Kayaking','NordicSki','Skiing'];
    if (!cardio.includes(tipo)) return;
    try {
      // Cargar zonas FC en paralelo
      cargarZonasActividad(token, actId);
      const res = await fetch(
        `https://www.strava.com/api/v3/activities/${actId}/streams?keys=time,heartrate,velocity_smooth&key_by_type=true`,
        { headers: { 'Authorization': 'Bearer ' + token } }
      );
      const s = await res.json();
      const N = 22;

      // Gráfico FC
      if (chartFC && s.heartrate && s.time) {
        const hrS  = muestrarDatos(s.heartrate.data, N);
        const tS   = muestrarDatos(s.time.data, N);
        chartFC.data.labels = tS.map(t => Math.floor(t/60) + ':00');
        chartFC.data.datasets[0].data = hrS;
        chartFC.update('active');
      }

      // Gráfico Ritmo (m/s → min/km)
      if (chartRitmo && s.velocity_smooth && s.time) {
        const vel = s.velocity_smooth.data.map(v => v > 0.5 ? parseFloat(((1000/60)/v).toFixed(2)) : null);
        const vS  = muestrarDatos(vel, N);
        const tS  = muestrarDatos(s.time.data, N);
        chartRitmo.data.labels = tS.map(t => Math.floor(t/60) + ':00');
        chartRitmo.data.datasets[0].data = vS;
        chartRitmo.update('active');
      }
    } catch(e) { console.error('Streams error:', e); }
  }

  // ── PRs AUTOMÁTICOS DESDE STRAVA (con tolerancia GPS, paginado) ──
  const STRAVA_RUN_TYPES = new Set(['Run','TrailRun','VirtualRun','Treadmill']);

  async function fetchTodasLasCarreras(token) {
    const acts = [];
    for (let page = 1; page <= 5; page++) {          // máx 5 páginas × 200 = 1000 actividades
      const res = await fetch(
        `https://www.strava.com/api/v3/athlete/activities?per_page=200&page=${page}`,
        { headers: { 'Authorization': 'Bearer ' + token } }
      );
      const batch = await res.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      acts.push(...batch.filter(a => a.distance > 0));  // todas las actividades con distancia
      if (batch.length < 200) break;                    // última página
    }
    return acts;
  }

  // ── RUCKING: detección desde Strava ───────────────────────────
  const RUCK_DIST_CATS = [5,8,10,12,15,18,20,25,30,32,35,40]; // km

  function parseLastreKg(name) {
    const m = (name || '').match(/lastre\s+(\d+)\s*kg/i);
    return m ? parseInt(m[1]) : null;
  }

  function detectarRuckingDesdeStrava(allActs) {
    const ruckActs = allActs.filter(a =>
      (a.type === 'Walk' || a.type === 'Hike') && parseLastreKg(a.name) !== null
    );
    if (!ruckActs.length) return;

    const existing   = JSON.parse(localStorage.getItem('ruckSessions') || '[]');
    const knownIds   = new Set(existing.map(s => s.stravaId).filter(Boolean));
    let   added      = 0;

    for (const a of ruckActs) {
      if (knownIds.has(String(a.id))) continue;
      const load    = parseLastreKg(a.name);
      const distKm  = a.distance / 1000;
      const tSec    = a.moving_time;
      const elevM   = Math.round(a.total_elevation_gain || 0);
      const dateStr = (a.start_date_local || '').split('T')[0] || new Date().toISOString().split('T')[0];

      // Redondear a categoría de distancia más cercana (±15%)
      let distCat = parseFloat(distKm.toFixed(2));
      let minDiff = Infinity;
      for (const d of RUCK_DIST_CATS) {
        const diff = Math.abs(distKm - d);
        if (diff < minDiff) { minDiff = diff; distCat = d; }
      }
      // Si supera 15% de tolerancia, usar la distancia real redondeada a 1 decimal
      if (minDiff / distCat > 0.15) distCat = parseFloat(distKm.toFixed(1));

      existing.push({
        id:       Date.now().toString() + '_' + a.id,
        stravaId: String(a.id),
        date:     dateStr,
        dist:     distCat,
        distReal: parseFloat(distKm.toFixed(2)),
        load,
        time:     tSec,
        elev:     elevM,
        notes:    a.name,
        terrain:  1.2,
        source:   'strava'
      });
      knownIds.add(String(a.id));
      added++;
    }

    if (added > 0) {
      localStorage.setItem('ruckSessions', JSON.stringify(existing));
      pushRuckingToCloud(existing);
      if (typeof updateRuckingDashboard === 'function') updateRuckingDashboard();
    }
  }

  // Empuja todas las sesiones de rucking al Worker (Cloudflare KV)
  // También registra el nombre del atleta para que el coach pueda encontrarlo
  async function pushRuckingToCloud(sessions) {
    const stravaId = localStorage.getItem('strava_athlete_id');
    if (!stravaId) return;
    const nombre = localStorage.getItem('atletaNombre') || '';
    try {
      await fetch('https://flow-payments.jaimea-gomezh.workers.dev/rucking/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stravaId, sessions, nombre })
      });
    } catch(e) { console.warn('[Rucking] Cloud sync error:', e); }
  }

  async function cargarPRsStrava(token) {
    try {
      // Indicador de sincronización
      const stravaCard   = document.getElementById('btnStrava');
      const stravaStatus = document.getElementById('stravaStatus');
      if (stravaCard)   stravaCard.classList.add('sincronizando');
      if (stravaStatus) stravaStatus.textContent = 'Sincronizando historial…';

      const allActs = await fetchTodasLasCarreras(token);
      const runs    = allActs.filter(a => STRAVA_RUN_TYPES.has(a.type));

      if (stravaCard)   stravaCard.classList.remove('sincronizando');
      if (stravaStatus) stravaStatus.textContent = `✓ ${runs.length} carreras cargadas`;

      if (runs.length === 0) return;

      // Tolerancia GPS: ±50m en todas las distancias
      const cats = {
        '1km':   { t:  1000, lo:  950, hi:  1050 },
        '2km':   { t:  2000, lo: 1950, hi:  2050 },
        '2400m': { t:  2400, lo: 2350, hi:  2450 },
        '5km':   { t:  5000, lo: 4950, hi:  5050 },
        '8km':   { t:  8000, lo: 7950, hi:  8050 },
        '10km':  { t: 10000, lo: 9950, hi: 10050 },
        '12km':  { t: 12000, lo:11950, hi: 12050 },
        '15km':  { t: 15000, lo:14950, hi: 15050 },
        '21km':  { t: 21097, lo:21047, hi: 21147 },
        '42km':  { t: 42195, lo:42145, hi: 42245 },
      };

      const updatedKeys = [];
      for (const [key, {t, lo, hi}] of Object.entries(cats)) {
        const match = runs.filter(a => a.distance >= lo && a.distance <= hi);
        if (!match.length) continue;
        prData[key] = match
          .map(a => ({
            date:    new Date(a.start_date_local),
            seconds: Math.round(a.moving_time * (t / a.distance)),
            source:  'strava'
          }))
          .sort((a,b) => a.date - b.date);
        updatedKeys.push(key);
      }

      if (updatedKeys.length) {
        // ── Sincronizar con manualTimesHistory ─────────────────────────
        // Strava aporta el historial real de carreras; se guarda junto a
        // las entradas manuales del atleta (sin sobreescribirlas).
        const history = JSON.parse(localStorage.getItem('manualTimesHistory') || '{}');
        updatedKeys.forEach(key => {
          if (!history[key]) history[key] = [];
          // Remover entradas anteriores de Strava para este distancia
          history[key] = history[key].filter(e => e.source !== 'strava');
          // Añadir las nuevas desde Strava
          const stravaEntries = prData[key].map(e => ({
            date:   e.date.toISOString().slice(0, 10),
            time:   secToTime(e.seconds),
            source: 'strava'
          }));
          history[key] = [...history[key], ...stravaEntries]
            .sort((a, b) => a.date.localeCompare(b.date));
        });
        localStorage.setItem('manualTimesHistory', JSON.stringify(history));

        // Reconstruir prData combinando Strava + entradas manuales
        buildPRDataFromHistory(history);

        // Actualizar gráfico con la distancia activa
        const activeBtn = document.querySelector('.th-dist-btn.active');
        const m = activeBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
        const dist = m ? m[1] : updatedKeys[0];
        if (dist && prData[dist]) updatePRChart(dist);

        // Recalcular zonas e indicadores
        if (typeof mostrarUltimosRegistros === 'function') mostrarUltimosRegistros(history);
        if (typeof calcularZonasCarrera    === 'function') calcularZonasCarrera();
      }

      // Detectar actividad 5km nueva para sugerir actualización de zonas
      if (typeof checkStravaZonaUpdate === 'function') checkStravaZonaUpdate(runs);

      // Detectar sesiones de rucking (Walk/Hike con "Lastre XX kg" en el título)
      detectarRuckingDesdeStrava(allActs);

    } catch(e) { console.error('PRs Strava error:', e); }
  }

  // Revisar si hay token de Strava guardado
  function checkStravaToken() {
    const token = localStorage.getItem('strava_token');
    const expiry = localStorage.getItem('strava_expiry');
    if (token && expiry && Date.now() / 1000 < parseInt(expiry)) {
      cargarDatosStrava(token);
      return true;
    }
    return false;
  }

  // Manejar callback de Strava (código en URL)
  async function handleStravaCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (!code) return;

    window.history.replaceState({}, document.title, window.location.pathname);

    try {
      const res = await fetch(STRAVA_WORKER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem('strava_token', data.access_token);
        localStorage.setItem('strava_expiry', data.expires_at);
        cargarDatosStrava(data.access_token);
        const nombre = localStorage.getItem('atletaNombre') || 'Atleta';
        abrirDashboard(nombre);
      }
    } catch(e) {
      console.error('Error canjeando token:', e);
    }
  }

  // Ejecutar al cargar
  handleStravaCallback();
  checkStravaToken();


  function cambiarFoto(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.getElementById('dashAvatarImg');
      const letter = document.getElementById('dashAvatarLetter');
      img.src = e.target.result;
      img.style.display = 'block';
      if(letter) letter.style.display = 'none';
      localStorage.setItem('atletaFoto', e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function cargarFotoGuardada() {
    const foto = localStorage.getItem('atletaFoto');
    if (foto) {
      const img = document.getElementById('dashAvatarImg');
      const letter = document.getElementById('dashAvatarLetter');
      if (img) { img.src = foto; img.style.display = 'block'; if(letter) letter.style.display = 'none'; }
    }
  }


  // ── CHARTS DASHBOARD — ESTILO TRAINHEROIC ──
  function changeRange(chart, range, btn) {
    // Actualizar botón activo
    const container = btn.closest('.th-range-selector');
    container.querySelectorAll('.th-range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // En producción: recargar datos según rango desde Strava API
    if (chart === 'fc') updateFCChart(range);
    else updateRitmoChart(range);
  }

  function updateFCChart(range) {
    if (!chartFC) return;
    // Demo: datos simulados según rango
    const datasets = {
      '7d': [142,145,138,163,155,148,160],
      '1m': [138,142,145,150,148,155,160,158,163,155,148,145,142,150,155,160,163,158,155,148,142,138,145,150,155,158,163,155,148,145],
      '3m': Array.from({length:90},(_,i)=>130+Math.sin(i/8)*15+Math.random()*10),
      'all': Array.from({length:120},(_,i)=>128+Math.sin(i/10)*18+Math.random()*8)
    };
    const labels = { '7d':['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'], '1m':Array.from({length:30},(_,i)=>i+1+' May'), '3m':['Feb','Mar','Abr','May'].flatMap(m=>Array.from({length:30/4},(_,i)=>i===0?m:'')), 'all':Array.from({length:120},(_,i)=>i%30===0?`M${Math.floor(i/30)+1}`:'') };
    chartFC.data.labels = labels[range] || labels['all'];
    chartFC.data.datasets[0].data = datasets[range] || datasets['all'];
    chartFC.update('active');
  }

  function updateRitmoChart(range) {
    if (!chartRitmo) return;
    const datasets = {
      '7d': [5.2,4.9,5.1,4.4,4.8,5.0,4.6],
      '1m': Array.from({length:30},(_,i)=>5.5-i*0.03+Math.random()*0.3),
      '3m': Array.from({length:90},(_,i)=>5.8-i*0.012+Math.random()*0.25),
      'all': Array.from({length:120},(_,i)=>6.0-i*0.013+Math.random()*0.2)
    };
    chartRitmo.data.labels = Array.from({length:(datasets[range]||datasets['all']).length},(_,i)=>i);
    chartRitmo.data.datasets[0].data = datasets[range] || datasets['all'];
    chartRitmo.update('active');
  }

  // ── CHARTS DASHBOARD ──
  let chartFC = null;
  let chartRitmo = null;

  function initCharts() {
    const fcCtx = document.getElementById('chartFC');
    const ritmoCtx = document.getElementById('chartRitmo');
    if (!fcCtx || !ritmoCtx) return;
    // Destruir instancias previas si existen (evita "Canvas already in use")
    if (chartFC)    { try { chartFC.destroy();    } catch(e){} chartFC    = null; }
    if (chartRitmo) { try { chartRitmo.destroy(); } catch(e){} chartRitmo = null; }

    // Datos demo FC (simulando carrera de 43 min)
    const labels = Array.from({length: 22}, (_, i) => {
      const mins = i * 2;
      return mins + ':00';
    });

    const fcData = [95,112,128,138,145,152,158,161,163,165,164,166,168,165,163,164,166,168,170,172,168,163];
    const ritmoData = [5.2,4.8,4.5,4.4,4.3,4.3,4.2,4.3,4.2,4.2,4.3,4.2,4.1,4.2,4.3,4.2,4.1,4.2,4.3,4.1,4.2,4.4];

    const chartDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#d4a843',
        bodyColor: '#f5f0eb',
        borderColor: 'rgba(212,168,67,0.2)',
        borderWidth: 1,
      }},
      scales: {
        x: {
          ticks: { color: '#444', font: { size: 9 }, maxTicksLimit: 6 },
          grid: { color: 'rgba(0,0,0,0.06)' },
          border: { color: 'rgba(0,0,0,0.08)' }
        },
        y: {
          ticks: { color: '#555', font: { size: 9 } },
          grid: { color: 'rgba(0,0,0,0.06)' },
          border: { color: 'rgba(0,0,0,0.08)' }
        }
      },
      elements: { point: { radius: 0 }, line: { tension: 0.4, borderWidth: 2 } }
    };

    const thDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e24',
          titleColor: '#C9A84C',
          bodyColor: '#ffffff',
          borderColor: 'rgba(0,200,212,0.2)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
        }
      },
      scales: {
        x: {
          ticks: { color: '#666666', font: { size: 9 }, maxTicksLimit: 6 },
          grid: { color: 'rgba(0,0,0,0.06)' },
          border: { color: 'transparent' }
        },
        y: {
          ticks: { color: '#555555', font: { size: 9 } },
          grid: { color: 'rgba(0,0,0,0.06)', drawBorder: false },
          border: { color: 'transparent' }
        }
      },
      elements: {
        point: { radius: 0, hoverRadius: 0 },
        line: { tension: 0.3, borderWidth: 2, borderCapStyle: 'round' }
      }
    };

    // Chart FC
    chartFC = new Chart(fcCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: fcData,
          borderColor: '#e74c3c',
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0,0,0,120);
            g.addColorStop(0,'rgba(231,76,60,0.15)');
            g.addColorStop(1,'rgba(231,76,60,0)');
            return g;
          },
          fill: true,
        }]
      },
      options: { ...thDefaults, scales: { ...thDefaults.scales,
        y: { ...thDefaults.scales.y, min: 80, max: 200,
          ticks: { ...thDefaults.scales.y.ticks, callback: v => v + '' }
        }
      }}
    });

    // Chart Ritmo
    chartRitmo = new Chart(ritmoCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: ritmoData,
          borderColor: '#C9A84C',
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0,0,0,120);
            g.addColorStop(0,'rgba(0,200,212,0.12)');
            g.addColorStop(1,'rgba(0,200,212,0)');
            return g;
          },
          fill: true,
        }]
      },
      options: { ...thDefaults, scales: { ...thDefaults.scales,
        y: { ...thDefaults.scales.y, reverse: true, min: 3, max: 7,
          ticks: { ...thDefaults.scales.y.ticks, callback: v => {
            const m = Math.floor(v), s = Math.round((v-m)*60);
            return m+':'+(s<10?'0':'')+s;
          }}
        }
      }}
    });
  }

  // Inicializar charts cuando se abre el dashboard
  const origAbrirDash = abrirDashboard;


  // ── MEJORES TIEMPOS POR DISTANCIA ──
  let chartPR = null;
  let currentDist = '5km';

  // Datos simulados: array de {date, time_seconds} para cada distancia
  // Simula 1 mes de entrenamiento con mejora progresiva + variabilidad
  const prData = {
    '1km':   genPRData(60*3+45,   60*3+5,   16),  // 3:45 → 3:05
    '2km':   genPRData(60*8+10,   60*7+20,  14),
    '2400m': genPRData(60*9+50,   60*8+55,  12),
    '5km':   genPRData(60*22+48,  60*20+12, 18),  // 22:48 → 20:12
    '8km':   genPRData(60*38+20,  60*35+10, 12),
    '10km':  genPRData(60*48+30,  60*44+15, 15),
    '12km':  genPRData(60*59+0,   60*54+20, 10),
    '15km':  genPRData(60*75+0,   60*69+30, 8),
    '21km':  genPRData(60*112+0,  60*104+0, 6),
    '42km':  genPRData(60*245+0,  60*228+0, 4),
  };

  function genPRData(startSec, bestSec, count) {
    const dates = [];
    const now = new Date('2026-05-22');
    const entries = [];
    // Mejora progresiva con variabilidad natural
    for (let i = 0; i < count; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - Math.round((count - 1 - i) * (30 / count)));
      const progress = i / (count - 1);
      // Curva de mejora con ruido aleatorio
      const base = startSec - (startSec - bestSec) * Math.pow(progress, 0.7);
      const noise = (Math.random() - 0.4) * (startSec - bestSec) * 0.15;
      const t = Math.max(bestSec, Math.round(base + noise));
      entries.push({ date: d, seconds: t });
    }
    // Asegurar que el mejor tiempo esté en los últimos datos
    const minIdx = entries.reduce((min, e, i) => e.seconds < entries[min].seconds ? i : min, 0);
    if (minIdx < entries.length - 3) {
      const lastThird = entries.slice(Math.floor(entries.length * 0.65));
      const minLast = lastThird.reduce((a,b) => a.seconds < b.seconds ? a : b);
      const swapIdx = entries.indexOf(minLast);
      const tmp = entries[minIdx].seconds;
      entries[minIdx].seconds = entries[swapIdx].seconds;
      entries[swapIdx].seconds = bestSec;
    }
    return entries;
  }

  function secToTime(s) {
    const h = Math.floor(s/3600);
    const m = Math.floor((s%3600)/60);
    const sec = s%60;
    if (h > 0) return h+':'+String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
    return m+':'+String(sec).padStart(2,'0');
  }

  function formatDate(d) {
    return d.getDate() + ' ' + ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][d.getMonth()];
  }

  function selectDist(dist, btn) {
    currentDist = dist;
    document.querySelectorAll('.th-dist-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updatePRChart(dist);
  }

  function updatePRChart(dist) {
    const data = prData[dist];
    if (!data || !chartPR) return;

    const labels = data.map(e => formatDate(e.date));
    const values = data.map(e => e.seconds);
    const best    = Math.min(...values);
    const latest  = values[values.length - 1];           // más reciente (último en el array)
    const first   = values[0];
    const bestEntry = data.find(e => e.seconds === best);

    // Actualizar stats: mejor histórico y más reciente
    document.getElementById('prBest').textContent     = secToTime(best);
    document.getElementById('prBestDate').textContent = formatDate(bestEntry.date);
    document.getElementById('prFirst').textContent     = secToTime(latest);
    document.getElementById('prFirstDate').textContent = formatDate(data[data.length - 1].date);
    // Diferencia primer registro vs más reciente  (positivo = mejoró = más rápido)
    const diff    = first - latest;
    const pct     = first > 0 ? (Math.abs(diff) / first * 100).toFixed(1) : '0.0';
    const deltaEl = document.getElementById('prDelta');
    const subEl   = document.getElementById('prDeltaSub');
    if (diff > 0) {
      // Mejoró: tiempo bajó → triángulo verde apuntando arriba
      deltaEl.textContent = '▲ ' + secToTime(diff);
      deltaEl.style.color = '#27ae60';
      if (subEl) subEl.textContent = 'mejora · ' + pct + '%';
    } else if (diff < 0) {
      // Empeoró: tiempo subió → triángulo naranja apuntando abajo
      deltaEl.textContent = '▼ ' + secToTime(-diff);
      deltaEl.style.color = '#e67e22';
      if (subEl) subEl.textContent = 'disminución · ' + pct + '%';
    } else {
      deltaEl.textContent = '— igual';
      deltaEl.style.color = '';
      if (subEl) subEl.textContent = '';
    }

    // Puntos: dorado = mejor, cian = más reciente, gris = el resto
    const bestIdx   = values.indexOf(best);
    const latestIdx = values.length - 1;
    const pointRadius = values.map((_, i) =>
      i === bestIdx || i === latestIdx ? 5 : (values.length <= 8 ? 3 : 0)
    );
    const pointColors = values.map((_, i) => {
      if (i === bestIdx)   return '#d4a843';
      if (i === latestIdx) return '#C9A84C';
      return 'rgba(0,200,212,0.45)';
    });

    chartPR.data.labels = labels;
    chartPR.data.datasets[0].data = values;
    chartPR.data.datasets[0].pointRadius      = pointRadius;
    chartPR.data.datasets[0].pointHoverRadius = pointRadius.map(r => r + 2);
    chartPR.data.datasets[0].pointBackgroundColor = pointColors;
    chartPR.data.datasets[0].pointBorderColor     = pointColors;
    chartPR.options.scales.y.ticks.callback = v => secToTime(Math.round(v));
    chartPR.options.scales.y.reverse = true;

    // Ajustar rango Y
    const maxV   = Math.max(...values);
    const margin = Math.max((maxV - best) * 0.18, 5);
    chartPR.options.scales.y.min = best   - margin;
    chartPR.options.scales.y.max = maxV   + margin;

    chartPR.update('active');
  }

  function initPRChart() {
    const ctx = document.getElementById('chartPR');
    if (!ctx) return;
    if (chartPR) { try { chartPR.destroy(); } catch(e){} chartPR = null; }

    const data = prData['5km'];
    const labels = data.map(e => formatDate(e.date));
    const values = data.map(e => e.seconds);
    const best = Math.min(...values);
    const pointColors = values.map(v => v === best ? '#d4a843' : 'rgba(0,200,212,0.6)');
    const pointRadius = values.map(v => v === best ? 6 : 3);

    chartPR = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data: values,
          borderColor: '#C9A84C',
          backgroundColor: (ctx2) => {
            const g = ctx2.chart.ctx.createLinearGradient(0,0,0,160);
            g.addColorStop(0,'rgba(0,200,212,0.12)');
            g.addColorStop(1,'rgba(0,200,212,0)');
            return g;
          },
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500, easing: 'easeInOutQuart' },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1a1e24',
            titleColor: '#C9A84C',
            bodyColor: '#ffffff',
            borderColor: 'rgba(0,200,212,0.2)',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx3 => 'Tiempo: ' + secToTime(Math.round(ctx3.raw))
            }
          }
        },
        scales: {
          x: {
            ticks: { color: '#666666', font: { size: 9 }, maxTicksLimit: 8 },
            grid: { color: 'rgba(0,0,0,0.06)' },
            border: { color: 'transparent' }
          },
          y: {
            reverse: true,
            min: Math.min(...values) * 0.97,
            max: Math.max(...values) * 1.02,
            ticks: {
              color: '#555555',
              font: { size: 9 },
              callback: v => secToTime(Math.round(v))
            },
            grid: { color: 'rgba(0,0,0,0.06)' },
            border: { color: 'transparent' }
          }
        },
        elements: {
          line: { tension: 0.35, borderWidth: 2, borderCapStyle: 'round' }
        }
      }
    });
  }




  // ── DATOS REALES TRAINHEROIC ──
  const thRealData = {"Press con mancuernas en banca inclinada":[{"d":"2023-06-09","w":105.8,"r":7,"s":3,"e":131},{"d":"2023-07-10","w":25.0,"r":15,"s":3,"e":38},{"d":"2023-08-02","w":88.2,"r":13,"s":3,"e":126},{"d":"2023-08-29","w":49.6,"r":12,"s":3,"e":69},{"d":"2023-09-05","w":105.8,"r":12,"s":3,"e":148},{"d":"2023-11-27","w":88.2,"r":12,"s":3,"e":123},{"d":"2023-12-01","w":50.0,"r":12,"s":3,"e":70},{"d":"2023-12-05","w":99.2,"r":10,"s":3,"e":132},{"d":"2023-12-11","w":110.2,"r":10,"s":3,"e":147},{"d":"2023-12-28","w":105.8,"r":9,"s":3,"e":138},{"d":"2024-01-18","w":88.2,"r":12,"s":3,"e":123},{"d":"2024-01-29","w":88.2,"r":12,"s":3,"e":123},{"d":"2024-02-23","w":50.0,"r":12,"s":3,"e":70},{"d":"2024-03-15","w":123.5,"r":12,"s":3,"e":173},{"d":"2024-03-26","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-03-28","w":75.0,"r":15,"s":3,"e":112},{"d":"2024-04-15","w":110.2,"r":10,"s":3,"e":147},{"d":"2024-05-30","w":99.2,"r":10,"s":3,"e":132},{"d":"2024-06-11","w":123.5,"r":12,"s":3,"e":173},{"d":"2024-06-22","w":114.6,"r":12,"s":3,"e":160},{"d":"2024-06-27","w":114.6,"r":12,"s":3,"e":160},{"d":"2024-06-30","w":123.5,"r":11,"s":3,"e":169},{"d":"2024-07-11","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-07-17","w":105.8,"r":12,"s":3,"e":148},{"d":"2024-07-22","w":132.3,"r":15,"s":5,"e":198},{"d":"2024-09-01","w":105.8,"r":9,"s":3,"e":138},{"d":"2024-09-04","w":132.3,"r":12,"s":4,"e":185},{"d":"2024-09-09","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-09-21","w":141.1,"r":12,"s":4,"e":198},{"d":"2024-09-25","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-10-02","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-10-15","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-11-02","w":149.9,"r":8,"s":3,"e":190},{"d":"2024-11-11","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-12-01","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-12-05","w":110.2,"r":12,"s":3,"e":154},{"d":"2024-12-07","w":141.1,"r":10,"s":3,"e":188},{"d":"2024-12-11","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-12-27","w":123.5,"r":6,"s":3,"e":148},{"d":"2025-01-11","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-01-17","w":110.2,"r":10,"s":3,"e":147},{"d":"2025-01-24","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-01-28","w":132.3,"r":10,"s":4,"e":176},{"d":"2025-02-16","w":149.9,"r":10,"s":3,"e":200},{"d":"2025-03-10","w":132.3,"r":12,"s":3,"e":185},{"d":"2025-04-08","w":110.2,"r":12,"s":3,"e":154},{"d":"2025-04-12","w":132.3,"r":12,"s":4,"e":185},{"d":"2025-04-16","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-04-24","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-07-03","w":149.9,"r":12,"s":3,"e":210},{"d":"2025-07-20","w":149.9,"r":12,"s":4,"e":210},{"d":"2025-07-28","w":132.3,"r":12,"s":3,"e":185},{"d":"2025-08-03","w":158.7,"r":10,"s":4,"e":212},{"d":"2025-08-09","w":158.7,"r":9,"s":3,"e":206},{"d":"2025-08-18","w":149.9,"r":12,"s":3,"e":210},{"d":"2025-08-22","w":132.3,"r":12,"s":2,"e":185},{"d":"2025-08-25","w":123.5,"r":10,"s":3,"e":165},{"d":"2025-08-31","w":158.7,"r":12,"s":4,"e":222},{"d":"2025-10-26","w":149.9,"r":12,"s":3,"e":210},{"d":"2025-11-17","w":149.9,"r":12,"s":3,"e":210},{"d":"2025-11-23","w":158.7,"r":12,"s":4,"e":222},{"d":"2025-11-30","w":149.9,"r":10,"s":3,"e":200},{"d":"2025-12-28","w":158.7,"r":12,"s":3,"e":222},{"d":"2026-01-04","w":158.7,"r":12,"s":3,"e":222},{"d":"2026-01-11","w":158.7,"r":12,"s":3,"e":222},{"d":"2026-02-16","w":99.2,"r":8,"s":1,"e":126},{"d":"2026-02-18","w":132.3,"r":12,"s":3,"e":185},{"d":"2026-02-24","w":132.3,"r":12,"s":4,"e":185},{"d":"2026-03-07","w":132.3,"r":12,"s":3,"e":185}],"Curl de bíceps con mancuerna en banco inclinado":[{"d":"2023-07-11","w":12.5,"r":12,"s":3,"e":18},{"d":"2023-08-02","w":33.1,"r":5,"s":3,"e":39},{"d":"2023-08-12","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-08-29","w":27.6,"r":8,"s":3,"e":35},{"d":"2023-09-05","w":30.9,"r":12,"s":3,"e":43},{"d":"2023-10-11","w":15.0,"r":9,"s":3,"e":20},{"d":"2023-11-02","w":15.0,"r":9,"s":3,"e":20},{"d":"2023-11-14","w":17.5,"r":8,"s":3,"e":22},{"d":"2023-11-27","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-12-01","w":15.0,"r":6,"s":3,"e":18},{"d":"2023-12-05","w":38.6,"r":10,"s":3,"e":51},{"d":"2023-12-11","w":38.6,"r":12,"s":3,"e":54},{"d":"2023-12-27","w":18.0,"r":6,"s":3,"e":22},{"d":"2023-12-28","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-02-12","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-03-18","w":33.1,"r":8,"s":3,"e":42},{"d":"2024-06-27","w":30.9,"r":12,"s":3,"e":43},{"d":"2024-06-29","w":35.3,"r":12,"s":4,"e":49},{"d":"2024-07-14","w":44.1,"r":10,"s":3,"e":59},{"d":"2024-07-20","w":30.9,"r":10,"s":3,"e":41},{"d":"2024-09-12","w":33.1,"r":11,"s":3,"e":45},{"d":"2024-09-17","w":35.3,"r":11,"s":3,"e":48},{"d":"2024-10-01","w":44.1,"r":10,"s":3,"e":59},{"d":"2024-10-16","w":33.1,"r":11,"s":3,"e":45},{"d":"2024-11-11","w":35.3,"r":12,"s":4,"e":49},{"d":"2024-11-25","w":33.1,"r":12,"s":4,"e":46},{"d":"2024-11-27","w":38.6,"r":12,"s":3,"e":54},{"d":"2024-12-05","w":38.6,"r":12,"s":3,"e":54},{"d":"2024-12-29","w":44.1,"r":11,"s":4,"e":60},{"d":"2025-01-11","w":33.1,"r":10,"s":3,"e":44},{"d":"2025-01-24","w":44.1,"r":10,"s":3,"e":59},{"d":"2025-03-10","w":33.1,"r":10,"s":3,"e":44},{"d":"2025-04-10","w":44.1,"r":9,"s":4,"e":57},{"d":"2025-04-15","w":44.1,"r":8,"s":3,"e":56},{"d":"2025-05-13","w":44.1,"r":8,"s":3,"e":56},{"d":"2025-06-28","w":39.7,"r":6,"s":3,"e":48},{"d":"2025-07-03","w":35.3,"r":9,"s":3,"e":46},{"d":"2025-07-26","w":35.3,"r":10,"s":3,"e":47},{"d":"2025-08-01","w":35.3,"r":10,"s":3,"e":47},{"d":"2025-08-13","w":38.6,"r":10,"s":3,"e":51},{"d":"2025-08-17","w":35.3,"r":8,"s":3,"e":45},{"d":"2025-08-20","w":33.1,"r":12,"s":3,"e":46},{"d":"2025-08-24","w":44.1,"r":9,"s":3,"e":57},{"d":"2025-09-07","w":39.7,"r":9,"s":3,"e":52},{"d":"2025-09-08","w":30.9,"r":12,"s":3,"e":43},{"d":"2025-09-14","w":35.3,"r":12,"s":3,"e":49},{"d":"2025-09-28","w":44.1,"r":10,"s":3,"e":59},{"d":"2025-10-26","w":39.7,"r":10,"s":3,"e":53},{"d":"2025-10-29","w":30.9,"r":12,"s":3,"e":43},{"d":"2025-12-23","w":44.1,"r":9,"s":3,"e":57},{"d":"2026-01-11","w":44.1,"r":12,"s":3,"e":62},{"d":"2026-01-17","w":44.1,"r":8,"s":4,"e":56},{"d":"2026-02-01","w":35.3,"r":12,"s":3,"e":49},{"d":"2026-02-03","w":44.1,"r":12,"s":3,"e":62},{"d":"2026-02-16","w":44.1,"r":4,"s":3,"e":50},{"d":"2026-02-21","w":44.1,"r":6,"s":3,"e":53},{"d":"2026-02-25","w":38.6,"r":10,"s":3,"e":51},{"d":"2026-03-09","w":49.6,"r":10,"s":3,"e":66}],"Curl de bíceps alterno":[{"d":"2023-06-13","w":37.5,"r":10,"s":4,"e":50},{"d":"2023-07-11","w":15.0,"r":12,"s":3,"e":21},{"d":"2023-08-12","w":55.1,"r":6,"s":3,"e":66},{"d":"2023-09-07","w":44.1,"r":10,"s":3,"e":59},{"d":"2023-11-27","w":15.0,"r":15,"s":3,"e":22},{"d":"2023-12-01","w":17.5,"r":12,"s":3,"e":24},{"d":"2023-12-05","w":44.1,"r":12,"s":3,"e":62},{"d":"2023-12-11","w":44.1,"r":12,"s":3,"e":62},{"d":"2023-12-27","w":20.0,"r":12,"s":3,"e":28},{"d":"2023-12-30","w":22.0,"r":10,"s":3,"e":29},{"d":"2024-01-18","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-02-01","w":38.6,"r":12,"s":3,"e":54},{"d":"2024-02-12","w":44.1,"r":15,"s":3,"e":66},{"d":"2024-02-14","w":26.5,"r":15,"s":3,"e":40},{"d":"2024-03-28","w":38.6,"r":15,"s":3,"e":58},{"d":"2024-05-04","w":44.1,"r":10,"s":2,"e":59},{"d":"2024-05-30","w":38.6,"r":10,"s":3,"e":51},{"d":"2024-06-10","w":44.1,"r":8,"s":3,"e":56},{"d":"2024-06-22","w":44.1,"r":12,"s":2,"e":62},{"d":"2024-06-24","w":66.1,"r":12,"s":3,"e":93},{"d":"2024-06-27","w":48.5,"r":13,"s":3,"e":70},{"d":"2024-06-29","w":44.1,"r":10,"s":3,"e":59},{"d":"2024-07-14","w":39.7,"r":11,"s":3,"e":54},{"d":"2024-07-20","w":44.1,"r":12,"s":3,"e":62},{"d":"2024-08-30","w":44.1,"r":12,"s":3,"e":62},{"d":"2024-09-03","w":44.1,"r":15,"s":4,"e":66},{"d":"2024-09-17","w":39.7,"r":9,"s":3,"e":52},{"d":"2024-09-24","w":49.6,"r":12,"s":3,"e":69},{"d":"2024-10-01","w":49.6,"r":10,"s":3,"e":66},{"d":"2024-10-16","w":49.6,"r":8,"s":3,"e":63},{"d":"2024-11-25","w":55.1,"r":12,"s":3,"e":77},{"d":"2024-12-05","w":48.5,"r":10,"s":3,"e":65},{"d":"2025-01-11","w":33.1,"r":12,"s":3,"e":46},{"d":"2025-01-17","w":33.1,"r":12,"s":4,"e":46},{"d":"2025-01-24","w":49.6,"r":7,"s":3,"e":61},{"d":"2025-03-10","w":38.6,"r":8,"s":4,"e":49},{"d":"2025-04-08","w":44.1,"r":10,"s":3,"e":59},{"d":"2025-07-26","w":44.1,"r":10,"s":3,"e":59},{"d":"2025-08-13","w":49.6,"r":8,"s":3,"e":63},{"d":"2025-08-17","w":48.5,"r":12,"s":3,"e":68},{"d":"2025-08-20","w":44.1,"r":10,"s":3,"e":59},{"d":"2025-09-07","w":48.5,"r":12,"s":3,"e":68},{"d":"2025-09-14","w":48.5,"r":10,"s":3,"e":65},{"d":"2025-11-15","w":20.0,"r":12,"s":3,"e":28}],"Rompe Cráneo Con Barra Z":[{"d":"2023-10-11","w":66.1,"r":10,"s":3,"e":88},{"d":"2023-11-02","w":40.0,"r":15,"s":3,"e":60},{"d":"2023-11-14","w":40.0,"r":15,"s":3,"e":60},{"d":"2023-12-01","w":40.0,"r":10,"s":3,"e":53},{"d":"2023-12-05","w":66.1,"r":15,"s":3,"e":99},{"d":"2023-12-11","w":66.1,"r":12,"s":3,"e":93},{"d":"2023-12-28","w":88.2,"r":4,"s":3,"e":100},{"d":"2024-01-18","w":66.1,"r":15,"s":3,"e":99},{"d":"2024-01-29","w":88.2,"r":15,"s":4,"e":132},{"d":"2024-03-26","w":77.2,"r":12,"s":3,"e":108},{"d":"2024-04-15","w":88.2,"r":10,"s":3,"e":118},{"d":"2024-05-30","w":66.1,"r":8,"s":3,"e":84},{"d":"2024-06-11","w":66.1,"r":12,"s":3,"e":93},{"d":"2024-06-30","w":66.1,"r":12,"s":3,"e":93},{"d":"2024-07-11","w":88.2,"r":10,"s":3,"e":118},{"d":"2024-07-17","w":77.2,"r":15,"s":3,"e":116},{"d":"2024-07-22","w":55.1,"r":8,"s":3,"e":70},{"d":"2024-09-09","w":88.2,"r":12,"s":3,"e":123},{"d":"2024-09-21","w":77.2,"r":8,"s":3,"e":98},{"d":"2024-10-02","w":88.2,"r":10,"s":2,"e":118},{"d":"2024-10-15","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-01-28","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-04-08","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-04-12","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-04-16","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-04-24","w":99.2,"r":12,"s":3,"e":139},{"d":"2025-05-08","w":110.2,"r":5,"s":1,"e":129},{"d":"2025-07-03","w":77.2,"r":8,"s":3,"e":98},{"d":"2025-07-20","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-07-28","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-08-03","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-08-09","w":99.2,"r":6,"s":3,"e":119},{"d":"2025-08-18","w":77.2,"r":15,"s":3,"e":116},{"d":"2025-08-25","w":110.2,"r":10,"s":3,"e":147},{"d":"2025-08-31","w":77.2,"r":10,"s":3,"e":103},{"d":"2025-09-15","w":88.2,"r":12,"s":1,"e":123},{"d":"2025-11-17","w":88.2,"r":8,"s":3,"e":112},{"d":"2025-11-23","w":99.2,"r":10,"s":3,"e":132},{"d":"2026-01-11","w":77.2,"r":12,"s":3,"e":108},{"d":"2026-02-09","w":110.2,"r":10,"s":4,"e":147}],"Elevaciones laterales con mancuerna":[{"d":"2023-07-11","w":15.0,"r":15,"s":3,"e":22},{"d":"2023-08-02","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-08-12","w":33.1,"r":12,"s":3,"e":46},{"d":"2023-09-05","w":30.9,"r":12,"s":2,"e":43},{"d":"2023-09-20","w":33.1,"r":8,"s":3,"e":42},{"d":"2023-09-27","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-10-10","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-10-24","w":33.1,"r":10,"s":3,"e":44},{"d":"2023-12-27","w":14.0,"r":12,"s":3,"e":20},{"d":"2023-12-30","w":16.0,"r":12,"s":3,"e":22},{"d":"2024-02-01","w":33.1,"r":14,"s":4,"e":49},{"d":"2024-02-14","w":33.1,"r":10,"s":3,"e":44},{"d":"2024-03-18","w":26.5,"r":12,"s":3,"e":37},{"d":"2024-03-25","w":33.1,"r":15,"s":3,"e":50},{"d":"2024-04-18","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-06-10","w":26.5,"r":12,"s":3,"e":37},{"d":"2024-06-24","w":30.9,"r":12,"s":3,"e":43},{"d":"2024-06-29","w":30.9,"r":12,"s":3,"e":43},{"d":"2024-07-20","w":30.9,"r":14,"s":3,"e":45},{"d":"2024-08-30","w":33.1,"r":15,"s":3,"e":50},{"d":"2024-09-03","w":33.1,"r":10,"s":3,"e":44},{"d":"2024-09-12","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-09-17","w":35.3,"r":10,"s":3,"e":47},{"d":"2024-09-25","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-10-02","w":33.1,"r":12,"s":3,"e":46},{"d":"2024-12-29","w":35.3,"r":10,"s":3,"e":47},{"d":"2025-01-27","w":88.2,"r":15,"s":3,"e":132},{"d":"2025-04-10","w":38.6,"r":10,"s":4,"e":51},{"d":"2025-04-15","w":38.6,"r":12,"s":3,"e":54},{"d":"2025-04-22","w":33.1,"r":12,"s":2,"e":46},{"d":"2025-06-28","w":30.9,"r":10,"s":3,"e":41},{"d":"2025-07-03","w":35.3,"r":12,"s":3,"e":49},{"d":"2025-07-26","w":39.7,"r":10,"s":3,"e":53},{"d":"2025-08-01","w":39.7,"r":8,"s":3,"e":50},{"d":"2025-08-13","w":33.1,"r":12,"s":3,"e":46},{"d":"2025-08-17","w":33.1,"r":12,"s":3,"e":46},{"d":"2025-08-24","w":33.1,"r":12,"s":3,"e":46},{"d":"2026-01-17","w":39.7,"r":10,"s":3,"e":53}],"Split con mancuernas":[{"d":"2023-02-15","w":44.1,"r":12,"s":3,"e":62},{"d":"2023-03-04","w":40.0,"r":15,"s":3,"e":60},{"d":"2023-03-13","w":20.0,"r":12,"s":3,"e":28},{"d":"2023-03-16","w":20.0,"r":15,"s":3,"e":30},{"d":"2023-07-05","w":40.0,"r":12,"s":3,"e":56},{"d":"2023-07-13","w":44.1,"r":15,"s":3,"e":66},{"d":"2023-08-03","w":132.3,"r":12,"s":3,"e":185},{"d":"2023-08-07","w":44.1,"r":15,"s":3,"e":66},{"d":"2023-08-14","w":132.3,"r":12,"s":3,"e":185},{"d":"2023-09-11","w":60.0,"r":12,"s":3,"e":84},{"d":"2023-09-25","w":88.2,"r":12,"s":3,"e":123},{"d":"2023-10-03","w":60.0,"r":12,"s":1,"e":84},{"d":"2023-10-06","w":60.0,"r":12,"s":1,"e":84},{"d":"2023-10-10","w":60.0,"r":10,"s":1,"e":80},{"d":"2023-10-25","w":132.3,"r":15,"s":3,"e":198},{"d":"2023-12-29","w":60.0,"r":12,"s":3,"e":84},{"d":"2024-03-13","w":66.1,"r":12,"s":3,"e":93},{"d":"2024-03-21","w":88.2,"r":15,"s":3,"e":132},{"d":"2024-03-27","w":88.2,"r":10,"s":2,"e":118},{"d":"2024-04-16","w":99.2,"r":12,"s":3,"e":139},{"d":"2024-05-04","w":114.6,"r":12,"s":3,"e":160},{"d":"2024-06-20","w":64.0,"r":12,"s":3,"e":90},{"d":"2024-07-18","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-07-27","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-07-30","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-09-06","w":141.1,"r":12,"s":3,"e":198}],"Seal Row inclinado con mancuernas, banco inclinado":[{"d":"2023-03-16","w":44.1,"r":12,"s":4,"e":62},{"d":"2023-06-03","w":185.2,"r":8,"s":4,"e":235},{"d":"2023-06-13","w":132.3,"r":15,"s":3,"e":198},{"d":"2023-07-11","w":60.0,"r":18,"s":3,"e":96},{"d":"2023-11-28","w":88.2,"r":15,"s":1,"e":132},{"d":"2023-12-27","w":72.0,"r":12,"s":3,"e":101},{"d":"2024-02-14","w":110.2,"r":10,"s":3,"e":147},{"d":"2024-02-23","w":60.0,"r":12,"s":3,"e":84},{"d":"2024-03-25","w":66.1,"r":15,"s":3,"e":99},{"d":"2024-04-18","w":132.3,"r":15,"s":3,"e":198},{"d":"2024-06-24","w":185.2,"r":15,"s":5,"e":278},{"d":"2024-06-29","w":158.7,"r":12,"s":3,"e":222},{"d":"2024-07-14","w":158.7,"r":15,"s":3,"e":238},{"d":"2024-09-17","w":158.7,"r":14,"s":3,"e":233},{"d":"2024-11-02","w":158.7,"r":15,"s":3,"e":238},{"d":"2024-11-11","w":158.7,"r":15,"s":1,"e":238},{"d":"2024-12-01","w":158.7,"r":8,"s":3,"e":201},{"d":"2024-12-07","w":158.7,"r":12,"s":3,"e":222},{"d":"2024-12-23","w":110.2,"r":8,"s":1,"e":140},{"d":"2025-01-13","w":88.2,"r":15,"s":3,"e":132},{"d":"2025-06-28","w":158.7,"r":10,"s":3,"e":212},{"d":"2025-06-30","w":187.4,"r":10,"s":3,"e":250},{"d":"2025-07-03","w":158.7,"r":12,"s":3,"e":222},{"d":"2025-08-01","w":158.7,"r":12,"s":3,"e":222},{"d":"2025-09-01","w":59.5,"r":12,"s":3,"e":83},{"d":"2025-09-07","w":158.7,"r":15,"s":3,"e":238}],"Remo con barra, apoyo en banca":[{"d":"2023-01-16","w":176.4,"r":12,"s":3,"e":247},{"d":"2023-07-04","w":308.6,"r":10,"s":4,"e":412},{"d":"2024-03-18","w":242.5,"r":15,"s":3,"e":364},{"d":"2024-08-30","w":242.5,"r":10,"s":3,"e":323},{"d":"2024-09-03","w":198.4,"r":10,"s":3,"e":265},{"d":"2024-09-12","w":242.5,"r":12,"s":3,"e":340},{"d":"2024-09-24","w":286.6,"r":12,"s":3,"e":401},{"d":"2024-10-01","w":286.6,"r":12,"s":5,"e":401},{"d":"2024-10-16","w":308.6,"r":15,"s":4,"e":463},{"d":"2024-10-30","w":198.4,"r":12,"s":3,"e":278},{"d":"2024-11-25","w":154.3,"r":15,"s":3,"e":231},{"d":"2024-11-27","w":286.6,"r":8,"s":3,"e":363},{"d":"2024-12-09","w":264.6,"r":15,"s":4,"e":397},{"d":"2025-01-17","w":242.5,"r":10,"s":3,"e":323},{"d":"2025-01-23","w":220.5,"r":10,"s":2,"e":294},{"d":"2025-01-27","w":264.6,"r":8,"s":4,"e":335},{"d":"2025-03-10","w":220.5,"r":10,"s":3,"e":294},{"d":"2025-04-15","w":242.5,"r":10,"s":3,"e":323},{"d":"2025-04-22","w":264.6,"r":10,"s":3,"e":353},{"d":"2025-05-09","w":264.6,"r":10,"s":4,"e":353},{"d":"2025-05-13","w":286.6,"r":8,"s":4,"e":363},{"d":"2025-08-13","w":242.5,"r":10,"s":3,"e":323},{"d":"2025-08-20","w":242.5,"r":15,"s":3,"e":364},{"d":"2025-11-19","w":220.5,"r":10,"s":3,"e":294}],"Extensión de tríceps unilateral en polea":[{"d":"2024-01-18","w":26.5,"r":12,"s":4,"e":37},{"d":"2024-03-15","w":50.7,"r":12,"s":3,"e":71},{"d":"2024-05-06","w":30.9,"r":15,"s":3,"e":46},{"d":"2024-06-11","w":37.5,"r":12,"s":3,"e":52},{"d":"2024-06-30","w":50.7,"r":12,"s":3,"e":71},{"d":"2024-07-17","w":22.1,"r":6,"s":2,"e":26},{"d":"2024-09-01","w":27.6,"r":10,"s":3,"e":37},{"d":"2024-09-21","w":19.8,"r":9,"s":4,"e":26},{"d":"2024-11-02","w":29.8,"r":12,"s":3,"e":42},{"d":"2024-12-07","w":29.8,"r":9,"s":3,"e":39},{"d":"2024-12-27","w":27.6,"r":10,"s":3,"e":37},{"d":"2025-07-03","w":27.6,"r":12,"s":3,"e":39},{"d":"2025-07-20","w":24.9,"r":9,"s":3,"e":32},{"d":"2025-08-03","w":29.8,"r":7,"s":3,"e":37},{"d":"2025-08-18","w":24.2,"r":8,"s":3,"e":31},{"d":"2025-08-25","w":22.1,"r":10,"s":2,"e":29},{"d":"2025-08-31","w":29.8,"r":12,"s":3,"e":42},{"d":"2025-09-15","w":66.1,"r":8,"s":3,"e":84},{"d":"2025-09-30","w":66.1,"r":12,"s":3,"e":93},{"d":"2025-11-17","w":29.8,"r":12,"s":3,"e":42},{"d":"2025-11-30","w":29.8,"r":12,"s":3,"e":42},{"d":"2025-12-28","w":28.7,"r":9,"s":3,"e":37},{"d":"2026-02-01","w":28.7,"r":12,"s":3,"e":40},{"d":"2026-05-08","w":28.7,"r":8,"s":3,"e":36}],"Press cerrado con mancuernas":[{"d":"2023-06-09","w":88.2,"r":12,"s":3,"e":123},{"d":"2023-08-29","w":88.2,"r":10,"s":3,"e":118},{"d":"2023-09-05","w":97.0,"r":10,"s":3,"e":129},{"d":"2023-09-12","w":40.0,"r":15,"s":3,"e":60},{"d":"2023-12-01","w":88.2,"r":12,"s":3,"e":123},{"d":"2023-12-05","w":99.2,"r":12,"s":3,"e":139},{"d":"2023-12-11","w":99.2,"r":12,"s":3,"e":139},{"d":"2023-12-28","w":97.0,"r":9,"s":3,"e":126},{"d":"2024-01-18","w":88.2,"r":12,"s":3,"e":123},{"d":"2024-01-29","w":88.2,"r":10,"s":3,"e":118},{"d":"2024-03-15","w":141.1,"r":10,"s":3,"e":188},{"d":"2024-03-26","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-04-15","w":132.3,"r":10,"s":3,"e":176},{"d":"2024-05-06","w":132.3,"r":8,"s":3,"e":168},{"d":"2024-05-21","w":105.8,"r":10,"s":3,"e":141},{"d":"2024-05-30","w":99.2,"r":12,"s":3,"e":139},{"d":"2024-09-04","w":110.2,"r":12,"s":2,"e":154},{"d":"2024-09-09","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-10-30","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-11-11","w":97.0,"r":12,"s":2,"e":136},{"d":"2024-12-05","w":110.2,"r":13,"s":3,"e":158},{"d":"2025-01-11","w":132.3,"r":12,"s":3,"e":185},{"d":"2025-01-24","w":132.3,"r":10,"s":3,"e":176}],"Prensa horizontal unilateral":[{"d":"2023-08-03","w":121.2,"r":12,"s":3,"e":170},{"d":"2023-08-14","w":99.2,"r":15,"s":3,"e":149},{"d":"2023-09-11","w":55.0,"r":12,"s":3,"e":77},{"d":"2023-09-20","w":143.3,"r":15,"s":3,"e":215},{"d":"2023-10-03","w":60.0,"r":12,"s":3,"e":84},{"d":"2023-10-06","w":75.0,"r":15,"s":3,"e":112},{"d":"2023-10-10","w":75.0,"r":15,"s":3,"e":112},{"d":"2023-10-17","w":75.0,"r":15,"s":3,"e":112},{"d":"2023-10-25","w":176.4,"r":8,"s":3,"e":223},{"d":"2023-11-27","w":70.0,"r":10,"s":3,"e":93},{"d":"2023-11-29","w":80.0,"r":12,"s":3,"e":112},{"d":"2024-03-13","w":132.3,"r":12,"s":3,"e":185},{"d":"2024-03-27","w":110.2,"r":12,"s":3,"e":154},{"d":"2024-05-20","w":158.7,"r":10,"s":3,"e":212},{"d":"2024-07-09","w":165.3,"r":10,"s":4,"e":220},{"d":"2024-08-20","w":158.7,"r":8,"s":3,"e":201},{"d":"2024-09-20","w":238.1,"r":12,"s":3,"e":333},{"d":"2024-09-30","w":165.3,"r":15,"s":3,"e":248},{"d":"2024-11-25","w":99.2,"r":15,"s":3,"e":149},{"d":"2024-12-10","w":143.3,"r":12,"s":3,"e":201},{"d":"2025-01-02","w":143.3,"r":10,"s":3,"e":191},{"d":"2025-01-21","w":132.3,"r":12,"s":3,"e":185},{"d":"2025-04-09","w":154.3,"r":12,"s":3,"e":216}],"Curl de bíceps con barra Z":[{"d":"2023-10-24","w":88.2,"r":15,"s":3,"e":132},{"d":"2023-11-02","w":88.2,"r":15,"s":3,"e":132},{"d":"2023-11-14","w":88.2,"r":15,"s":3,"e":132},{"d":"2023-12-01","w":40.0,"r":12,"s":3,"e":56},{"d":"2023-12-30","w":35.0,"r":18,"s":3,"e":56},{"d":"2024-02-01","w":88.2,"r":18,"s":3,"e":141},{"d":"2025-04-15","w":88.2,"r":12,"s":3,"e":123},{"d":"2025-04-22","w":110.2,"r":10,"s":3,"e":147},{"d":"2025-05-09","w":121.2,"r":12,"s":5,"e":170},{"d":"2025-05-13","w":110.2,"r":10,"s":3,"e":147},{"d":"2025-06-28","w":77.2,"r":12,"s":3,"e":108},{"d":"2025-07-03","w":88.2,"r":14,"s":3,"e":129},{"d":"2025-07-26","w":88.2,"r":8,"s":3,"e":112},{"d":"2025-08-01","w":88.2,"r":10,"s":3,"e":118},{"d":"2025-08-24","w":99.2,"r":12,"s":3,"e":139},{"d":"2025-09-28","w":132.3,"r":10,"s":3,"e":176},{"d":"2025-11-19","w":88.2,"r":12,"s":3,"e":123},{"d":"2026-01-17","w":88.2,"r":10,"s":3,"e":118},{"d":"2026-02-16","w":110.2,"r":15,"s":3,"e":165},{"d":"2026-02-21","w":110.2,"r":12,"s":3,"e":154},{"d":"2026-02-25","w":132.3,"r":10,"s":3,"e":176},{"d":"2026-03-09","w":88.2,"r":12,"s":2,"e":123},{"d":"2026-03-18","w":30.0,"r":30,"s":1,"e":60}]};
  const thExerciseNames = ["Press con mancuernas en banca inclinada", "Curl de bíceps con mancuerna en banco inclinado", "Curl de bíceps alterno", "Rompe Cráneo Con Barra Z", "Elevaciones laterales con mancuerna", "Split con mancuernas", "Seal Row inclinado con mancuernas, banco inclinado", "Remo con barra, apoyo en banca", "Extensión de tríceps unilateral en polea", "Press cerrado con mancuernas", "Prensa horizontal unilateral", "Curl de bíceps con barra Z"];
  

  function formatDateShort(dateStr) {
    const d = new Date(dateStr);
    return d.getDate() + '/' + (d.getMonth()+1) + '/' + String(d.getFullYear()).slice(2);
  }

  // ── HELPERS TRAINHEROIC ──────────────────────────

  // Construye la grilla top-20 de ejercicios
  // exercises: [{name, count, bestWeight}], callbackFn: nombre de la función JS a llamar al clic
  function buildExerciseGrid(exercises, callbackFn) {
    const grid = document.getElementById('exerciseGrid');
    if (!grid) return;
    grid.innerHTML = exercises.map((ex, i) => {
      const safeName = ex.name.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
      return `<div class="th-ex-card${i===0?' active':''}" onclick="${callbackFn}('${safeName}',this)" title="${ex.name}">
        <div class="th-ex-name">${ex.name}</div>
        <div class="th-ex-meta">${ex.count} sesiones</div>
        <div class="th-ex-max">${ex.bestWeight % 1 === 0 ? ex.bestWeight : ex.bestWeight.toFixed(1)} kg</div>
      </div>`;
    }).join('');
  }

  // Calcula y muestra la tira RM (12→1) desde el mejor est1RM
  function computeAndShowRMStrip(best1rm) {
    const strip = document.getElementById('thRMStrip');
    if (!strip || !best1rm) return;
    const reps = [12, 10, 8, 6, 4, 2, 1];
    strip.innerHTML = reps.map(r => {
      const kg = r === 1 ? Math.round(best1rm) : Math.round(best1rm / (1 + r / 30));
      const isBest = r === 1;
      return `<div class="th-rm-cell${isBest?' best':''}">
        <div class="th-rm-rep">${r}RM</div>
        <div class="th-rm-kg">${kg}</div>
        <div class="th-rm-unit">kg</div>
      </div>`;
    }).join('');
  }

  function loadRealTHData() {
    // Si el coach subió un CSV, mostrarlo — pero validar que los pesos sean reales
    const storedCSV = localStorage.getItem('thCSVData');
    if (storedCSV) {
      try {
        const data = JSON.parse(storedCSV);
        // Validación: detectar mapeo incorrecto (año de fecha mapeado como peso)
        // Un peso válido está entre 0.5 kg y 1000 kg; valores ≥1990 son años
        const sampleW = Object.values(data)
          .flatMap(s => s.slice(0,5).map(e => e.weight))
          .filter(w => typeof w === 'number' && !isNaN(w) && isFinite(w));
        const sampleR = Object.values(data)
          .flatMap(s => s.slice(0,5).map(e => e.reps))
          .filter(r => typeof r === 'number' && !isNaN(r));
        const yearLikeW = sampleW.filter(w => w >= 1990 && w <= 2110).length;
        const yearLikeR = sampleR.filter(r => r >= 1990 && r <= 2110).length;
        // Corrupto si: sin datos, o >25% de pesos/reps son valores de año
        const badData = sampleW.length === 0
          || (yearLikeW / sampleW.length) > 0.25
          || (sampleR.length > 0 && (yearLikeR / sampleR.length) > 0.25);
        if (badData) {
          // Limpiar datos corruptos y usar datos embebidos
          localStorage.removeItem('thCSVData');
          localStorage.removeItem('thCSVFilename');
        } else {
          const filename      = localStorage.getItem('thCSVFilename') || 'trainheroic.csv';
          const exCount       = Object.keys(data).length;
          const sessionCount  = Object.values(data).reduce((s,v) => s + v.length, 0);
          loadCSVData(data, filename, exCount, sessionCount);
          return;
        }
      } catch(e) { /* CSV malformado → caer a datos embebidos */ }
    }

    const uploadZone = document.getElementById('csvUploadZone');
    if (uploadZone) uploadZone.style.display = 'none';
    document.getElementById('csvProcessing')?.classList.remove('show');
    document.getElementById('csvMapping')?.classList.remove('show');

    // Top-20 ejercicios por frecuencia de sesiones
    const sorted = Object.keys(thRealData)
      .map(name => {
        const f = 1 / 2.205;  // lbs → kg (TH exporta CSV en libras, muestra en kg)
        return {
          name,
          count:      thRealData[name].length,
          bestWeight: parseFloat((Math.max(...thRealData[name].map(s => s.w)) * f).toFixed(1))
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    buildExerciseGrid(sorted, 'selectExerciseReal');

    const dataSection = document.getElementById('thDataSection');
    if (dataSection) dataSection.style.display = 'block';

    const summary = document.getElementById('csvSummary');
    if (summary) {
      summary.classList.add('show');
      document.getElementById('csvFileName').textContent = 'training_data.csv';
      const total = Object.values(thRealData).reduce((s,v) => s + v.length, 0);
      document.getElementById('csvFileMeta').textContent =
        `${Object.keys(thRealData).length} ejercicios · ${total} sesiones desde 2023`;
    }
    document.getElementById('thLastUpdate').textContent = 'Actualizado: Mar 2026';

    // Cargar primer ejercicio de la grilla
    selectExerciseReal(sorted[0].name, null);
  }

  function selectExerciseReal(exName, btn) {
    if (btn) {
      document.querySelectorAll('.th-ex-card').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    const sessions = thRealData[exName];
    if (!sessions || !sessions.length) return;

    const factor     = 1 / 2.205;  // lbs → kg (datos embebidos están en libras)
    const rawWeights = sessions.map(s => s.w);
    const weights    = rawWeights.map(w => parseFloat((w * factor).toFixed(1)));
    const labels     = sessions.map(s => formatDateShort(s.d));
    const best       = Math.max(...weights);
    // Epley cap 15 reps (igual a TrainHeroic): mejor est1rm de sesiones r≤15, aplicando factor
    const validSess  = sessions.filter(s => s.r <= 15 && s.e > 0);
    const est1rm     = validSess.length ? Math.round(Math.max(...validSess.map(s => s.e)) * factor) : Math.round(best * (1 + 5/30));

    // Working max
    document.getElementById('thWMLabel').textContent = exName.length > 32 ? exName.slice(0,32) + '…' : exName;
    document.getElementById('thWMValue').textContent = best % 1 === 0 ? best : best.toFixed(1);
    document.getElementById('thEst1RM').textContent  = est1rm + ' kg';

    // Tira RM
    computeAndShowRMStrip(est1rm);

    // Gráfico
    if (chartStrength) {
      const margin = Math.max((best - Math.min(...weights)) * 0.25, best * 0.05);
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data              = weights;
      chartStrength.data.datasets[0].borderColor        = '#4a90d9';
      chartStrength.data.datasets[0].tension            = 0.3;
      chartStrength.data.datasets[0].pointRadius        = sessions.length <= 20 ? 3 : 0;
      chartStrength.data.datasets[0].pointBackgroundColor = '#4a90d9';
      chartStrength.options.scales.y.min = Math.max(0, Math.min(...weights) - margin);
      chartStrength.options.scales.y.max = best + margin;
      chartStrength.update();
    }

    // Tabla últimas 5 sesiones
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      sessions.slice(-5).reverse().forEach((s, i) => {
        const dispW   = parseFloat((s.w * factor).toFixed(1));
        const dispE   = Math.round(s.e * factor);
        const isMax   = dispW === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${formatDateShort(s.d)}</td><td>${s.s}×${s.r}</td><td class="${isMax?'highlight':''}">${dispW}</td><td>${dispE} kg</td>`;
        tbody.appendChild(tr);
      });
    }

    // Si hay un rango activo (no ALL), aplicarlo al ejercicio recién cargado.
    // Usar #strRangeBtns para no confundir con el selector de ritmo (#ritmoRangeBtns).
    const rBtn = document.querySelector('#strRangeBtns .th-range-btn.active');
    if (rBtn) {
      const rt = rBtn.textContent.trim().toLowerCase();
      const rangeMap = { '1m':'1m', '3m':'3m', '6m':'6m', '1a':'1y' };
      if (rangeMap[rt]) changeStrRange(rangeMap[rt], rBtn);
    }
  }

  // ── CSV PARSER TRAINHEROIC ──
  let csvRawData = null;
  let csvHeaders = [];
  let csvParsed = [];

  // Mapeo automático de nombres comunes de columnas
  const COL_ALIASES = {
    date:     ['date','fecha','day','día','session date','workout date'],
    exercise: ['exercise','ejercicio','movement','exercise name','nombre ejercicio','lift'],
    weight:   ['weight','peso','kg','load','carga','weight (kg)','load (kg)','weight (lbs)','load (lbs)'],
    reps:     ['reps','repeticiones','rep','repetition','repetitions','reps completed'],
    sets:     ['sets','series','set'],
    notes:    ['notes','notas','note','comments'],
  };

  // Devuelve el encabezado que coincide con `field`, o null si no encuentra ninguno.
  // NUNCA usa headers[0] como fallback — eso causaría que la columna de fecha
  // (formato YYYY-MM-DD) se interprete como peso (~2025 kg).
  function guessColumn(headers, field) {
    const aliases = COL_ALIASES[field] || [];
    // 1. Coincidencia exacta (case-insensitive)
    for (const h of headers) {
      if (aliases.includes(h.toLowerCase().trim())) return h;
    }
    // 2. Coincidencia parcial
    for (const h of headers) {
      for (const a of aliases) {
        if (h.toLowerCase().includes(a) || a.includes(h.toLowerCase().trim())) return h;
      }
    }
    return null; // sin fallback — el llamador decide qué hacer
  }

  // Lee un objeto File y lo procesa como CSV.
  // Centralizado aquí para que tanto el input como el drag-drop usen el mismo flujo.
  function readAndProcessFile(file) {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('El archivo es demasiado grande (máx. 20 MB). Exporta un rango de fechas más acotado desde TrainHeroic.');
      return;
    }
    showProcessing(true);
    const reader = new FileReader();
    reader.onerror = () => {
      showProcessing(false);
      alert('No se pudo leer el archivo. Intenta seleccionarlo con el botón en lugar de arrastrarlo.');
    };
    reader.onload = (ev) => {
      setTimeout(() => {
        try {
          processCSV(ev.target.result, file.name);
        } catch(err) {
          showProcessing(false);
          console.error('Error procesando CSV:', err);
          alert('El archivo no pudo procesarse. Verifica que sea un CSV válido.\n\n' + err.message);
        }
      }, 200);
    };
    reader.readAsText(file, 'UTF-8');
  }

  function handleCSVFile(input) {
    readAndProcessFile(input.files[0]);
  }

  // ── PARSEO CSV (RFC 4180) ─────────────────────────────────────────────────
  // Une líneas que pertenecen al mismo campo entre comillas (campos multi-línea).
  function splitCSVLines(text) {
    const rows = []; let cur = '', inQ = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') { inQ = !inQ; cur += c; }
      else if (!inQ && (c === '\n' || c === '\r')) {
        if (c === '\r' && text[i+1] === '\n') i++;
        if (cur.trim()) rows.push(cur);
        cur = '';
      } else { cur += c; }
    }
    if (cur.trim()) rows.push(cur);
    return rows;
  }

  // Parsea una fila CSV respetando campos entre comillas y comas internas.
  function parseCSVRow(line, sep) {
    const res = []; let cur = '', inQ = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        if (inQ && line[i+1] === '"') { cur += '"'; i++; } else inQ = !inQ;
      } else if (c === sep && !inQ) { res.push(cur.trim()); cur = ''; }
      else { cur += c; }
    }
    res.push(cur.trim());
    return res;
  }

  // Parsea una celda ExerciseData de TrainHeroic.
  // Formato: "reps1, reps2 rep x peso1, peso2 unidad"
  // Devuelve { weightLbs, reps } del mejor set, o null si no hay datos de peso.
  function parseExerciseDataField(str) {
    if (!str) return null;
    const idx = str.toLowerCase().indexOf(' rep x ');
    if (idx === -1) return null;
    const repsPart = str.substring(0, idx).trim();
    let   rest     = str.substring(idx + 7).trim();
    const unitM    = rest.match(/\s*(kilogram|pound|kg|lbs?|percent|time|meter)\s*$/i);
    const unit     = unitM ? unitM[1].toLowerCase() : '';
    if (unitM) rest = rest.substring(0, unitM.index).trim();
    if (unit === 'percent' || unit === 'time' || unit === 'meter') return null;
    const weights  = rest.split(',').map(s => parseFloat(s.trim())).filter(v => !isNaN(v) && v > 0);
    if (!weights.length) return null;
    const maxW     = Math.max(...weights);
    const maxIdx   = weights.indexOf(maxW);
    const repsArr  = repsPart.split(',').map(s => parseInt(s.trim())).filter(v => !isNaN(v) && v > 0);
    return { weightLbs: maxW, reps: repsArr[maxIdx] ?? repsArr[0] ?? 1 };
  }

  function processCSV(text, filename) {
    // Detectar separador (coma, punto y coma, tab)
    const sep = text.includes(';') ? ';' : text.includes('\t') ? '\t' : ',';
    const lines = splitCSVLines(text);
    if (lines.length < 2) { showProcessing(false); alert('CSV vacío o inválido'); return; }

    // Parsear encabezados, eliminando BOM si existe (Excel UTF-8)
    const rawHeaders = parseCSVRow(lines[0], sep);
    csvHeaders = rawHeaders.map((h, i) => (i === 0 ? h.replace(/^﻿/, '') : h).trim());
    csvRawData = lines.slice(1).map(line => {
      const vals = parseCSVRow(line, sep);
      const obj  = {};
      csvHeaders.forEach((h, i) => obj[h] = vals[i] ?? '');
      return obj;
    });

    // ── Formato TrainHeroic con columna ExerciseData ───────────────────────
    // Los pesos y reps vienen embebidos: "12, 12 rep x 110.23, 110.23 kilogram"
    // Los valores están en libras aunque la etiqueta diga "kilogram".
    if (csvHeaders.includes('ExerciseData')) {
      const dateCol     = guessColumn(csvHeaders, 'date');
      const exerciseCol = guessColumn(csvHeaders, 'exercise');
      if (dateCol && exerciseCol) {
        showProcessing(false);
        importCSVFromExerciseData(dateCol, exerciseCol, 'ExerciseData', filename);
        return;
      }
    }

    // Intentar mapeo automático por alias de nombre de columna
    const dateCol     = guessColumn(csvHeaders, 'date');
    const exerciseCol = guessColumn(csvHeaders, 'exercise');
    let   weightCol   = guessColumn(csvHeaders, 'weight');
    const repsCol     = guessColumn(csvHeaders, 'reps');
    console.log('[CSV] Headers:', csvHeaders);
    console.log('[CSV] Detectado → fecha:', dateCol, '| ejercicio:', exerciseCol, '| peso:', weightCol, '| reps:', repsCol);

    // Si no se detectó columna de peso por alias, buscar heurísticamente:
    // columna numérica con valores plausibles (0.5–999 lbs), excluyendo fecha, ejercicio y reps.
    // Excluye también columnas donde los valores parecen años (≥1990).
    if (!weightCol) {
      const rows0 = csvRawData.slice(0, 20);
      for (const h of csvHeaders) {
        if (h === dateCol || h === exerciseCol || h === repsCol) continue;
        const nums = rows0.map(r => parseFloat(r[h])).filter(v => !isNaN(v) && v > 0);
        const yearLike = nums.filter(v => v >= 1990);
        if (yearLike.length > 0) continue; // descartar si tiene valores de año
        const plausible = nums.filter(v => v >= 0.5 && v < 1000);
        if (plausible.length >= Math.min(5, rows0.length * 0.5)) {
          weightCol = h;
          break;
        }
      }
    }

    // Verificar si el mapeo automático produjo columnas válidas:
    // peso: 0.5–1400 (lbs); reps: 1–99; ninguna columna clave puede ser null
    const sampleRows = csvRawData.slice(0, 5);
    const validRows  = (dateCol && exerciseCol && weightCol && repsCol)
      ? sampleRows.filter(row => {
          const w = parseFloat(row[weightCol]);
          const r = parseInt(row[repsCol]);
          return row[dateCol]
            && !isNaN(w) && w >= 0.5 && w < 1400
            && !isNaN(r) && r >= 1   && r < 100;
        })
      : [];
    const autoMapped = validRows.length >= Math.min(2, sampleRows.length);

    showProcessing(false);

    if (autoMapped) {
      importCSV(dateCol, exerciseCol, weightCol, repsCol, filename);
    } else {
      // Mostrar panel de mapeo manual
      showMappingPanel(filename);
    }
  }

  function showMappingPanel(filename) {
    const selects = ['mapDate','mapExercise','mapWeight','mapReps'];
    const fields  = ['date','exercise','weight','reps'];
    selects.forEach((id, i) => {
      const sel = document.getElementById(id);
      if (!sel) return;
      const best = guessColumn(csvHeaders, fields[i]); // puede ser null
      // Si no hay coincidencia, poner placeholder deshabilitado para que el usuario elija.
      // Sin placeholder, el browser pre-selecciona la primera opción (típicamente la fecha).
      const placeholder = best
        ? ''
        : `<option value="" disabled selected>— seleccionar columna —</option>`;
      sel.innerHTML = placeholder + csvHeaders.map(h =>
        `<option value="${h}" ${h === best ? 'selected' : ''}>${h}</option>`
      ).join('');
    });
    document.getElementById('csvMapping').classList.add('show');
    document.getElementById('csvUploadZone').style.display = 'none';
  }

  function importCSVWithMapping() {
    const dateCol     = document.getElementById('mapDate')?.value;
    const exerciseCol = document.getElementById('mapExercise')?.value;
    const weightCol   = document.getElementById('mapWeight')?.value;
    const repsCol     = document.getElementById('mapReps')?.value;
    if (!dateCol || !exerciseCol || !weightCol || !repsCol) {
      alert('Por favor selecciona todas las columnas antes de importar.');
      return;
    }
    document.getElementById('csvMapping').classList.remove('show');
    importCSV(dateCol, exerciseCol, weightCol, repsCol, 'trainheroic.csv');
  }

  function importCSV(dateCol, exerciseCol, weightCol, repsCol, filename) {
    if (!csvRawData) return;

    // Agrupar por ejercicio
    const exercises = {};
    csvRawData.forEach(row => {
      const ex   = (row[exerciseCol] || '').trim();
      const w    = parseFloat(row[weightCol]);
      const reps = parseInt(row[repsCol]) || 1;
      const dateStr = row[dateCol] || '';
      if (!ex || isNaN(w) || w <= 0) return;

      // 1RM Epley con cap 15 reps (igual que TrainHeroic: r>15 → no calcular)
      const est1rm = reps <= 15 ? Math.round(w * (1 + reps / 30)) : 0;
      const date = parseDate(dateStr);

      if (!exercises[ex]) exercises[ex] = [];
      exercises[ex].push({ date, dateStr, weight: w, reps, sets: 1, est1rm });
    });

    // Agrupar sesiones del mismo ejercicio en el mismo día
    const merged = {};
    Object.keys(exercises).forEach(ex => {
      const byDate = {};
      exercises[ex].forEach(e => {
        const k = e.dateStr;
        if (!byDate[k] || e.weight > byDate[k].weight) {
          byDate[k] = e;
        } else if (e.weight === byDate[k].weight) {
          byDate[k].sets += 1;
        }
      });
      merged[ex] = Object.values(byDate).sort((a,b) => a.date - b.date);
    });

    const exCount = Object.keys(merged).length;
    const sessionCount = Object.values(merged).reduce((s,v)=>s+v.length,0);

    if (exCount === 0) { alert('No se pudieron leer datos válidos. Verifica el formato del CSV.'); return; }

    // Validación de integridad: si los pesos se ven como años (ej. 2025) el mapeo fue incorrecto.
    // Forzar el panel de mapeo manual para que el usuario elija la columna correcta.
    const sampleWeights = Object.values(merged)
      .flatMap(s => s.slice(0, 3).map(e => e.weight))
      .filter(w => !isNaN(w));
    const yearLikeCount = sampleWeights.filter(w => w >= 1990 && w <= 2110).length;
    if (sampleWeights.length > 0 && yearLikeCount / sampleWeights.length > 0.25) {
      showProcessing(false);
      showMappingPanel(filename);
      return;
    }

    // Guardar en localStorage (puede lanzar QuotaExceededError si los datos son muy grandes)
    try {
      localStorage.setItem('thCSVData', JSON.stringify(merged));
      localStorage.setItem('thCSVFilename', filename);
    } catch(e) {
      // Datos demasiado grandes para localStorage: continuar en memoria sin guardar
      console.warn('localStorage lleno; los datos no se guardarán entre sesiones.', e);
    }

    // Actualizar UI
    loadCSVData(merged, filename, exCount, sessionCount);
  }

  // Importa el formato TrainHeroic con columna ExerciseData.
  // Los pesos están en libras (aunque la etiqueta diga "kilogram") → convierte a kg.
  function importCSVFromExerciseData(dateCol, exerciseCol, dataCol, filename) {
    const LBS_TO_KG = 1 / 2.2046;
    const exercises = {};

    for (const row of csvRawData) {
      const ex      = (row[exerciseCol] || '').trim();
      const dateRaw = (row[dateCol]     || '').trim().split('T')[0];
      const dataStr = (row[dataCol]     || '').trim();
      if (!ex || !dateRaw || !dataStr) continue;

      const parsed = parseExerciseDataField(dataStr);
      if (!parsed) continue;

      const weightKg = parseFloat((parsed.weightLbs * LBS_TO_KG).toFixed(2));
      if (weightKg < 0.5) continue;

      // Normalizar fecha: "2023-3-28" → "2023-03-28"
      const dp      = dateRaw.split('-');
      const dateStr = dp.length === 3
        ? `${dp[0]}-${dp[1].padStart(2,'0')}-${dp[2].padStart(2,'0')}`
        : dateRaw;
      const date   = parseDate(dateStr);
      const reps   = parsed.reps;
      const est1rm = reps <= 15 ? Math.round(weightKg * (1 + reps / 30)) : 0;

      if (!exercises[ex]) exercises[ex] = [];
      exercises[ex].push({ date, dateStr, weight: weightKg, reps, sets: 1, est1rm });
    }

    // Agrupar por día: conservar el mayor peso por sesión
    const merged = {};
    for (const [ex, entries] of Object.entries(exercises)) {
      const byDate = {};
      for (const e of entries) {
        if (!byDate[e.dateStr] || e.weight > byDate[e.dateStr].weight) {
          byDate[e.dateStr] = e;
        } else if (e.weight === byDate[e.dateStr].weight) {
          byDate[e.dateStr].sets += 1;
        }
      }
      const arr = Object.values(byDate).sort((a, b) => a.date - b.date);
      if (arr.length) merged[ex] = arr;
    }

    const exCount      = Object.keys(merged).length;
    const sessionCount = Object.values(merged).reduce((s, v) => s + v.length, 0);

    if (exCount === 0) {
      showProcessing(false);
      alert('No se encontraron datos de peso.\nVerifica que el CSV sea de entrenamientos completados, no del programa prescrito.');
      return;
    }

    try {
      localStorage.setItem('thCSVData', JSON.stringify(merged));
      localStorage.setItem('thCSVFilename', filename);
    } catch (e) {
      console.warn('localStorage lleno; datos no guardados entre sesiones.', e);
    }

    loadCSVData(merged, filename, exCount, sessionCount);
  }

  function parseDate(str) {
    if (!str) return new Date();
    // Formatos: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY
    const clean = str.trim();
    let d = new Date(clean);
    if (!isNaN(d)) return d;
    // DD/MM/YYYY
    const parts = clean.split(/[/\-]/);
    if (parts.length === 3) {
      if (parseInt(parts[0]) > 12) return new Date(parts[2], parts[1]-1, parts[0]);
      return new Date(parts[2], parts[0]-1, parts[1]);
    }
    return new Date();
  }

  function loadCSVData(data, filename, exCount, sessionCount) {
    const uploadZone = document.getElementById('csvUploadZone');
    if (uploadZone) uploadZone.style.display = 'none';
    document.getElementById('csvSummary')?.classList.add('show');
    const fnEl = document.getElementById('csvFileName');  if (fnEl) fnEl.textContent = filename;
    const fmEl = document.getElementById('csvFileMeta');  if (fmEl) fmEl.textContent = exCount + ' ejercicios · ' + sessionCount + ' sesiones';
    const luEl = document.getElementById('thLastUpdate'); if (luEl) luEl.textContent = 'Actualizado hoy';
    const rstEl = document.getElementById('csvResetBtn'); if (rstEl) rstEl.style.display = 'block';

    const dataSection = document.getElementById('thDataSection');
    if (dataSection) dataSection.style.display = 'block';

    // Top 20 por frecuencia de sesiones → grilla de tarjetas
    const sorted = Object.keys(data)
      .map(name => {
        const f = isBilateralDumbbell(name) ? 0.5 : 1;
        return {
          name,
          count:      data[name].length,
          bestWeight: parseFloat((Math.max(...data[name].map(s => s.weight)) * f).toFixed(1))
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    buildExerciseGrid(sorted, 'selectExerciseFromCSV');

    // Cargar primer ejercicio
    const firstEx = sorted[0]?.name;
    if (firstEx && data[firstEx]) displayExerciseData(data[firstEx], firstEx);
  }

  function selectExerciseFromCSV(exName, btn) {
    if (btn) {
      document.querySelectorAll('.th-ex-card').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    const stored = JSON.parse(localStorage.getItem('thCSVData') || '{}');
    if (stored[exName]) displayExerciseData(stored[exName], exName);
  }

  function displayExerciseData(sessions, exName) {
    const factor     = isBilateralDumbbell(exName) ? 0.5 : 1;
    const rawWeights = sessions.map(s => s.weight);
    const weights    = rawWeights.map(w => parseFloat((w * factor).toFixed(1)));
    // Mostrar dd/mm/yy en el primer punto de cada año nuevo
    const labels     = sessions.map((s, idx) => {
      const d = new Date(s.date);
      const prevD = idx > 0 ? new Date(sessions[idx-1].date) : null;
      const base  = d.getDate() + '/' + (d.getMonth()+1);
      return (!prevD || prevD.getFullYear() !== d.getFullYear())
        ? base + '/' + String(d.getFullYear()).slice(2)
        : base;
    });
    const best = Math.max(...weights);
    // Epley cap 15 reps (igual a TrainHeroic): mejor est1rm de sesiones r≤15, con factor
    const validSess = sessions.filter(s => s.reps <= 15 && s.est1rm > 0);
    const est1rm    = validSess.length ? Math.round(Math.max(...validSess.map(s => s.est1rm)) * factor) : Math.round(best * (1 + 5/30));

    // Working Max
    const labelEl = document.getElementById('thWMLabel');
    if (labelEl) labelEl.textContent = exName.length > 32 ? exName.slice(0,32) + '…' : exName;
    const wmEl = document.getElementById('thWMValue');
    if (wmEl) wmEl.textContent = best % 1 === 0 ? best : best.toFixed(1);
    const rmEl = document.getElementById('thEst1RM');
    if (rmEl) rmEl.textContent = est1rm + ' kg';

    // Tira RM estimada
    computeAndShowRMStrip(est1rm);

    // Gráfico
    if (chartStrength) {
      const margin = Math.max((best - Math.min(...weights)) * 0.25, best * 0.05);
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data              = weights;
      chartStrength.data.datasets[0].borderColor        = '#4a90d9';
      chartStrength.data.datasets[0].tension            = 0.3;
      chartStrength.data.datasets[0].pointRadius        = sessions.length <= 20 ? 3 : 0;
      chartStrength.data.datasets[0].pointBackgroundColor = '#4a90d9';
      chartStrength.data.datasets[0].pointBorderColor   = '#4a90d9';
      chartStrength.options.scales.y.min = Math.max(0, Math.min(...weights) - margin);
      chartStrength.options.scales.y.max = best + margin;
      chartStrength.update();
    }

    // Tabla últimas 5 sesiones
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      sessions.slice(-5).reverse().forEach((s) => {
        const d = new Date(s.date);
        const dateStr  = d.getDate()+'/'+(d.getMonth()+1);
        const dispW    = parseFloat((s.weight * factor).toFixed(1));
        const dispE    = Math.round(s.est1rm * factor);
        const isMax    = dispW === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${dateStr}</td><td>${s.sets||1}×${s.reps}</td><td class="${isMax?'highlight':''}">${dispW}</td><td>${dispE} kg</td>`;
        tbody.appendChild(tr);
      });
    }

    // Si hay un rango activo (no ALL), aplicarlo al ejercicio recién cargado.
    // Usar #strRangeBtns para no confundir con el selector de ritmo (#ritmoRangeBtns).
    const rBtn = document.querySelector('#strRangeBtns .th-range-btn.active');
    if (rBtn) {
      const rt = rBtn.textContent.trim().toLowerCase();
      const rangeMap = { '1m':'1m', '3m':'3m', '6m':'6m', '1a':'1y' };
      if (rangeMap[rt]) changeStrRange(rangeMap[rt], rBtn);
    }
  }

  function resetCSV() {
    localStorage.removeItem('thCSVData');
    localStorage.removeItem('thCSVFilename');
    document.getElementById('csvUploadZone').style.display = 'block';
    document.getElementById('csvSummary').classList.remove('show');
    document.getElementById('csvMapping').classList.remove('show');
    document.getElementById('thDataSection').style.display = 'none';
    document.getElementById('csvResetBtn').style.display = 'none';
    document.getElementById('csvFileInput').value = '';
    document.getElementById('thLastUpdate').textContent = 'Sin datos — sube tu CSV';
    // Restablecer rango a ALL para evitar interferencias al subir nuevo CSV
    const allBtn = document.querySelector('#strRangeBtns .th-range-btn:last-child');
    if (allBtn) {
      document.querySelectorAll('#strRangeBtns .th-range-btn').forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
    }
  }

  function showProcessing(show) {
    document.getElementById('csvProcessing').classList.toggle('show', show);
    document.getElementById('csvUploadZone').style.opacity = show ? '0.4' : '1';
  }

  function loadSavedCSV() {
    const stored = localStorage.getItem('thCSVData');
    const filename = localStorage.getItem('thCSVFilename') || 'trainheroic.csv';
    if (stored) {
      const data = JSON.parse(stored);
      const exCount = Object.keys(data).length;
      const sessionCount = Object.values(data).reduce((s,v)=>s+v.length,0);
      loadCSVData(data, filename, exCount, sessionCount);
    }
  }

  // Drag & Drop en la zona de upload
  document.addEventListener('DOMContentLoaded', () => {
    const zone = document.getElementById('csvUploadZone');
    if (!zone) return;
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
        readAndProcessFile(file); // leer el File directamente, sin reasignar input.files
      } else if (file) {
        alert('Solo se aceptan archivos .csv o .txt');
      }
    });
  });

  // ── TRAINHEROIC STRENGTH CHARTS ──
  let chartStrength = null;

  const strengthData = {
    squat:    { name:'Sentadilla',   wm:142, est1rm:158, data:[120,122,125,128,125,130,132,135,133,138,140,138,142], dates:['01M','03M','05M','07M','09M','11M','14M','16M','18M','20M','22M','24M','26M'].map((d,i)=>{const dt=new Date('2026-05-22');dt.setDate(dt.getDate()-26+i*2);return dt.getDate()+'/'+( dt.getMonth()+1)}) },
    bench:    { name:'Press Banca',  wm:105, est1rm:118, data:[82,85,87,90,88,92,95,97,95,100,102,103,105], dates:[] },
    deadlift: { name:'Peso Muerto',  wm:175, est1rm:195, data:[140,145,150,148,155,158,160,162,165,168,170,172,175], dates:[] },
    press:    { name:'Press Militar',wm:75,  est1rm:84,  data:[58,60,62,62,65,65,67,68,70,70,72,73,75], dates:[] },
    row:      { name:'Remo',         wm:95,  est1rm:107, data:[72,75,77,80,80,82,85,85,87,90,90,92,95], dates:[] },
    pullup:   { name:'Dominadas',    wm:20,  est1rm:22,  data:[5,6,7,8,9,10,11,12,14,15,17,18,20], dates:[] },
  };

  // Generar fechas para todos
  Object.keys(strengthData).forEach(k => {
    if (!strengthData[k].dates.length) {
      strengthData[k].dates = strengthData[k].data.map((_,i) => {
        const dt = new Date('2026-05-22');
        dt.setDate(dt.getDate() - 26 + i*2);
        return dt.getDate()+'/'+(dt.getMonth()+1);
      });
    }
  });

  function selectExercise(ex, btn) {
    document.querySelectorAll('.th-exercise-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const d = strengthData[ex];
    document.querySelector('#thWorkingMax .th-wm-label').textContent = 'Working Max · ' + d.name;
    document.getElementById('thWMValue').textContent = ex === 'pullup' ? d.wm + ' reps' : d.wm;
    document.getElementById('thEst1RM').textContent = ex === 'pullup' ? '—' : d.est1rm + ' kg';
    if (chartStrength) {
      chartStrength.data.labels = d.dates;
      chartStrength.data.datasets[0].data = d.data;
      const best = Math.max(...d.data);
      chartStrength.data.datasets[0].pointBackgroundColor = 'transparent';
      chartStrength.data.datasets[0].pointRadius = 0;
      chartStrength.data.datasets[0].pointBorderColor = "transparent";
      chartStrength.data.datasets[0].tension = 0.3;
      chartStrength.update();
    }
    // Actualizar tabla
    updateStrengthTable(ex);
  }

  function updateStrengthTable(ex) {
    const tables = {
      squat:    [['20 May','4×5','142','158 kg'],['16 May','3×5','138','154 kg'],['12 May','4×6','135','153 kg'],['08 May','3×8','125','148 kg'],['04 May','4×5','120','134 kg']],
      bench:    [['20 May','4×5','105','118 kg'],['15 May','3×6','100','113 kg'],['10 May','4×5','97','108 kg'],['05 May','3×8','90','107 kg'],['01 May','4×5','82','92 kg']],
      deadlift: [['19 May','3×5','175','195 kg'],['14 May','4×5','170','190 kg'],['09 May','3×5','165','184 kg'],['04 May','4×6','158','179 kg'],['01 May','3×5','140','156 kg']],
      press:    [['20 May','4×5','75','84 kg'],['15 May','3×6','72','81 kg'],['10 May','4×5','70','78 kg'],['05 May','3×8','65','77 kg'],['01 May','4×5','58','65 kg']],
      row:      [['18 May','4×8','95','107 kg'],['13 May','3×8','90','101 kg'],['08 May','4×8','85','96 kg'],['03 May','3×8','80','90 kg'],['01 May','4×8','72','81 kg']],
      pullup:   [['20 May','3×20 reps','20','—'],['15 May','3×18 reps','18','—'],['10 May','3×15 reps','15','—'],['05 May','3×12 reps','12','—'],['01 May','3×5 reps','5','—']],
    };
    const rows = tables[ex] || tables.squat;
    const tbody = document.getElementById('thSetsTable');
    if (!tbody) return;
    tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
    rows.forEach((r, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${r[0]}</td><td>${r[1]}</td><td class="${i===0?'highlight':''}">${r[2]}</td><td>${r[3]}${i===rows.length-1?' <span class="th-set-badge">Inicio</span>':''}</td>`;
      tbody.appendChild(tr);
    });
  }

  // ── Helper: ejercicios con mancuernas bilaterales ──
  // TrainHeroic exporta el peso TOTAL (ambas mancuernas). La UI de TH muestra por mancuerna.
  // Para coincidir con TH, dividimos por 2 en la presentación.
  // ── RUCKING: dashboard del atleta ────────────────────────────
  const RUCK_LOAD_CATS = [4,5,8,10,12,15,18,20,25,28,30,32,35,37,39,40,42,44,46,48,50];
  let chartRucking = null;
  let ruckAtletaDist = null;
  let ruckAtletaLoad = null;

  function fmtTimerRuck(sec) {
    if (!sec || sec <= 0) return '—';
    const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s = sec%60;
    return h > 0
      ? h+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')
      : m+':'+String(s).padStart(2,'0');
  }
  function fmtDateRuck(str) {
    if (!str) return '—';
    const d = new Date(str+'T12:00:00');
    return d.getDate()+' '+['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][d.getMonth()]+' '+d.getFullYear();
  }

  function initRuckingAtleta() {
    cargarRuckSEGuardado();
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
    const distBtns = document.getElementById('ruckADistBtns');
    const loadBtns = document.getElementById('ruckALoadBtns');
    if (!distBtns || !loadBtns) return;

    // Distancias únicas presentes en las sesiones
    const usedDists = [...new Set(sessions.map(s=>s.dist))].sort((a,b)=>a-b);
    const usedLoads = [...new Set(sessions.map(s=>s.load))].sort((a,b)=>a-b);

    if (!sessions.length) {
      document.getElementById('ruckAEmpty')?.style.setProperty('display','block');
      document.getElementById('ruckAData')?.style.setProperty('display','none');
      return;
    }

    document.getElementById('ruckAEmpty')?.style.setProperty('display','none');
    document.getElementById('ruckAData')?.style.setProperty('display','block');

    // Botones distancia
    distBtns.innerHTML = (usedDists.length ? usedDists : RUCK_DIST_CATS)
      .map(d=>`<button class="th-range-btn" onclick="selectRuckAtletaDist(${d},this)">${d} km</button>`)
      .join('');
    // Botones carga
    loadBtns.innerHTML = (usedLoads.length ? usedLoads : RUCK_LOAD_CATS)
      .map(l=>`<button class="th-range-btn" onclick="selectRuckAtletaLoad(${l},this)">${l} kg</button>`)
      .join('');

    // Contador total
    const countEl = document.getElementById('ruckACount');
    if (countEl) {
      const stravaCount = sessions.filter(s=>s.source==='strava').length;
      countEl.textContent = sessions.length+' sesión'+(sessions.length!==1?'es':'')+' · '+stravaCount+' desde Strava';
    }

    // Seleccionar primeros por defecto
    const firstDist = distBtns.querySelector('.th-range-btn');
    if (firstDist) firstDist.click();
  }

  function selectRuckAtletaDist(km, btn) {
    document.querySelectorAll('#ruckADistBtns .th-range-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    ruckAtletaDist = km;
    updateRuckingAtletaPR();
  }

  function selectRuckAtletaLoad(kg, btn) {
    document.querySelectorAll('#ruckALoadBtns .th-range-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    ruckAtletaLoad = kg;
    updateRuckingAtletaPR();
  }

  function updateRuckingAtletaPR() {
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
    const filtered = sessions.filter(s=>
      (!ruckAtletaDist || s.dist == ruckAtletaDist) &&
      (!ruckAtletaLoad || s.load == ruckAtletaLoad)
    );
    const withTime = filtered.filter(s=>s.time>0);
    const best = withTime.length ? withTime.reduce((a,b)=>a.time<=b.time?a:b) : null;
    const sorted = [...withTime].sort((a,b)=>a.date.localeCompare(b.date));

    // Stats
    const elBest = document.getElementById('ruckABestTime');
    const elDate = document.getElementById('ruckABestDate');
    const elSess = document.getElementById('ruckASessions');
    if (elBest) elBest.textContent = best ? fmtTimerRuck(best.time) : '—';
    if (elDate) elDate.textContent = best ? fmtDateRuck(best.date) : '—';
    if (elSess) elSess.textContent = filtered.length;

    // Delta vs primer registro
    const deltaEl = document.getElementById('ruckADelta');
    if (deltaEl && sorted.length >= 2) {
      const first  = sorted[0].time;
      const latest = sorted[sorted.length-1].time;
      const diff   = first - latest;
      const pct    = (Math.abs(diff)/first*100).toFixed(1);
      if (diff > 0) {
        deltaEl.innerHTML = `<span style="color:#27ae60;">▲ ${fmtTimerRuck(diff)}</span> <span style="font-size:11px;color:#999;">mejora · ${pct}%</span>`;
      } else if (diff < 0) {
        deltaEl.innerHTML = `<span style="color:#e67e22;">▼ ${fmtTimerRuck(-diff)}</span> <span style="font-size:11px;color:#999;">disminución · ${pct}%</span>`;
      } else {
        deltaEl.innerHTML = `<span style="color:#999;">— sin cambio</span>`;
      }
    } else if (deltaEl) {
      deltaEl.innerHTML = '<span style="color:#bbb;font-size:12px;">—</span>';
    }

    // Gráfico
    const ctx = document.getElementById('chartRucking');
    if (ctx) {
      if (chartRucking) { chartRucking.destroy(); chartRucking = null; }
      if (sorted.length) {
        chartRucking = new Chart(ctx, {
          type: 'line',
          data: {
            labels: sorted.map(s => {
              const d = new Date(s.date+'T12:00:00');
              return d.getDate()+'/'+(d.getMonth()+1);
            }),
            datasets:[{
              data: sorted.map(s => +(s.time/60).toFixed(2)),
              borderColor:'#8B1A1A', backgroundColor:'rgba(0,122,133,0.08)',
              fill:true, tension:0.3, pointRadius:4, pointBackgroundColor:'#8B1A1A',
              pointBorderColor:'#fff', pointBorderWidth:1.5
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{legend:{display:false}},
            scales:{
              y:{ reverse:true,
                  ticks:{ color:'#999', font:{size:10},
                    callback:v=>Math.floor(v)+':'+String(Math.round((v%1)*60)).padStart(2,'0')
                  },
                  grid:{ color:'rgba(0,0,0,0.05)' }
              },
              x:{ ticks:{ color:'#999', font:{size:10}, maxTicksLimit:6 }, grid:{display:false} }
            }
          }
        });
      }
    }

    // Sesiones recientes (últimas 5)
    const tbody = document.getElementById('ruckASessionsList');
    if (tbody) {
      const recent = [...filtered].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
      if (!recent.length) {
        tbody.innerHTML = '<div style="text-align:center;color:#aaa;padding:12px;font-style:italic;font-size:12px;">Sin sesiones para esta selección</div>';
      } else {
        tbody.innerHTML = recent.map(s=>`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.05);">
            <div>
              <div style="font-size:13px;font-weight:600;color:#333;">${fmtTimerRuck(s.time)}</div>
              <div style="font-size:11px;color:#999;">${fmtDateRuck(s.date)}${s.source==='strava'?' · <span style="color:#FC4C02;">Strava</span>':''}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:\'Barlow Condensed\',sans-serif;font-size:11px;color:#8B1A1A;">${s.dist} km · ${s.load} kg</div>
              ${s.elev>0?'<div style="font-size:10px;color:#bbb;">↑ '+s.elev+' m desnivel</div>':''}
            </div>
          </div>`).join('');
      }
    }
  }

  function updateRuckingDashboard() {
    initRuckingAtleta();
  }

  function toggleRuckManualAdd() {
    const f = document.getElementById('ruckAManualForm');
    if (f) f.style.display = f.style.display==='none' ? 'block' : 'none';
  }

  function addRuckManualSession() {
    const date  = document.getElementById('ruckADate')?.value;
    const dist  = parseFloat(document.getElementById('ruckADist')?.value);
    const load  = parseFloat(document.getElementById('ruckALoad')?.value);
    const tStr  = document.getElementById('ruckATime')?.value?.trim();
    if (!date||!dist||!load||!tStr) { alert('Completa todos los campos.'); return; }
    const parts = tStr.split(':').map(Number);
    const tSec  = parts.length===3 ? parts[0]*3600+parts[1]*60+parts[2] : parts[0]*60+(parts[1]||0);
    if (!tSec||tSec<=0) { alert('Formato de tiempo inválido (H:MM:SS).'); return; }
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
    sessions.push({ id:Date.now().toString(), date, dist, load, time:tSec, elev:0, notes:'Manual', terrain:1.2, source:'manual' });
    localStorage.setItem('ruckSessions', JSON.stringify(sessions));
    pushRuckingToCloud(sessions);
    document.getElementById('ruckAManualForm').style.display='none';
    initRuckingAtleta();
  }

  // ── SQUAT ENDURANCE (SE) — ingreso manual atleta ──────────────────────────
  function guardarRuckSE() {
    const val = parseInt(document.getElementById('ruckSEInput')?.value);
    const statusEl = document.getElementById('ruckSEStatus');
    if (!val || val < 1 || val > 300) {
      if (statusEl) statusEl.textContent = 'Ingresa un número válido de repeticiones.';
      return;
    }
    // Guardar en ruckProfile (mismo objeto que usa el coach)
    const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
    profile.se = val;
    profile.seDate = new Date().toISOString().slice(0,10);
    localStorage.setItem('ruckProfile', JSON.stringify(profile));
    if (statusEl) {
      statusEl.textContent = `✓ SE guardado: ${val} reps · ${profile.seDate}`;
      statusEl.style.color = '#27ae60';
    }
  }

  // Al iniciar, cargar SE guardado si existe
  function cargarRuckSEGuardado() {
    const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
    const inp = document.getElementById('ruckSEInput');
    const statusEl = document.getElementById('ruckSEStatus');
    if (profile.se && inp) {
      inp.value = profile.se;
      if (statusEl) {
        statusEl.textContent = `Último registro: ${profile.se} reps · ${profile.seDate || ''}`;
        statusEl.style.color = '#999';
      }
    }
  }

  function isBilateralDumbbell(name) {
    const lower = (name || '').toLowerCase();
    return (lower.includes('mancuerna') || lower.includes('mancuernas'))
      && !lower.includes('unilateral');
  }

  function changeStrRange(range, btn) {
    btn.closest('.th-range-selector').querySelectorAll('.th-range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Ejercicio activo
    const activeCard = document.querySelector('.th-ex-card.active');
    if (!activeCard) return;
    const fullName = activeCard.querySelector('.th-ex-name')?.textContent?.trim();
    if (!fullName) return;

    // Detectar fuente: embebida (.w/.d) o CSV (.weight/.date)
    let sessions = null;
    let isEmbedded = false;
    if (thRealData[fullName]) {
      sessions   = thRealData[fullName];
      isEmbedded = true;
    } else {
      try {
        const csv = localStorage.getItem('thCSVData');
        if (csv) { const d = JSON.parse(csv); if (d[fullName]) sessions = d[fullName]; }
      } catch(e) {}
    }
    if (!sessions || !sessions.length) return;

    // Filtrar por rango (1M / 3M / 6M / 1A / ALL)
    if (range !== 'all') {
      const now    = new Date();
      const months = range === '1m' ? 1 : range === '3m' ? 3 : range === '6m' ? 6 : 12;
      const cutoff = new Date(now.setMonth(now.getMonth() - months));
      sessions = isEmbedded
        ? sessions.filter(s => new Date(s.d)    >= cutoff)
        : sessions.filter(s => new Date(s.date) >= cutoff);
    }

    // Sin datos en el rango: limpiar gráfico en lugar de retornar silenciosamente
    if (!sessions.length) {
      if (chartStrength) {
        chartStrength.data.labels = [];
        chartStrength.data.datasets[0].data = [];
        chartStrength.update();
      }
      const tbody = document.getElementById('thSetsTable');
      if (tbody) tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:12px;font-style:italic;">Sin datos en este período</td></tr>';
      return;
    }

    // Factor: datos embebidos están en lbs → dividir por 2.205; CSV ya viene con factor bilateral aplicado
    const factor  = isEmbedded ? 1/2.205 : (isBilateralDumbbell(fullName) ? 0.5 : 1);

    const rawWeights  = isEmbedded ? sessions.map(s => s.w) : sessions.map(s => s.weight);
    const weights     = rawWeights.map(w => parseFloat((w * factor).toFixed(1)));
    // Mostrar dd/mm/yy en el primer punto de cada año nuevo (especialmente visible en vista ALL)
    const labels      = sessions.map((s, idx) => {
      const raw = isEmbedded ? s.d : s.date;
      const d   = typeof raw === 'string' && !raw.includes('T') ? new Date(raw + 'T12:00:00') : new Date(raw);
      const base = d.getDate() + '/' + (d.getMonth()+1);
      const prevRaw = idx > 0 ? (isEmbedded ? sessions[idx-1].d : sessions[idx-1].date) : null;
      const prevD   = prevRaw
        ? (typeof prevRaw === 'string' && !prevRaw.includes('T') ? new Date(prevRaw + 'T12:00:00') : new Date(prevRaw))
        : null;
      return (!prevD || prevD.getFullYear() !== d.getFullYear())
        ? base + '/' + String(d.getFullYear()).slice(2)
        : base;
    });
    const best = Math.max(...weights);

    if (chartStrength) {
      const margin = Math.max((best - Math.min(...weights)) * 0.25, best * 0.05);
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data              = weights;
      chartStrength.data.datasets[0].borderColor        = '#4a90d9';
      chartStrength.data.datasets[0].pointBackgroundColor = sessions.length <= 25 ? '#4a90d9' : 'transparent';
      chartStrength.data.datasets[0].pointRadius         = sessions.length <= 25 ? 3 : 0;
      chartStrength.data.datasets[0].pointBorderColor    = sessions.length <= 25 ? '#4a90d9' : 'transparent';
      chartStrength.data.datasets[0].tension             = 0.3;
      chartStrength.options.scales.y.min = Math.max(0, Math.min(...weights) - margin);
      chartStrength.options.scales.y.max = best + margin;
      chartStrength.update();
    }

    // Tabla últimas 5 sesiones filtradas
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      sessions.slice(-5).reverse().forEach((s, i, arr) => {
        const raw   = isEmbedded ? s.d : s.date;
        const d     = typeof raw === 'string' && !raw.includes('T') ? new Date(raw + 'T12:00:00') : new Date(raw);
        const label = d.getDate() + '/' + (d.getMonth()+1);
        const rawW  = isEmbedded ? s.w      : s.weight;
        const w     = parseFloat((rawW * factor).toFixed(1));
        const sr    = isEmbedded ? `${s.s}×${s.r}` : `${s.sets||1}×${s.reps}`;
        const e1rm  = Math.round((isEmbedded ? s.e : s.est1rm) * factor);
        const isMax = w === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${label}</td><td>${sr}</td><td class="${isMax?'highlight':''}">${w}</td><td>${e1rm} kg${i===arr.length-1?' <span class="th-set-badge">Inicio</span>':''}</td>`;
        tbody.appendChild(tr);
      });
    }
  }

  function initStrengthChart() {
    const ctx = document.getElementById('chartStrength');
    if (!ctx) return;
    if (chartStrength) { try { chartStrength.destroy(); } catch(e){} chartStrength = null; }
    // También limpiar window.chartStrength si el parche anterior lo había creado
    if (window.chartStrength && window.chartStrength !== chartStrength) {
      try { window.chartStrength.destroy(); } catch(e){} window.chartStrength = null;
    }
    const d = strengthData.squat;
    const best = Math.max(...d.data);
    chartStrength = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.dates,
        datasets: [{
          data: d.data,
          borderColor: '#4a90d9',
          backgroundColor: (ctx2) => {
            const g = ctx2.chart.ctx.createLinearGradient(0,0,0,150);
            g.addColorStop(0,'rgba(74,144,217,0.18)');
            g.addColorStop(1,'rgba(74,144,217,0)');
            return g;
          },
          fill: true,
          tension: 0.3,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          pointRadius: 0,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: '#ffffff',
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        animation: { duration: 500 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor:'#1a1e24', titleColor:'#4a90d9',
            bodyColor:'#fff', borderColor:'rgba(74,144,217,0.3)',
            borderWidth:1, padding:10, cornerRadius:6,
            callbacks: { label: c => c.raw + ' kg' }
          }
        },
        scales: {
          x: {
            ticks:{color:'#666666',font:{size:9},maxTicksLimit:6,
              callback: function(val, idx, ticks) {
                // Show year on first tick of each year
                const label = this.getLabelForValue(val);
                if (!label) return '';
                if (idx === 0 || idx === ticks.length-1) return label;
                const prev = this.getLabelForValue(ticks[idx-1]?.value);
                if (prev && label.split('/')[1] !== prev.split('/')[1]) return label;
                return idx % Math.ceil(ticks.length/6) === 0 ? label : '';
              }
            },
            grid:{color:'rgba(0,0,0,0.06)'}, border:{color:'transparent'}
          },
          y: {
            ticks:{color:'#555555',font:{size:9},callback:v=>v+' kg'},
            grid:{color:'rgba(0,0,0,0.06)',drawDashedLine:true},
            border:{color:'transparent'}
          }
        },
        elements: { line:{tension:0.3,borderWidth:2,borderCapStyle:'round'}, point:{radius:0, hoverRadius:0} }
      }
    });
  }

  // ── ENTRADA MANUAL ──
  function toggleManual(btn) {
    const panel = document.getElementById('manualPanel');
    const icon = btn.querySelector('.manual-toggle-icon');
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    icon.classList.toggle('open', !isOpen);
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ── HISTORIAL DE TIEMPOS MANUALES ────────────────
  // Formato localStorage: manualTimesHistory = { "10km": [{date:"YYYY-MM-DD", time:"MM:SS"}, ...], ... }
  // Orden cronológico ascendente por distancia; las zonas usan el MÁS RECIENTE

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  // Convierte el historial completo en entradas prData[] para el gráfico
  function buildPRDataFromHistory(history) {
    const dists = ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'];
    dists.forEach(d => {
      const entries = history[d];
      if (!entries || !entries.length) return;
      const mapped = entries
        .map(e => {
          const p = e.time.split(':').map(Number);
          let sec = 0;
          if (p.length === 2) sec = p[0]*60 + p[1];
          else if (p.length === 3) sec = p[0]*3600 + p[1]*60 + p[2];
          return { date: new Date(e.date + 'T12:00:00'), seconds: sec, source: e.source || 'manual' };
        })
        .filter(e => e.seconds > 0)
        .sort((a, b) => a.date - b.date);
      if (mapped.length) prData[d] = mapped;
    });
  }

  // Devuelve {distKey: timeString} con el tiempo MÁS RECIENTE por distancia
  function getLatestTimes(history) {
    const latest = {};
    Object.keys(history).forEach(d => {
      const entries = history[d];
      if (!entries || !entries.length) return;
      const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
      latest[d] = sorted[0].time;
    });
    return latest;
  }

  function saveManualTimes() {
    const dists = ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'];

    // Cargar historial existente (con migración desde formato antiguo si fuera necesario)
    let history = JSON.parse(localStorage.getItem('manualTimesHistory') || '{}');
    const oldFlat = localStorage.getItem('manualTimes');
    if (oldFlat && !Object.keys(history).length) {
      const old = JSON.parse(oldFlat);
      dists.forEach(d => { if (old[d]) history[d] = [{ date: todayISO(), time: old[d] }]; });
      localStorage.removeItem('manualTimes');
    }

    let added = 0;
    dists.forEach(d => {
      const timeVal = document.getElementById('mt_'+d)?.value.trim();
      const dateEl  = document.getElementById('md_'+d);
      const dateVal = dateEl?.value || todayISO();
      if (!timeVal) return;

      // Validar formato mínimo MM:SS o H:MM:SS
      const parts = timeVal.split(':');
      if (parts.length < 2 || parts.length > 3) return;

      if (!history[d]) history[d] = [];

      // Evitar duplicado exacto (misma fecha + mismo tiempo)
      const dup = history[d].some(e => e.date === dateVal && e.time === timeVal);
      if (dup) return;

      history[d].push({ date: dateVal, time: timeVal, source: 'manual' });
      history[d].sort((a, b) => a.date.localeCompare(b.date)); // orden cronológico
      added++;

      // Limpiar campo de tiempo; la fecha se queda lista para la próxima entrada
      const timeEl = document.getElementById('mt_'+d);
      if (timeEl) timeEl.value = '';
    });

    localStorage.setItem('manualTimesHistory', JSON.stringify(history));

    buildPRDataFromHistory(history);
    mostrarUltimosRegistros(history);
    calcularZonasCarrera();

    const activeBtn = document.querySelector('.th-dist-btn.active');
    const m = activeBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    const dist = m ? m[1] : '5km';
    if (prData[dist]) updatePRChart(dist);

    // Feedback visual
    const btn = document.querySelector('.manual-save-btn');
    const orig = btn.innerHTML;
    if (added > 0) {
      btn.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;vertical-align:middle;margin-right:6px;"></i> Guardado';
      btn.style.color = '#2ecc71';
      btn.style.borderColor = 'rgba(46,204,113,0.4)';
    } else {
      btn.innerHTML = '<i data-lucide="minus" style="width:13px;height:13px;vertical-align:middle;margin-right:6px;"></i> Sin cambios';
      btn.style.color = '#666';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => { btn.innerHTML = orig; btn.style.color=''; btn.style.borderColor=''; if(typeof lucide!=='undefined') lucide.createIcons(); }, 2200);
  }

  function loadManualTimes() {
    // Migrar formato antiguo si existe
    let history = JSON.parse(localStorage.getItem('manualTimesHistory') || '{}');
    const oldFlat = localStorage.getItem('manualTimes');
    if (oldFlat && !Object.keys(history).length) {
      const old = JSON.parse(oldFlat);
      const dists = ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'];
      dists.forEach(d => { if (old[d]) history[d] = [{ date: todayISO(), time: old[d] }]; });
      localStorage.setItem('manualTimesHistory', JSON.stringify(history));
      localStorage.removeItem('manualTimes');
    }

    // Poner fecha de hoy en inputs de fecha (para que el atleta solo tenga que ingresar el tiempo)
    const today = todayISO();
    const dists2 = ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'];
    dists2.forEach(d => {
      const el = document.getElementById('md_'+d);
      if (el && !el.value) el.value = today;
    });

    buildPRDataFromHistory(history);
    mostrarUltimosRegistros(history);

    // Actualizar gráfico con la distancia activa
    const activeBtn = document.querySelector('.th-dist-btn.active');
    const m2 = activeBtn?.getAttribute('onclick')?.match(/'([^']+)'/);
    const dist = m2 ? m2[1] : '5km';
    if (prData[dist] && typeof updatePRChart === 'function') updatePRChart(dist);

    calcularZonasCarrera();
  }

  // Muestra el último tiempo guardado debajo de cada input como referencia
  function mostrarUltimosRegistros(history) {
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'].forEach(d => {
      const el = document.getElementById('mlast_'+d);
      if (!el) return;
      const entries = history[d];
      if (!entries || !entries.length) { el.textContent = ''; return; }
      const sorted = [...entries].sort((a,b) => b.date.localeCompare(a.date));
      const last = sorted[0];
      const [y, mo, da] = last.date.split('-').map(Number);
      const fechaStr = `${da} ${meses[mo-1]} ${String(y).slice(2)}`;
      const fuente  = last.source === 'strava' ? '🔗 Strava' : '✏️';
      el.textContent = `${fuente} ${last.time} · ${fechaStr}`;
    });
  }

  // ── ZONAS DE CARRERA (Cerezuela-Espejo et al., 2018) ──────────────────────────
  let _vPicoMode = 'directo';

  function setVpicoTab(mode, btn) {
    _vPicoMode = mode;
    document.querySelectorAll('.zona-tab').forEach(b => b.classList.remove('zona-tab-active'));
    if (btn) btn.classList.add('zona-tab-active');
    const pDirecto = document.getElementById('panelVpicoDirecto');
    const p5min    = document.getElementById('panelVpico5min');
    if (pDirecto) pDirecto.style.display = mode === 'directo' ? '' : 'none';
    if (p5min)    p5min.style.display    = mode === '5min'    ? '' : 'none';
    if (mode === '5min') {
      const inp = document.getElementById('inputVpico');
      if (inp) inp.value = '';
    } else {
      const inp5  = document.getElementById('inputDist5min');
      const calcEl = document.getElementById('vPicoDerivada');
      if (inp5)   inp5.value = '';
      if (calcEl) calcEl.style.display = 'none';
    }
  }

  function onDist5minInput() {
    const dist   = parseFloat(document.getElementById('inputDist5min').value);
    const calcEl = document.getElementById('vPicoDerivada');
    const valEl  = document.getElementById('vPicoCalcVal');
    if (!isNaN(dist) && dist > 0) {
      if (calcEl) calcEl.style.display = '';
      if (valEl)  valEl.textContent = (dist * 12).toFixed(1);
    } else {
      if (calcEl) calcEl.style.display = 'none';
    }
  }

  function guardarYCalcularZonas() {
    let vpico = null;
    if (_vPicoMode === 'directo') {
      vpico = parseFloat(document.getElementById('inputVpico')?.value);
    } else {
      const dist = parseFloat(document.getElementById('inputDist5min')?.value);
      if (!isNaN(dist) && dist > 0) vpico = parseFloat((dist * 12).toFixed(1));
    }
    const fcmax = parseFloat(document.getElementById('inputFcMax')?.value);
    const hasVpico = vpico && !isNaN(vpico) && vpico > 0;
    const hasFc    = fcmax && !isNaN(fcmax) && fcmax > 0;
    if (!hasVpico && !hasFc) {
      alert('Ingresa al menos V PICO o FC máx para calcular las zonas.');
      return;
    }
    localStorage.setItem('zonaParams', JSON.stringify({
      vpico:   hasVpico ? vpico : null,
      fcmax:   hasFc    ? fcmax : null,
      mode:    _vPicoMode,
      dist5min: _vPicoMode === '5min'
        ? parseFloat(document.getElementById('inputDist5min')?.value) || null
        : null
    }));
    calcularZonasCarrera();
  }

  // ── BANNER STRAVA → ZONAS ──────────────────────────────────────────────────
  function mostrarZonaStravaBanner(pending) {
    const banner = document.getElementById('zonaStravaBanner');
    const infoEl = document.getElementById('zonaStravaInfo');
    if (!banner || !pending) return;
    const [y, mo, da] = pending.date.split('-').map(Number);
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const fechaLabel = `${da} ${meses[mo-1]} ${String(y).slice(2)}`;
    const pace = secToTime(Math.round(pending.seconds / 5));
    const tiempo = secToTime(pending.seconds);
    if (infoEl) infoEl.innerHTML =
      `${tiempo} &mdash; ${pace}/km &mdash; ${fechaLabel}<br>` +
      `<span style="font-size:11px;color:#aaa;">V PICO estimada: ` +
      `<strong style="color:#8B1A1A;font-family:'Barlow Condensed',sans-serif;">${pending.vPicoEst} km/h</strong>` +
      ` (5km ≈ 92% V PICO)</span>`;
    banner.style.display = 'block';
  }

  function checkStravaZonaUpdate(runs) {
    const runs5km = runs.filter(a => a.distance >= 4950 && a.distance <= 5050);
    if (!runs5km.length) return;
    // La actividad 5km más reciente
    const latest = runs5km.sort(
      (a,b) => new Date(b.start_date_local) - new Date(a.start_date_local)
    )[0];
    const latestDate = new Date(latest.start_date_local).toISOString().slice(0,10);
    // Ya fue ofrecida/aplicada → no volver a mostrar
    if (localStorage.getItem('zonaStrava5kmDate') === latestDate) return;
    // Tiempo ajustado a exactamente 5km
    const seconds5k = Math.round(latest.moving_time * (5000 / latest.distance));
    const speedKph  = parseFloat((18000 / seconds5k).toFixed(2));
    const vPicoEst  = parseFloat((speedKph / 0.92).toFixed(1));
    const pending = { date: latestDate, seconds: seconds5k, speedKph, vPicoEst };
    localStorage.setItem('zonaStrava5km_pending', JSON.stringify(pending));
    mostrarZonaStravaBanner(pending);
  }

  function usarStrava5kmParaZonas() {
    const pending = JSON.parse(localStorage.getItem('zonaStrava5km_pending') || 'null');
    if (!pending) return;
    // Cambiar a modo directo y prellenar V PICO estimada
    setVpicoTab('directo', document.getElementById('tabVpicoDirecto'));
    const inp = document.getElementById('inputVpico');
    if (inp) inp.value = pending.vPicoEst;
    // Leer FC máx si ya estaba ingresada
    const fcmax = parseFloat(document.getElementById('inputFcMax')?.value);
    localStorage.setItem('zonaParams', JSON.stringify({
      vpico:      pending.vPicoEst,
      fcmax:      (fcmax && !isNaN(fcmax) && fcmax > 0) ? fcmax : null,
      mode:       'directo',
      dist5min:   null,
      fromStrava: pending.date
    }));
    localStorage.setItem('zonaStrava5kmDate', pending.date);
    localStorage.removeItem('zonaStrava5km_pending');
    descartarStravaBanner();
    calcularZonasCarrera();
  }

  function descartarStravaBanner() {
    const banner = document.getElementById('zonaStravaBanner');
    if (banner) banner.style.display = 'none';
    const pending = JSON.parse(localStorage.getItem('zonaStrava5km_pending') || 'null');
    if (pending) localStorage.setItem('zonaStrava5kmDate', pending.date);
    localStorage.removeItem('zonaStrava5km_pending');
  }

  // ── INIT ZONAS ─────────────────────────────────────────────────────────────
  function initZonasCarrera() {
    // Restaurar parámetros guardados
    const saved = JSON.parse(localStorage.getItem('zonaParams') || 'null');
    if (saved) {
      if (saved.mode === '5min') {
        setVpicoTab('5min', document.getElementById('tabVpico5min'));
        if (saved.dist5min) {
          const inp5 = document.getElementById('inputDist5min');
          if (inp5) { inp5.value = saved.dist5min; onDist5minInput(); }
        }
      } else {
        if (saved.vpico) {
          const inp = document.getElementById('inputVpico');
          if (inp) inp.value = saved.vpico;
        }
      }
      if (saved.fcmax) {
        const fcInp = document.getElementById('inputFcMax');
        if (fcInp) fcInp.value = saved.fcmax;
      }
      calcularZonasCarrera();
    }
    // Restaurar banner de Strava si quedó pendiente de sesión anterior
    const pending = JSON.parse(localStorage.getItem('zonaStrava5km_pending') || 'null');
    if (pending && localStorage.getItem('zonaStrava5kmDate') !== pending.date) {
      mostrarZonaStravaBanner(pending);
    }
  }

  function calcularZonasCarrera() {
    const saved      = JSON.parse(localStorage.getItem('zonaParams') || 'null');
    const sinDatosEl = document.getElementById('zonasSinDatos');
    const refEl      = document.getElementById('zonasRef');
    const refTexto   = document.getElementById('zonasRefTexto');
    const tablaEl    = document.getElementById('zonasTabla');
    const filasEl    = document.getElementById('zonasFilas');

    // km/h → min:ss /km
    function kphToPace(kph) {
      if (!kph || kph <= 0) return '—';
      const secs = 3600 / kph;
      const m = Math.floor(secs / 60);
      const s = Math.round(secs % 60);
      return `${m}:${String(s).padStart(2,'0')}`;
    }

    if (!saved || (!saved.vpico && !saved.fcmax)) {
      if (sinDatosEl) sinDatosEl.style.display = 'block';
      if (refEl)      refEl.style.display      = 'none';
      if (tablaEl)    tablaEl.style.display     = 'none';
      return;
    }

    const vpico = saved.vpico;
    const fcmax = saved.fcmax;

    if (sinDatosEl) sinDatosEl.style.display = 'none';
    if (refEl)      refEl.style.display      = 'block';
    if (refTexto) {
      const parts = [];
      if (vpico) parts.push(`V PICO ${vpico.toFixed(1)} km/h`);
      if (fcmax) parts.push(`FC máx ${Math.round(fcmax)} ppm`);
      refTexto.textContent = parts.join(' · ');
    }

    // Modelo Cerezuela-Espejo: R0-R3+
    const ZONAS = [
      { id:'R0',  nombre:'Recuperación',     desc:'70-90% VT1/LT',  color:'#5b9bd5', vLo:0.50, vHi:0.52, fcLo:0.55, fcHi:0.70, rpe:'8-10'  },
      { id:'R1',  nombre:'Umbral aeróbico',   desc:'90-110% VT1/LT', color:'#27ae60', vLo:0.53, vHi:0.64, fcLo:0.71, fcHi:0.83, rpe:'11-12' },
      { id:'R2',  nombre:'Tempo / MLSS',      desc:'95-105% MLSS',   color:'#f39c12', vLo:0.65, vHi:0.75, fcLo:0.84, fcHi:0.88, rpe:'13-14' },
      { id:'R3',  nombre:'Umbral anaeróbico', desc:'95-105% VT2',    color:'#e67e22', vLo:0.76, vHi:0.89, fcLo:0.89, fcHi:0.94, rpe:'15-16' },
      { id:'R3+', nombre:'Potencia aeróbica', desc:'≥95% VO₂máx',   color:'#e74c3c', vLo:0.90, vHi:1.00, fcLo:0.95, fcHi:null,  rpe:'>17'   },
    ];

    if (filasEl) {
      filasEl.innerHTML = ZONAS.map((z, i) => {
        // Velocidad
        const vLow  = vpico ? parseFloat((vpico * z.vLo).toFixed(1)) : null;
        const vHigh = vpico ? parseFloat((vpico * z.vHi).toFixed(1)) : null;
        const speedStr = vLow  !== null ? `${vLow}–${vHigh} km/h` : '';
        const paceStr  = vHigh !== null ? `${kphToPace(vHigh)} – ${kphToPace(vLow)} /km` : '';

        // FC
        const fcLow  = fcmax ? Math.round(fcmax * z.fcLo) : null;
        const fcHigh = fcmax && z.fcHi ? Math.round(fcmax * z.fcHi) : null;
        const fcStr  = fcmax ? (fcHigh ? `${fcLow}–${fcHigh} ppm` : `>${fcLow} ppm`) : '';

        const rowBg = i % 2 === 0 ? 'rgba(0,0,0,0.018)' : 'transparent';
        const sep   = i < ZONAS.length - 1 ? 'border-bottom:1px solid rgba(0,0,0,0.05);' : '';

        return `<div style="display:grid;grid-template-columns:40px 1fr 110px;gap:0;padding:11px 12px;background:${rowBg};align-items:start;${sep}">
          <div>
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:800;letter-spacing:0.5px;color:${z.color};background:${z.color}18;border:1px solid ${z.color}55;border-radius:4px;padding:2px 5px;display:inline-block;">${z.id}</span>
          </div>
          <div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;letter-spacing:0.3px;color:#1a1a1a;">${z.nombre}</div>
            <div style="font-family:'Barlow',sans-serif;font-size:10px;color:#bbb;margin-top:2px;">${z.desc}</div>
          </div>
          <div style="text-align:right;">
            ${speedStr ? `<div style="font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:600;color:#333;">${speedStr}</div>` : ''}
            ${paceStr  ? `<div style="font-family:'Barlow',sans-serif;font-size:10px;color:#999;margin-top:1px;">${paceStr}</div>` : ''}
            ${fcStr    ? `<div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#666;margin-top:${vpico ? '4px' : '0'};">${fcStr}</div>` : ''}
            <div style="font-family:'Barlow',sans-serif;font-size:10px;color:#bbb;margin-top:2px;">RPE ${z.rpe}</div>
          </div>
        </div>`;
      }).join('');
    }
    if (tablaEl) tablaEl.style.display = 'block';
  }

  // ── FLOW PAGOS ────────────────────────────────
  const FLOW_WORKER = 'https://flow-payments.jaimea-gomezh.workers.dev';

  async function contratarPlan(plan, monto) {
    const user = window._auth?.currentUser;
    if (!user) {
      alert('Debes iniciar sesión primero para contratar un plan.');
      return;
    }
    try {
      const res = await fetch(`${FLOW_WORKER}/crear-pago`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          monto,
          email: user.email,
          nombre: user.displayName || user.email.split('@')[0]
        })
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Error al procesar el pago. Intenta de nuevo.');
        console.error('Flow error:', data);
      }
    } catch(e) {
      alert('Error de conexión. Intenta de nuevo.');
      console.error(e);
    }
  }

  async function contratarAsesoria(meses, monto) {
    const user = window._auth?.currentUser;
    if (!user) {
      alert('Debes iniciar sesión primero para contratar una asesoría.');
      return;
    }
    try {
      const res = await fetch(`${FLOW_WORKER}/crear-suscripcion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meses,
          monto,
          email: user.email,
          nombre: user.displayName || user.email.split('@')[0]
        })
      });
      const data = await res.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Error al procesar la suscripción. Intenta de nuevo.');
        console.error('Flow error:', data);
      }
    } catch(e) {
      alert('Error de conexión. Intenta de nuevo.');
      console.error(e);
    }
  }

  window.contratarPlan     = contratarPlan;
  window.contratarAsesoria = contratarAsesoria;


  if (typeof lucide !== "undefined") lucide.createIcons();
  startSlider();

  // Animación barras tracker al hacer scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.tracker-bar-fill').forEach(bar => {
          const w = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => bar.style.width = w, 100);
        });
      }
    });
  }, { threshold: 0.3 });

  const trackerSection = document.getElementById('tracker');
  if (trackerSection) observer.observe(trackerSection);
