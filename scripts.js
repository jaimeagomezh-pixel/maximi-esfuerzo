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
          if (typeof lucide !== 'undefined') lucide.createIcons();
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
      // Marcar Strava como conectado inmediatamente
      document.querySelectorAll('.dash-connect-card').forEach(card => {
        if (card.querySelector('.dash-connect-name')?.textContent === 'Strava') {
          card.classList.add('conectado');
          card.querySelector('.dash-connect-status').textContent = '✓ Conectado';
          card.querySelector('.dash-connect-icon').textContent = '🟠';
        }
      });

      // Atleta
      const atletaRes = await fetch('https://www.strava.com/api/v3/athlete', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      });
      const atleta = await atletaRes.json();

      // Actividades recientes
      const actRes = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=1', {
        headers: { 'Authorization': 'Bearer ' + accessToken }
      });
      const actividades = await actRes.json();

      if (actividades.length > 0) {
        const ultima = actividades[0];
        const kcalQuem = ultima.calories || Math.round(ultima.moving_time / 60 * 8);
        const fcProm = ultima.average_heartrate || '--';

        document.getElementById('mKcalQuem').textContent = kcalQuem.toLocaleString();
        document.getElementById('mFC').textContent = typeof fcProm === 'number' ? Math.round(fcProm) : fcProm;
      }

      return atleta;
    } catch(e) {
      console.error('Strava error:', e);
    }
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
          grid: { color: 'rgba(255,255,255,0.03)' },
          border: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          ticks: { color: '#555', font: { size: 9 } },
          grid: { color: 'rgba(255,255,255,0.04)' },
          border: { color: 'rgba(255,255,255,0.05)' }
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
          titleColor: '#00c8d4',
          bodyColor: '#ffffff',
          borderColor: 'rgba(0,200,212,0.2)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 6,
        }
      },
      scales: {
        x: {
          ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 9 }, maxTicksLimit: 6 },
          grid: { color: 'rgba(255,255,255,0.03)' },
          border: { color: 'transparent' }
        },
        y: {
          ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 9 } },
          grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
          border: { color: 'transparent' }
        }
      },
      elements: {
        point: { radius: 0, hoverRadius: 5, hoverBackgroundColor: '#00c8d4' },
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
          borderColor: '#00c8d4',
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
    const best = Math.min(...values);
    const first = values[0];
    const bestEntry = data.find(e => e.seconds === best);

    // Actualizar stats
    document.getElementById('prBest').textContent = secToTime(best);
    document.getElementById('prBestDate').textContent = formatDate(bestEntry.date);
    document.getElementById('prFirst').textContent = secToTime(first);
    document.getElementById('prFirstDate').textContent = formatDate(data[0].date);
    const diff = first - best;
    document.getElementById('prDelta').textContent = '▼ ' + secToTime(diff);

    // Colorear puntos: mejor = dorado, el resto = cian
    const pointColors = values.map(v => v === best ? '#d4a843' : 'rgba(0,200,212,0.6)');
    const pointRadius = values.map(v => v === best ? 6 : 3);

    chartPR.data.labels = labels;
    chartPR.data.datasets[0].data = values;
    chartPR.data.datasets[0].pointBackgroundColor = pointColors;
    chartPR.data.datasets[0].pointRadius = pointRadius;
    chartPR.options.scales.y.ticks.callback = v => secToTime(Math.round(v));
    chartPR.options.scales.y.reverse = true;

    // Ajustar rango Y
    const margin = (Math.max(...values) - best) * 0.15;
    chartPR.options.scales.y.min = best - margin;
    chartPR.options.scales.y.max = Math.max(...values) + margin;

    chartPR.update('active');
  }

  function initPRChart() {
    const ctx = document.getElementById('chartPR');
    if (!ctx) return;

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
          borderColor: '#00c8d4',
          backgroundColor: (ctx2) => {
            const g = ctx2.chart.ctx.createLinearGradient(0,0,0,160);
            g.addColorStop(0,'rgba(0,200,212,0.12)');
            g.addColorStop(1,'rgba(0,200,212,0)');
            return g;
          },
          fill: true,
          pointBackgroundColor: pointColors,
          pointBorderColor: 'transparent',
          pointRadius: pointRadius,
          pointHoverRadius: 7,
          pointHoverBackgroundColor: '#d4a843',
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
            titleColor: '#00c8d4',
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
            ticks: { color: 'rgba(255,255,255,0.2)', font: { size: 9 }, maxTicksLimit: 8 },
            grid: { color: 'rgba(255,255,255,0.03)' },
            border: { color: 'transparent' }
          },
          y: {
            reverse: true,
            min: Math.min(...values) * 0.97,
            max: Math.max(...values) * 1.02,
            ticks: {
              color: 'rgba(255,255,255,0.3)',
              font: { size: 9 },
              callback: v => secToTime(Math.round(v))
            },
            grid: { color: 'rgba(255,255,255,0.04)' },
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

  function loadRealTHData() {
    // Hide upload zone, show real data directly
    const uploadZone = document.getElementById('csvUploadZone');
    if (uploadZone) uploadZone.style.display = 'none';
    
    const processing = document.getElementById('csvProcessing');
    if (processing) processing.classList.remove('show');
    
    const mapping = document.getElementById('csvMapping');
    if (mapping) mapping.classList.remove('show');

    // Actualizar botones ejercicios
    const selector = document.getElementById('exerciseSelector');
    if (selector) {
      selector.innerHTML = thExerciseNames.map((ex, i) =>
        `<button class="th-exercise-btn${i===0?' active':''}" onclick="selectExerciseReal('${ex.replace(/'/g,"\\'")}'  ,this)">${ex.substring(0,22)}${ex.length>22?'...':''}</button>`
      ).join('');
    }
    // Mostrar sección datos
    const dataSection = document.getElementById('thDataSection');
    if (dataSection) dataSection.style.display = 'block';

    // Ocultar uploader
    document.getElementById('csvUploadZone').style.display = 'none';

    // Mostrar resumen
    const summary = document.getElementById('csvSummary');
    if (summary) {
      summary.classList.add('show');
      document.getElementById('csvFileName').textContent = 'training_data.csv';
      const totalSessions = Object.values(thRealData).reduce((s,v)=>s+v.length,0);
      document.getElementById('csvFileMeta').textContent = thExerciseNames.length + ' ejercicios · ' + totalSessions + ' sesiones desde 2023';
    }
    document.getElementById('thLastUpdate').textContent = 'Actualizado: Mar 2026';

    // Cargar primer ejercicio
    selectExerciseReal(thExerciseNames[0], document.querySelector('.th-exercise-btn.active'));
  }

  function selectExerciseReal(exName, btn) {
    if (btn) {
      document.querySelectorAll('.th-exercise-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
    const sessions = thRealData[exName];
    if (!sessions || !sessions.length) return;

    const weights = sessions.map(s => s.w);
    const labels = sessions.map(s => formatDateShort(s.d));
    const best = Math.max(...weights);
    const bestSession = sessions.find(s => s.w === best);
    const est1rm = bestSession ? bestSession.e : Math.round(best * 1.05);

    // Update Working Max
    document.querySelector('#thWorkingMax .th-wm-label').textContent = 'Working Max · ' + exName.substring(0,30);
    document.getElementById('thWMValue').textContent = best;
    document.getElementById('thEst1RM').textContent = est1rm + ' kg est. 1RM';

    // Update chart
    if (chartStrength) {
      const margin = (Math.max(...weights) - Math.min(...weights)) * 0.25 || Math.max(...weights) * 0.05;
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data = weights;
      chartStrength.data.datasets[0].borderColor = '#4a90d9';
      chartStrength.data.datasets[0].tension = 0.3;
      chartStrength.data.datasets[0].pointBackgroundColor = 'transparent';
      chartStrength.data.datasets[0].pointRadius = 0;
      chartStrength.data.datasets[0].pointBorderColor = "transparent";
      chartStrength.data.datasets[0].tension = 0.3;
      chartStrength.options.scales.y.min = Math.max(0, Math.min(...weights) - margin);
      chartStrength.options.scales.y.max = Math.max(...weights) + margin;
      chartStrength.update();
    }

    // Update table - last 5 sessions
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      const last5 = sessions.slice(-5).reverse();
      last5.forEach((s, i) => {
        const isMax = s.w === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${formatDateShort(s.d)}</td><td>${s.s}×${s.r}</td><td class="${isMax?'highlight':''}">${s.w}</td><td>${s.e} kg${i===last5.length-1?' <span class="th-set-badge">Inicio</span>':''}</td>`;
        tbody.appendChild(tr);
      });
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
    weight:   ['weight','peso','kg','load','carga','weight (kg)','load (kg)'],
    reps:     ['reps','repeticiones','rep','repetition','repetitions'],
    sets:     ['sets','series','set'],
    notes:    ['notes','notas','note','comments'],
  };

  function guessColumn(headers, field) {
    const aliases = COL_ALIASES[field] || [];
    for (const h of headers) {
      if (aliases.includes(h.toLowerCase().trim())) return h;
    }
    // Búsqueda parcial
    for (const h of headers) {
      for (const a of aliases) {
        if (h.toLowerCase().includes(a) || a.includes(h.toLowerCase())) return h;
      }
    }
    return headers[0]; // fallback
  }

  function handleCSVFile(input) {
    const file = input.files[0];
    if (!file) return;
    showProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setTimeout(() => processCSV(e.target.result, file.name), 300);
    };
    reader.readAsText(file, 'UTF-8');
  }

  function processCSV(text, filename) {
    // Detectar separador (coma, punto y coma, tab)
    const sep = text.includes(';') ? ';' : text.includes('\t') ? '\t' : ',';
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) { showProcessing(false); alert('CSV vacío o inválido'); return; }

    csvHeaders = lines[0].split(sep).map(h => h.trim().replace(/"/g,''));
    csvRawData = lines.slice(1).map(line => {
      const vals = line.split(sep).map(v => v.trim().replace(/"/g,''));
      const obj = {};
      csvHeaders.forEach((h, i) => obj[h] = vals[i] || '');
      return obj;
    });

    // Intentar mapeo automático
    const dateCol     = guessColumn(csvHeaders, 'date');
    const exerciseCol = guessColumn(csvHeaders, 'exercise');
    const weightCol   = guessColumn(csvHeaders, 'weight');
    const repsCol     = guessColumn(csvHeaders, 'reps');

    // Verificar si el mapeo automático es bueno
    const autoMapped = csvRawData.slice(0,3).every(row => {
      const d = row[dateCol];
      const w = parseFloat(row[weightCol]);
      return d && !isNaN(w) && w > 0;
    });

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
      sel.innerHTML = csvHeaders.map(h =>
        `<option value="${h}" ${h === guessColumn(csvHeaders, fields[i]) ? 'selected' : ''}>${h}</option>`
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

      // Calcular 1RM estimado (fórmula Epley)
      const est1rm = Math.round(w * (1 + reps / 30));
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

    // Guardar en localStorage
    localStorage.setItem('thCSVData', JSON.stringify(merged));
    localStorage.setItem('thCSVFilename', filename);

    // Actualizar UI
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
    // Ocultar uploader, mostrar resumen
    document.getElementById('csvUploadZone').style.display = 'none';
    document.getElementById('csvSummary').classList.add('show');
    document.getElementById('csvFileName').textContent = filename;
    document.getElementById('csvFileMeta').textContent = exCount + ' ejercicios · ' + sessionCount + ' sesiones';
    document.getElementById('thLastUpdate').textContent = 'Actualizado hoy';
    document.getElementById('csvResetBtn').style.display = 'block';

    // Mostrar sección de datos
    const dataSection = document.getElementById('thDataSection');
    if (dataSection) dataSection.style.display = 'block';

    // Actualizar botones de ejercicios
    const selector = document.getElementById('exerciseSelector');
    if (selector) {
      selector.innerHTML = Object.keys(data).slice(0, 8).map((ex, i) =>
        `<button class="th-exercise-btn${i===0?' active':''}" onclick="selectExerciseFromCSV('${ex.replace(/'/g,"\'")}',this)">${ex}</button>`
      ).join('');
    }

    // Cargar primer ejercicio
    const firstEx = Object.keys(data)[0];
    if (firstEx) displayExerciseData(data[firstEx], firstEx);
  }

  function selectExerciseFromCSV(exName, btn) {
    document.querySelectorAll('.th-exercise-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const stored = JSON.parse(localStorage.getItem('thCSVData') || '{}');
    if (stored[exName]) displayExerciseData(stored[exName], exName);
  }

  function displayExerciseData(sessions, exName) {
    const weights = sessions.map(s => s.weight);
    const labels  = sessions.map(s => {
      const d = new Date(s.date);
      return d.getDate() + '/' + (d.getMonth()+1);
    });
    const best = Math.max(...weights);
    const bestSession = sessions.find(s => s.weight === best);
    const est1rm = bestSession ? bestSession.est1rm : Math.round(best * 1.05);

    // Actualizar Working Max
    document.querySelector('#thWorkingMax .th-wm-label').textContent = 'Working Max · ' + exName;
    document.getElementById('thWMValue').textContent = best;
    document.getElementById('thEst1RM').textContent = est1rm + ' kg';

    // Actualizar gráfico
    if (chartStrength) {
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data = weights;
      chartStrength.data.datasets[0].pointBackgroundColor = 'transparent';
      chartStrength.data.datasets[0].pointRadius = 0;
      chartStrength.data.datasets[0].pointBorderColor = "transparent";
      chartStrength.data.datasets[0].tension = 0.3;
      chartStrength.update();
    }

    // Actualizar tabla (últimas 5 sesiones)
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      sessions.slice(-5).reverse().forEach((s, i) => {
        const d = new Date(s.date);
        const dateStr = d.getDate()+'/'+(d.getMonth()+1);
        const isMax = s.weight === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${dateStr}</td><td>${s.sets||1}×${s.reps}</td><td class="${isMax?'highlight':''}">${s.weight}</td><td>${s.est1rm} kg${i===sessions.slice(-5).length-1?' <span class="th-set-badge">Inicio</span>':''}</td>`;
        tbody.appendChild(tr);
      });
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
        const input = document.getElementById('csvFileInput');
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        handleCSVFile(input);
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

  function changeStrRange(range, btn) {
    btn.closest('.th-range-selector').querySelectorAll('.th-range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Get current active exercise
    const activeBtn = document.querySelector('.th-exercise-btn.active');
    if (!activeBtn) return;
    
    // Get exercise name from button text (match back to full name)
    const btnText = activeBtn.textContent.trim().replace('...','');
    const fullName = thExerciseNames.find(n => n.startsWith(btnText) || btnText.startsWith(n.substring(0,20)));
    if (!fullName || !thRealData[fullName]) return;
    
    let sessions = thRealData[fullName];
    
    // Filter by range
    if (range !== 'all') {
      const now = new Date();
      const months = range === '1m' ? 1 : range === '3m' ? 3 : 6;
      const cutoff = new Date(now.setMonth(now.getMonth() - months));
      sessions = sessions.filter(s => new Date(s.d) >= cutoff);
    }
    
    if (!sessions.length) return;
    
    const weights = sessions.map(s => s.w);
    const labels = sessions.map(s => formatDateShort(s.d));
    const best = Math.max(...weights);
    
    if (chartStrength) {
      const margin = (best - Math.min(...weights)) * 0.25 || best * 0.05;
      const tooMany = weights.length > 30;
      chartStrength.data.labels = labels;
      chartStrength.data.datasets[0].data = weights;
      chartStrength.data.datasets[0].borderColor = '#4a90d9';
      chartStrength.data.datasets[0].pointBackgroundColor = 'transparent';
      chartStrength.data.datasets[0].pointRadius = 0;
      chartStrength.data.datasets[0].pointBorderColor = "transparent";
      chartStrength.data.datasets[0].tension = 0.3;
      chartStrength.options.scales.y.min = Math.max(0, Math.min(...weights) - margin);
      chartStrength.options.scales.y.max = best + margin;
      chartStrength.update();
    }
    
    // Update table with filtered last 5
    const tbody = document.getElementById('thSetsTable');
    if (tbody) {
      tbody.innerHTML = '<tr><th>Fecha</th><th>Series×Reps</th><th>Kg</th><th>1RM Est.</th></tr>';
      sessions.slice(-5).reverse().forEach((s, i, arr) => {
        const isMax = s.w === best;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${formatDateShort(s.d)}</td><td>${s.s}×${s.r}</td><td class="${isMax?'highlight':''}">${s.w}</td><td>${s.e} kg${i===arr.length-1?' <span class="th-set-badge">Inicio</span>':''}</td>`;
        tbody.appendChild(tr);
      });
    }
  }

  function initStrengthChart() {
    const ctx = document.getElementById('chartStrength');
    if (!ctx) return;
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
            ticks:{color:'rgba(255,255,255,0.25)',font:{size:9},maxTicksLimit:6,
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
            grid:{color:'rgba(255,255,255,0.03)'}, border:{color:'transparent'}
          },
          y: {
            ticks:{color:'rgba(255,255,255,0.3)',font:{size:9},callback:v=>v+' kg'},
            grid:{color:'rgba(255,255,255,0.04)',drawDashedLine:true},
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

  function saveManualTimes() {
    const dists = ['1km','2km','2400m','5km','8km','10km','12km','15km','21km','42km'];
    const saved = {};
    dists.forEach(d => {
      const val = document.getElementById('mt_'+d)?.value.trim();
      if (val) saved[d] = val;
    });
    localStorage.setItem('manualTimes', JSON.stringify(saved));
    // Feedback visual
    const btn = document.querySelector('.manual-save-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check" style="width:13px;height:13px;vertical-align:middle;margin-right:6px;"></i> Guardado';
    btn.style.color = '#2ecc71';
    btn.style.borderColor = 'rgba(46,204,113,0.4)';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    setTimeout(() => { btn.innerHTML = orig; btn.style.color=''; btn.style.borderColor=''; if(typeof lucide!=='undefined') lucide.createIcons(); }, 2000);
  }

  function loadManualTimes() {
    const saved = JSON.parse(localStorage.getItem('manualTimes') || '{}');
    Object.keys(saved).forEach(d => {
      const el = document.getElementById('mt_'+d);
      if (el) el.value = saved[d];
    });
  }

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
