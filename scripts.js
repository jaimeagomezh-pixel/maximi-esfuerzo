  function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }

  function abrirModal(nombre, precio, desc) {
    const ov = document.getElementById('modalOverlay');
    const nm = document.getElementById('modalNombre');
    const pr = document.getElementById('modalPrecio');
    if (!ov || !nm || !pr) return;

    // Extraer monto numérico de "precio" (ej: "$14.990 CLP/mes" → 14990)
    const montoNum = parseInt(precio.replace(/[^\d]/g, ''));
    const total3m = montoNum * 3;
    const descuento15 = Math.round(total3m * 0.85);

    nm.textContent = nombre;
    pr.textContent = precio;

    // Actualizar opciones de pago
    const precioMensual = document.getElementById('precioMensual');
    const precioUnico = document.getElementById('precioUnico');
    if (precioMensual) precioMensual.textContent = `3 × $${montoNum.toLocaleString('es-CL')} CLP (total $${total3m.toLocaleString('es-CL')})`;
    if (precioUnico) precioUnico.textContent = `1 pago de $${descuento15.toLocaleString('es-CL')} CLP`;

    // Mostrar/ocultar campo de email según si está logueado
    const emailSection = document.getElementById('modalEmailSection');
    const isLoggedIn = window._auth?.currentUser;
    if (emailSection) {
      emailSection.style.display = isLoggedIn ? 'none' : 'block';
    }

    // Guardar datos para el pago
    window._planData = { nombre, montoNum, total3m, descuento15 };

    // Mover al final del body para garantizar que quede encima de todo
    document.body.appendChild(ov);
    // Forzar estilos por JS además de la clase
    ov.style.display = 'flex';
    ov.style.position = 'fixed';
    ov.style.inset = '0';
    ov.style.zIndex = '9000';
    ov.style.background = 'rgba(0,0,0,0.88)';
    ov.style.alignItems = 'center';
    ov.style.justifyContent = 'center';
    ov.style.padding = '20px';
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal(e) {
    const ov = document.getElementById('modalOverlay');
    if (!ov) return;
    if (!e || e.target === ov) {
      ov.style.display = '';
      ov.style.zIndex = '';
      ov.classList.remove('open');
      document.body.style.overflow = '';
    }
  }



  // ── FRASES MOTIVACIONALES ──
  const frases = [
    // MENTE Y CONTROL MENTAL
    { frase: "La calidad de tu vida depende de la calidad de tus pensamientos.", autor: "— Marco Aurelio" },
    { frase: "Tú tienes el poder sobre tu mente, no los eventos externos; entiende esto, y encontrarás tu fuerza.", autor: "— Marco Aurelio" },
    { frase: "Todo lo que escuchamos es una opinión, no un hecho; todo lo que vemos es una perspectiva, no la verdad.", autor: "— Marco Aurelio" },
    { frase: "Solo hay un camino a la felicidad: desapégate de las cosas que no dependen de ti.", autor: "— Epicteto" },
    { frase: "Te conviertes en eso a lo que le prestas atención.", autor: "— Epicteto" },
    { frase: "No esperes que los eventos sucedan como deseas, sino desea que ocurran como son.", autor: "— Epicteto" },
    { frase: "El sabio nunca carecerá de alegría, pues ella nacerá de sus propias virtudes.", autor: "— Séneca" },
    { frase: "El mayor lastre de la vida es la espera del mañana y la pérdida del hoy.", autor: "— Séneca" },
    { frase: "Todo en la vida es un juego mental.", autor: "— David Goggins" },
    { frase: "Tu mente dirige tu vida: o controlas tu mente o tu mente te controla a ti.", autor: "— Anónimo" },
    { frase: "El éxito es, en primer lugar, una disposición de la mente.", autor: "— Anónimo" },
    { frase: "No existen los límites, solo las limitaciones mentales.", autor: "— Anónimo" },
    { frase: "Ganar es una decisión consciente; perder es una decisión inconsciente.", autor: "— Anónimo" },
    { frase: "Vives a la altura de tus creencias; aquello en lo que crees, en eso te conviertes.", autor: "— Anónimo" },
    { frase: "La incredulidad nos frena y es aliada de la mediocridad.", autor: "— Anónimo" },
    { frase: "Es la repetición de afirmaciones lo que lleva a la creencia; y una vez que la creencia se convierte en convicción profunda, las cosas comienzan a suceder.", autor: "— Muhammad Ali" },
    { frase: "Vacía tu copa para que pueda ser llenada; quédate sin nada para ganar la totalidad.", autor: "— Bruce Lee" },
    { frase: "La vida es tu maestra y tú estás en un estado de aprendizaje constante.", autor: "— Bruce Lee" },
    // MIEDO Y VALENTÍA
    { frase: "Siente miedo, pero hazlo de todas maneras.", autor: "— Anónimo" },
    { frase: "Si tienes miedo, estás de enhorabuena: es una ocasión de crecer.", autor: "— Anónimo" },
    { frase: "No tengas miedo al miedo; ten miedo a la cobardía, a no atreverte.", autor: "— Anónimo" },
    { frase: "Miedo no afrontado, miedo que engorda; miedo afrontado, miedo que mengua.", autor: "— Anónimo" },
    { frase: "Elimina la palabra imposible de tu vocabulario.", autor: "— Anónimo" },
    { frase: "Imposible no es un hecho. Es una opinión. Imposible no es una declaración. Es un desafío.", autor: "— Muhammad Ali" },
    { frase: "No reces por una vida sencilla; reza por la fortaleza de resistir una vida difícil.", autor: "— Bruce Lee" },
    { frase: "Pocas palabras hay tan importantes como la confianza, porque cuanto mayor es la confianza, menor es el miedo.", autor: "— Jorge Valdano" },
    // DISCIPLINA Y HÁBITOS
    { frase: "Si quieres dominar la mente y eliminar tu regulador, tendrás que volverte adicto al trabajo duro.", autor: "— David Goggins" },
    { frase: "La motivación no cambia a nadie; la mala mano que era mi vida era algo que yo, y solo yo, podía enmendar.", autor: "— David Goggins" },
    { frase: "No caigas en la tentación de decir «por un día no pasa nada»; sí, sí que pasa.", autor: "— Anónimo" },
    { frase: "No te acostumbres al eslogan «ya lo haré»: algún día suele ser ningún día.", autor: "— Anónimo" },
    { frase: "Decir «es que yo soy así» es una excusa barata para no cambiar.", autor: "— Anónimo" },
    { frase: "Lo difícil no es el trabajo, lo difícil es la disciplina del trabajo.", autor: "— Anónimo" },
    { frase: "La autocomplacencia es el principio del fin; si te relajas, estás perdido.", autor: "— Anónimo" },
    { frase: "Quienes vencen las tentaciones, avanzan; quienes se dejan vencer por ellas, se estancan.", autor: "— Anónimo" },
    { frase: "Tu mayor enemigo es tu pereza.", autor: "— Anónimo" },
    { frase: "Éxito = hábitos = repetición = disciplina.", autor: "— Anónimo" },
    { frase: "Evita la dispersión a toda costa y protege tu foco.", autor: "— Anónimo" },
    { frase: "La genialidad no es otra cosa que la práctica diaria. Repite, repite, repite.", autor: "— Anónimo" },
    { frase: "Si a un niño le enseñas el drive, también le puedes enseñar la voluntad. La voluntad se educa igual que un drive. Todo se puede entrenar.", autor: "— Toni Nadal" },
    { frase: "Prepárate cuando no hace falta, para cuando haga falta estar preparado.", autor: "— Anónimo" },
    { frase: "Si quieres cambiar el mundo, empieza por hacerte la cama.", autor: "— William H. McRaven" },
    { frase: "Si no puedes hacer las cosas pequeñas correctamente, jamás harás las cosas grandes correctamente.", autor: "— William H. McRaven" },
    { frase: "Puede que haya gente con más talento que tú, pero no hay excusas para que nadie trabaje más duro que tú.", autor: "— Derek Jeter" },
    // ACCIÓN Y COMIENZO
    { frase: "La visión sin acción es inútil; una vez esté clara la dirección, hay que pasar a la acción.", autor: "— Anónimo" },
    { frase: "Nadie va a venir a salvar tu culo. ¡Depende de ti!", autor: "— David Goggins" },
    { frase: "No te des el lujo de inventar excusas.", autor: "— Anónimo" },
    { frase: "El secreto de avanzar es comenzar.", autor: "— Anónimo" },
    { frase: "Nada tarda tanto como lo que no se empieza.", autor: "— Anónimo" },
    { frase: "El momento perfecto no existe.", autor: "— Anónimo" },
    { frase: "El exceso de planificación paraliza.", autor: "— Anónimo" },
    { frase: "No hacer nada es lo peor que se puede hacer.", autor: "— Anónimo" },
    { frase: "Si quieres algo, ponte en marcha; las soluciones aparecen por el camino.", autor: "— Anónimo" },
    { frase: "Esperar a sentirse bien para actuar es garantizar la inacción.", autor: "— Anónimo" },
    { frase: "Da igual lo que piensas, dices o planeas; lo importante es lo que haces.", autor: "— Anónimo" },
    { frase: "La acción es la verdadera medida de la inteligencia.", autor: "— Anónimo" },
    { frase: "Si decides algo y no actúas, no has decidido nada.", autor: "— Anónimo" },
    { frase: "No decidir también es decidir algo.", autor: "— Anónimo" },
    { frase: "Ser realista no es inspirador.", autor: "— Anónimo" },
    // RESILIENCIA Y FRACASO
    { frase: "Permítete todo —dudas, bajones, miedos—, menos una cosa: desistir.", autor: "— Anónimo" },
    { frase: "El trabajo más duro es no rendirse.", autor: "— Anónimo" },
    { frase: "Lo que realmente tiene mérito es continuar cuando no puedes más.", autor: "— Anónimo" },
    { frase: "Da igual las veces que te caes si te levantas una más.", autor: "— Anónimo" },
    { frase: "Sólo cuando me impulso más allá del dolor y el sufrimiento, más allá de mis limitaciones percibidas, soy capaz de lograr más.", autor: "— David Goggins" },
    { frase: "Toma su negatividad y úsala para dominar la tarea a cumplir con todo lo que tienes.", autor: "— David Goggins" },
    { frase: "Deja de culpar a la suerte de tu vida.", autor: "— Anónimo" },
    { frase: "Hay un momento en la vida que cambia para mal: cuando te resignas.", autor: "— Anónimo" },
    { frase: "Evitar los problemas o huir de ellos equivale a no crecer.", autor: "— Anónimo" },
    { frase: "Vivir es gestionar problemas, uno tras otro.", autor: "— Anónimo" },
    { frase: "Ganar es no tener miedo a perder.", autor: "— Anónimo" },
    { frase: "Unas veces se gana y otras se aprende.", autor: "— Anónimo" },
    { frase: "No hay mayor riesgo que no arriesgar.", autor: "— Anónimo" },
    { frase: "Fracasa pronto para tener éxito rápido.", autor: "— Anónimo" },
    { frase: "Hay gente que nunca se ha equivocado, pero toda su vida es un error.", autor: "— Anónimo" },
    { frase: "Si no estás cometiendo errores es que no estás avanzando.", autor: "— Anónimo" },
    { frase: "La vida no es justa, y cuanto antes lo descubras, mejor te irá.", autor: "— William H. McRaven" },
    { frase: "Si quieres cambiar el mundo, deslízate de cabeza por el obstáculo.", autor: "— William H. McRaven" },
    { frase: "Si quieres cambiar el mundo, nunca, pero nunca, toques esa campana.", autor: "— William H. McRaven" },
    { frase: "Sólo un hombre que sabe lo que se siente al ser derrotado puede llegar al fondo de su alma y sacar lo que le queda de energía para ganar un combate que está igualado.", autor: "— Muhammad Ali" },
    { frase: "La lucha de Rafael ha estado siempre en la idea de superarse a sí mismo.", autor: "— Toni Nadal" },
    { frase: "Si crees que no puedes mejorar, no sabes nada de la vida.", autor: "— Rafa Nadal" },
    { frase: "No te establezcas en una forma; adáptala, constrúyela y déjala crecer. Sé como el agua.", autor: "— Bruce Lee" },
    { frase: "Adapta lo que es útil, rechaza lo que no sirve, y añade lo que es específicamente tuyo.", autor: "— Bruce Lee" },
    // EXCELENCIA Y METAS
    { frase: "Dedícate a ser el mejor siendo diferente.", autor: "— Anónimo" },
    { frase: "Sé tan bueno que los demás no puedan ignorarte.", autor: "— Anónimo" },
    { frase: "Si no lo entregas todo, lo que entregas es nada.", autor: "— Anónimo" },
    { frase: "Excelencia = compromiso ciento por ciento.", autor: "— Anónimo" },
    { frase: "El compromiso se tiene o no se tiene; no existe el compromiso a medias.", autor: "— Anónimo" },
    { frase: "Lo primero de todo: decide lo que quieres ser, hacer y tener.", autor: "— Anónimo" },
    { frase: "Quien no sabe lo que quiere acaba donde no quiere estar.", autor: "— Anónimo" },
    { frase: "No cuestiones si algo es o no posible; solo preocúpate de cómo conseguirlo.", autor: "— Anónimo" },
    { frase: "Haz lo que amas para que otros amen lo que haces.", autor: "— Anónimo" },
    { frase: "Soy el más grande. Me lo dije incluso a mí mismo cuando no sabía que lo era.", autor: "— Muhammad Ali" },
    { frase: "La pelea se gana o se pierde lejos de testigos, tras las cortinas, en el gimnasio y en la carretera, mucho antes de bailar bajo las luces del ring.", autor: "— Muhammad Ali" },
    { frase: "Los campeones no están hechos en el gimnasio. Los campeones están hechos de algo que tienen en su interior: un deseo, un sueño, una visión.", autor: "— Muhammad Ali" },
    { frase: "El talento siempre ha necesitado de energía, y no existe mejor energético que la pasión.", autor: "— Jorge Valdano" },
    { frase: "El talento necesita exigencia, porque los seres humanos crecemos al nivel de las dificultades que vamos encontrando.", autor: "— Jorge Valdano" },
    { frase: "Para mí hay un principio fundamental: el control. De la situación, de la pelota, de cada cosa que hago.", autor: "— Rafa Nadal" },
    { frase: "No concibo no tener ilusión por las cosas que uno hace, sea lo que sea, al nivel que sea.", autor: "— Rafa Nadal" },
    { frase: "En todo el mundo existen seres humanos increíbles. Se trata de quererlo como si no hubiera un mañana, porque puede que no lo haya.", autor: "— David Goggins" },
    { frase: "Elige lo positivo. Tienes la elección; eres el maestro de tu actitud.", autor: "— Bruce Lee" },
    { frase: "La vida es amplia, sin límites. No hay bordes, no hay fronteras.", autor: "— Bruce Lee" },
    { frase: "No naciste siendo un ganador, de igual modo que no naciste siendo un perdedor. Tú eres lo que haces de ti mismo.", autor: "— Lou Holtz" },
    { frase: "Si se puede hacer penicilina del moho, seguro que se puede hacer algo provechoso de ti.", autor: "— Muhammad Ali" },
    // LIDERAZGO Y RESPONSABILIDAD
    { frase: "La autorresponsabilidad es el primer requisito del autoliderazgo.", autor: "— Anónimo" },
    { frase: "O eres víctima o eres protagonista; o gobiernas tu vida o te la gobiernan otros.", autor: "— Anónimo" },
    { frase: "No hay nadie que vaya de víctima que haya logrado algo grande.", autor: "— Anónimo" },
    { frase: "Los ganadores buscan soluciones; los perdedores buscan excusas.", autor: "— Anónimo" },
    { frase: "Cambia el enfoque: del cuánto gano al cómo sirvo.", autor: "— Anónimo" },
    { frase: "Cuida tu entorno: somos una media de las cinco personas con las que más nos relacionamos.", autor: "— Anónimo" },
    { frase: "Si quieres cambiar el mundo, encuentra a alguien que te ayude a remar.", autor: "— William H. McRaven" },
    { frase: "Si quieres cambiar el mundo, mide a las personas según el tamaño de su corazón.", autor: "— William H. McRaven" },
    { frase: "Si quieres cambiar el mundo, sé la mejor versión de ti mismo en los momentos más oscuros.", autor: "— William H. McRaven" },
    { frase: "Si quieres cambiar el mundo, empieza a cantar cuando el lodo te llegue al cuello.", autor: "— William H. McRaven" },
    { frase: "El hombre sabio se preocupa por la intención de sus acciones, no por sus resultados.", autor: "— Séneca" },
    { frase: "Aprender cuesta. La labor de los profesores y padres es enseñar a amar el esfuerzo.", autor: "— Toni Nadal" },
    { frase: "Un equipo no está completo si el líder solo cuenta con los cracks. Sin los humildes no se llega a ninguna parte.", autor: "— Manel Estiarte" },
    { frase: "Conseguir buenos jugadores es fácil. Conseguir que jueguen juntos es la parte más difícil.", autor: "— Casey Stengel" },
    { frase: "Si solo piensas en ti mismo y no en los demás, nunca alcanzas objetivos.", autor: "— Paolo Maldini" },
    { frase: "Cuando tienes razón, nadie lo recuerda; cuando estás equivocado, nadie lo olvida.", autor: "— Muhammad Ali" },
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
      
      // Resetear menú hamburguesa móvil (puede haber quedado abierto)
      if (_dashMenuAbierto) {
        const menu = document.getElementById('dashMobileMenu');
        const hbLines = document.querySelectorAll('.dash-hamburger span');
        if (menu) menu.classList.remove('open');
        hbLines[0] && (hbLines[0].style.transform = '');
        hbLines[1] && (hbLines[1].style.opacity   = '1');
        hbLines[2] && (hbLines[2].style.transform = '');
        _dashMenuAbierto = false;
        _miPlanesMobileAbierto = false;
      }

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
          if (typeof initRuckingAtleta      === 'function') initRuckingAtleta();
          if (typeof renderResumenMensual   === 'function') renderResumenMensual();
          if (typeof precargarPesoVelocidad === 'function') precargarPesoVelocidad();
          if (typeof lucide !== 'undefined') lucide.createIcons();
          // Animaciones de entrada
          if (typeof activarAnimaciones === 'function') activarAnimaciones();
          setTimeout(() => {
            if (typeof animarNumeros === 'function') animarNumeros();
            if (typeof agregarPulseDot === 'function') agregarPulseDot();
          }, 400);
          // Cargar datos Strava con auto-refresh si el token venció
          checkStravaToken();
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
    // En desktop el dashboard-box no ocupa todo el ancho — los márgenes
    // laterales también disparan este evento. Solo cerrar en móvil (< 700px)
    // donde tocar fuera del panel es intencional.
    if (window.innerWidth >= 700) return;
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
        // Si también tiene sesión Firebase, guardar vínculo uid→stravaId en el Worker
        // para que el coach lo detecte sin depender de comparación de nombres
        const uid = window._auth?.currentUser?.uid;
        if (uid) {
          const existingProfile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
          const nombreStrava = ((atletaData.firstname||'') + ' ' + (atletaData.lastname||'')).trim()
                             || localStorage.getItem('atletaNombre') || '';
          fetch('https://flow-payments.jaimea-gomezh.workers.dev/rucking/save-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              stravaId: 'uid:' + uid,
              nombre: nombreStrava,
              profile: { ...existingProfile, linkedStravaId: String(atletaData.id) }
            })
          }).catch(() => {});
        }
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

      // Etiquetas de tiempo MM:SS (reales, compartidas por ambos gráficos)
      const tS = s.time ? muestrarDatos(s.time.data, N) : [];
      const labels = tS.map(t => {
        const m = Math.floor(t / 60);
        const sec = Math.round(t % 60);
        return m + ':' + String(sec).padStart(2, '0');
      });

      // FC
      const hrS = (s.heartrate) ? muestrarDatos(s.heartrate.data, N) : [];
      // Ritmo (m/s → min/km)
      const paceS = (s.velocity_smooth)
        ? muestrarDatos(s.velocity_smooth.data, N).map(v => v > 0.5 ? parseFloat(((1000/60)/v).toFixed(2)) : null)
        : [];

      // Guardar para tooltips cruzados
      _streamData = { labels, hr: hrS, pace: paceS };

      if (chartFC && hrS.length) {
        chartFC.data.labels = labels;
        chartFC.data.datasets[0].data = hrS;
        chartFC.update('active');
      }
      if (chartRitmo && paceS.length) {
        chartRitmo.data.labels = labels;
        chartRitmo.data.datasets[0].data = paceS;
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
        terrain:  'trail',
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

  // Devuelve el ID cloud del atleta: StravaId si existe, uid:xxx como fallback Firebase
  function getAthleteCloudId() {
    const stravaId = localStorage.getItem('strava_athlete_id');
    if (stravaId) return stravaId;
    const uid = window._auth?.currentUser?.uid;
    if (uid) return 'uid:' + uid;
    return null;
  }

  // Empuja todas las sesiones de rucking al Worker (Cloudflare KV)
  async function pushRuckingToCloud(sessions) {
    const cloudId = getAthleteCloudId();
    if (!cloudId) return;
    const nombre = localStorage.getItem('atletaNombre')
                || window._auth?.currentUser?.displayName
                || '';
    try {
      await fetch('https://flow-payments.jaimea-gomezh.workers.dev/rucking/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stravaId: cloudId, sessions, nombre })
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
        '3200m': { t:  3200, lo: 3150, hi:  3250 },
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

        // Verificar nuevos récords y festejar
        updatedKeys.forEach(k => {
          const entries = prData[k];
          if (entries && entries.length) {
            const best = Math.min(...entries.map(e => e.seconds));
            prCheckNewRecord(k, best);
          }
        });

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

      // Detectar carrera 3200m → sugerir actualización TMR (Kraemer)
      checkStrava3200mUpdate(runs);

      // Detectar evaluación 5 minutos → sugerir actualización V PICO
      checkStravaEv5minUpdate(allActs);

      // Detectar sesiones de rucking (Walk/Hike con "Lastre XX kg" en el título)
      detectarRuckingDesdeStrava(allActs);

      // Detectar nueva FC máxima en las actividades y actualizar perfil
      detectarFCMaxDesdeStrava(allActs);

      // Cachear actividades (compacto) para resumen mensual
      cachearActividades(allActs);

      // Subir stats Strava al cloud para que el coach las vea
      pushStravaStatsToCloud(allActs);

      // Renderizar resumen mensual con el mes más reciente
      if (typeof renderResumenMensual === 'function') renderResumenMensual();

    } catch(e) { console.error('PRs Strava error:', e); }
  }

  // Sube un resumen de stats Strava al cloud para que el coach las vea
  function pushStravaStatsToCloud(allActs) {
    try {
      const hace30 = new Date();
      hace30.setDate(hace30.getDate() - 30);
      const recientes = allActs.filter(a => a.start_date_local && new Date(a.start_date_local) >= hace30);
      const km  = recientes.reduce((s, a) => s + (a.distance || 0) / 1000, 0);
      const sec = recientes.reduce((s, a) => s + (a.moving_time || 0), 0);
      const fcs = recientes.map(a => a.average_heartrate).filter(Boolean);
      const avgFC = fcs.length ? Math.round(fcs.reduce((s,v) => s+v, 0) / fcs.length) : null;
      const ritmoSeg = km > 0 && sec > 0 ? sec / km : null;
      const ritmo = ritmoSeg ? `${Math.floor(ritmoSeg/60)}:${String(Math.round(ritmoSeg%60)).padStart(2,'0')}` : null;

      const stats = {
        km:    Math.round(km * 10) / 10,
        ritmo: ritmo || '—',
        fc:    avgFC || 0,
        acts:  recientes.length,
        totalActs: allActs.length,
      };

      const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
      pushRuckProfileToCloud({ ...profile, stravaStats: stats });
    } catch(e) { /* silencioso */ }
  }

  // Guarda un cache compacto de actividades para el resumen mensual
  function cachearActividades(allActs) {
    const compact = allActs
      .filter(a => a.distance > 0 && a.start_date_local)
      .map(a => ({
        date: a.start_date_local.slice(0, 10),     // YYYY-MM-DD
        km:   +(a.distance / 1000).toFixed(2),
        sec:  a.moving_time || 0,
        hr:   a.average_heartrate ? Math.round(a.average_heartrate) : null,
        type: a.type
      }));
    localStorage.setItem('stravaActsCache', JSON.stringify(compact));
  }

  // Busca la FC máxima registrada en Strava y actualiza el perfil del atleta
  function detectarFCMaxDesdeStrava(allActs) {
    // max_heartrate viene en actividades con sensor de FC
    const fcs = allActs
      .map(a => a.max_heartrate)
      .filter(fc => fc && fc > 100 && fc < 230); // rango fisiológico válido
    if (!fcs.length) return;

    const fcMaxStrava = Math.round(Math.max(...fcs));
    const perfil = JSON.parse(localStorage.getItem('atletaPerfil') || '{}');
    const fcGuardada = perfil.fcMax || 0;
    const fuenteGuardada = perfil.fcMaxFuente || null;

    // La FC máx MEDIDA (Strava) siempre gana sobre la ESTIMADA (Nes).
    // Entre dos medidas, gana la mayor.
    const reemplazar =
      fuenteGuardada !== 'strava'        // estimada o vacía → medida gana siempre
      || fcMaxStrava > fcGuardada;        // ya era medida → solo si es mayor

    if (reemplazar && fcMaxStrava !== fcGuardada) {
      perfil.fcMax = fcMaxStrava;
      perfil.fcMaxFuente = 'strava';
      perfil.fcMaxFecha = new Date().toISOString().slice(0, 10);
      localStorage.setItem('atletaPerfil', JSON.stringify(perfil));

      // Prellenar el campo de FC máx en Zonas de Carrera si está vacío
      const inp = document.getElementById('inputFcMax');
      if (inp && (!inp.value || parseInt(inp.value) < fcMaxStrava)) {
        inp.value = fcMaxStrava;
      }

      // Toast informativo (reutiliza infra de PR si existe)
      if (typeof prShowToast === 'function') {
        prShowToast('❤️ Nueva FC máxima detectada: ' + fcMaxStrava + ' ppm');
      }

      // Actualizar resumen de perfil si está visible
      if (typeof actualizarResumenPerfil === 'function') {
        actualizarResumenPerfil(perfil);
      }
    }
  }

  // ── RESUMEN MENSUAL DE VOLUMEN ─────────────────────────────────────────────
  let _resMesActivo = null; // 'YYYY-MM'

  const MESES_ABR = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  function renderResumenMensual() {
    const cache = JSON.parse(localStorage.getItem('stravaActsCache') || '[]');
    const sinDatos  = document.getElementById('resSinDatos');
    const contenido = document.getElementById('resContenido');
    const selector  = document.getElementById('resMesSelector');
    if (!selector) return;

    if (!cache.length) {
      if (sinDatos)  sinDatos.style.display  = 'block';
      if (contenido) contenido.style.display = 'none';
      selector.innerHTML = '';
      return;
    }
    if (sinDatos)  sinDatos.style.display  = 'none';
    if (contenido) contenido.style.display = 'block';

    // Meses disponibles (YYYY-MM), ordenados desc
    const meses = [...new Set(cache.map(a => a.date.slice(0, 7)))].sort().reverse();
    if (!_resMesActivo || !meses.includes(_resMesActivo)) _resMesActivo = meses[0];

    // Botones de mes
    selector.innerHTML = meses.slice(0, 12).map(m => {
      const [y, mo] = m.split('-');
      const label = `${MESES_ABR[parseInt(mo)-1]} ${y}`;
      const active = m === _resMesActivo;
      return `<button onclick="selectResMes('${m}')" style="font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:5px 11px;border-radius:20px;cursor:pointer;border:1px solid ${active?'rgba(0,200,212,0.4)':'rgba(255,255,255,0.1)'};background:${active?'rgba(0,200,212,0.14)':'transparent'};color:${active?'#00c8d4':'rgba(255,255,255,0.5)'};transition:all .2s;">${label}</button>`;
    }).join('');

    // Filtrar actividades del mes activo
    const acts = cache.filter(a => a.date.slice(0, 7) === _resMesActivo);

    // Stats
    const km    = acts.reduce((s, a) => s + a.km, 0);
    const sec   = acts.reduce((s, a) => s + a.sec, 0);
    const sesiones = acts.length;

    const elKm  = document.getElementById('resKm');
    const elSes = document.getElementById('resSesiones');
    const elTmp = document.getElementById('resTiempo');
    if (elKm)  elKm.textContent  = km.toFixed(1);
    if (elSes) elSes.textContent = sesiones;
    if (elTmp) {
      const h = Math.floor(sec / 3600);
      const m = Math.round((sec % 3600) / 60);
      elTmp.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
    }

    // Distribución por zonas FC
    const perfil = JSON.parse(localStorage.getItem('atletaPerfil') || '{}');
    const fcMax  = perfil.fcMax || null;
    const zonasEl    = document.getElementById('resZonasFC');
    const sinFcEl    = document.getElementById('resZonasSinFC');

    if (!fcMax) {
      if (zonasEl) zonasEl.innerHTML = '';
      if (sinFcEl) sinFcEl.style.display = 'block';
      return;
    }
    if (sinFcEl) sinFcEl.style.display = 'none';

    // Clasificar tiempo de cada actividad por zona (según FC promedio)
    // Umbrales Cerezuela-Espejo: Z1<71% Z2 71-82% Z3 82-89% Z4 89-94% Z5≥94%
    const zonaSec = [0, 0, 0, 0, 0]; // Z1..Z5
    acts.forEach(a => {
      if (!a.hr || !a.sec) return;
      const pct = a.hr / fcMax;
      let z;
      if      (pct < 0.71) z = 0;
      else if (pct < 0.82) z = 1;
      else if (pct < 0.89) z = 2;
      else if (pct < 0.94) z = 3;
      else                 z = 4;
      zonaSec[z] += a.sec;
    });
    const totalZ = zonaSec.reduce((s, v) => s + v, 0) || 1;

    const Z = [
      { lbl:'Z1 Recup',  cls:'dash-zone-z1', color:'#5b9bd5' },
      { lbl:'Z2 Aerób',  cls:'dash-zone-z2', color:'#27ae60' },
      { lbl:'Z3 Tempo',  cls:'dash-zone-z3', color:'#f39c12' },
      { lbl:'Z4 Umbral', cls:'dash-zone-z4', color:'#e67e22' },
      { lbl:'Z5 Máx',    cls:'dash-zone-z5', color:'#e74c3c' },
    ];

    if (zonasEl) {
      // Mostrar de Z5 (arriba) a Z1 (abajo), como Strava
      zonasEl.innerHTML = [4,3,2,1,0].map(i => {
        const s   = zonaSec[i];
        const pct = Math.round((s / totalZ) * 100);
        const h   = Math.floor(s / 3600);
        const m   = Math.round((s % 3600) / 60);
        const tStr = h > 0 ? `${h}h ${m}m` : `${m}m`;
        return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:0.5px;color:rgba(255,255,255,0.6);min-width:64px;">${Z[i].lbl}</div>
          <div style="flex:1;height:8px;background:rgba(255,255,255,0.05);border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${Z[i].color};border-radius:4px;transition:width .8s cubic-bezier(0.4,0,0.2,1);"></div>
          </div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:rgba(255,255,255,0.5);min-width:48px;text-align:right;">${tStr}</div>
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;color:${Z[i].color};min-width:32px;text-align:right;">${pct}%</div>
        </div>`;
      }).join('');
    }
  }

  function selectResMes(mes) {
    _resMesActivo = mes;
    renderResumenMensual();
  }

  // ── Guardar sesión Strava completa ───────────────────────────
  function guardarSesionStrava(data) {
    localStorage.setItem('strava_token',   data.access_token);
    localStorage.setItem('strava_expiry',  String(data.expires_at));
    if (data.refresh_token) {
      localStorage.setItem('strava_refresh', data.refresh_token);
    }
  }

  // ── Renovar token Strava silenciosamente ──────────────────────
  async function refreshStravaToken() {
    const refreshToken = localStorage.getItem('strava_refresh');
    if (!refreshToken) return null;
    try {
      const res = await fetch('https://strava-auth.jaimea-gomezh.workers.dev/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
      const data = await res.json();
      if (data.access_token) {
        guardarSesionStrava(data);
        return data.access_token;
      }
    } catch(e) {
      console.error('Error renovando token Strava:', e);
    }
    return null;
  }

  // ── Revisar y usar token de Strava (con auto-refresh) ─────────
  async function checkStravaToken() {
    const token  = localStorage.getItem('strava_token');
    const expiry = parseInt(localStorage.getItem('strava_expiry') || '0');
    const ahora  = Math.floor(Date.now() / 1000);

    if (token && expiry > ahora + 300) {
      cargarDatosStrava(token);
      return true;
    }

    // Si hay refresh token, mostrar estado "reconectando" inmediatamente
    // para que el atleta no vea el botón "Conectar" durante el refresh
    const refreshToken = localStorage.getItem('strava_refresh');
    if (refreshToken) {
      const stravaCard   = document.getElementById('btnStrava');
      const stravaStatus = document.getElementById('stravaStatus');
      if (stravaCard)   stravaCard.classList.add('sincronizando');
      if (stravaStatus) stravaStatus.textContent = 'Reconectando…';

      const nuevoToken = await refreshStravaToken();
      if (nuevoToken) {
        cargarDatosStrava(nuevoToken);
        return true;
      }
      // Refresh fallido: limpiar estado cargando pero no mostrar error crítico
      if (stravaCard)   stravaCard.classList.remove('sincronizando');
      if (stravaStatus) stravaStatus.textContent = 'Conectar';
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
        guardarSesionStrava(data); // guarda token + refresh_token + expiry
        cargarDatosStrava(data.access_token);
        const nombre = localStorage.getItem('atletaNombre') || 'Atleta';
        abrirDashboard(nombre);
      }
    } catch(e) {
      console.error('Error canjeando token:', e);
    }
  }

  // Manejar callback de pago Flow (?pago=ok)
  function handleFlowPaymentSuccess() {
    const params = new URLSearchParams(window.location.search);
    const pagoOk = params.get('pago');
    if (pagoOk !== 'ok') return;

    // Limpiar URL
    window.history.replaceState({}, document.title, window.location.pathname);

    // Mostrar toast de éxito
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
      color: white;
      padding: 18px 24px;
      border-radius: 8px;
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.4s cubic-bezier(0.22,1,0.36,1);
      max-width: 400px;
    `;
    toast.innerHTML = `
      ✓ <strong>¡Pago exitoso!</strong><br>
      Tu plan se ha activado. En breve recibirás el código de TrainHeroic por email.
    `;

    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(24px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(toast);

    // Auto-cerrar después de 6 segundos
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.4s cubic-bezier(0.22,1,0.36,1) reverse forwards';
      setTimeout(() => toast.remove(), 400);
    }, 6000);

    // Guardar en localStorage que el usuario compró (opcional, para stats)
    const compras = JSON.parse(localStorage.getItem('comprasPagosExitosos') || '[]');
    compras.push({ timestamp: Date.now(), tipo: 'pago' });
    localStorage.setItem('comprasPagosExitosos', JSON.stringify(compras));
  }

  // Ejecutar al cargar
  handleFlowPaymentSuccess();
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
    cargarMiPerfil();
  }

  // ── MI PERFIL ──────────────────────────────────────────────
  function toggleMiPerfil() {
    const panel = document.getElementById('miPerfilPanel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  function calcularEdad(fechaNac) {
    if (!fechaNac) return null;
    const hoy = new Date();
    const nac = new Date(fechaNac + 'T12:00:00');
    if (isNaN(nac)) return null;
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad > 0 ? edad : null;
  }

  function cargarMiPerfil() {
    const p = JSON.parse(localStorage.getItem('atletaPerfil') || '{}');
    if (p.peso)     { const el = document.getElementById('mpPeso');     if(el) el.value = p.peso; }
    if (p.talla)    { const el = document.getElementById('mpTalla');    if(el) el.value = p.talla; }
    if (p.fechaNac) { const el = document.getElementById('mpFechaNac'); if(el) el.value = p.fechaNac; }
    if (p.sexo)     { const el = document.getElementById('mpSexo');     if(el) el.value = p.sexo; }
    // FC máx
    const fcEl = document.getElementById('mpFcMax');
    if (fcEl && p.fcMax) fcEl.value = p.fcMax;
    const badge = document.getElementById('mpFcFuenteBadge');
    if (badge) {
      if (p.fcMaxFuente === 'strava') { badge.textContent = '✓ Strava'; badge.style.color = '#FC4C02'; badge.style.background = 'rgba(252,76,2,0.08)'; }
      else if (p.fcMaxFuente === 'nes') { badge.textContent = 'estimada'; badge.style.color = '#888'; badge.style.background = 'rgba(0,0,0,0.06)'; }
      else { badge.textContent = ''; }
    }
    actualizarResumenPerfil(p);
  }

  // FC máxima estimada por edad — Nes et al. (2013): 211 - 0.64 × edad
  function calcularFCMaxNes(edad) {
    if (!edad || edad < 5 || edad > 100) return null;
    return Math.round(211 - 0.64 * edad);
  }

  function guardarMiPerfil() {
    const peso     = parseFloat(document.getElementById('mpPeso')?.value) || null;
    const talla    = parseFloat(document.getElementById('mpTalla')?.value) || null;
    const fechaNac = document.getElementById('mpFechaNac')?.value || null;
    const edad     = calcularEdad(fechaNac);
    const sexo     = document.getElementById('mpSexo')?.value || '';
    const fcManual = parseInt(document.getElementById('mpFcMax')?.value) || null;
    const prev = JSON.parse(localStorage.getItem('atletaPerfil') || '{}');
    const p = { ...prev, peso, talla, fechaNac, edad, sexo, updatedAt: new Date().toISOString().slice(0,10) };

    if (fcManual && fcManual >= 100 && fcManual <= 230) {
      if (fcManual !== prev.fcMax || prev.fcMaxFuente !== 'manual') {
        p.fcMax = fcManual;
        p.fcMaxFuente = 'manual';
        const inp = document.getElementById('inputFcMax');
        if (inp) inp.value = fcManual;
      }
    } else if (p.fcMaxFuente !== 'strava' && p.fcMaxFuente !== 'manual' && edad) {
      const fcNes = calcularFCMaxNes(edad);
      if (fcNes) {
        p.fcMax = fcNes;
        p.fcMaxFuente = 'nes';
        const inp = document.getElementById('inputFcMax');
        if (inp && !inp.value) inp.value = fcNes;
      }
    }

    localStorage.setItem('atletaPerfil', JSON.stringify(p));
    actualizarResumenPerfil(p);
    if (typeof precargarPesoVelocidad === 'function') precargarPesoVelocidad();
    document.getElementById('miPerfilPanel').style.display = 'none';
    // Sincronizar peso y fechaNac al cloud
    const ruckProfile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
    if (peso) ruckProfile.bw = peso;
    if (fechaNac) ruckProfile.fechaNac = fechaNac;
    localStorage.setItem('ruckProfile', JSON.stringify(ruckProfile));
    if (peso || fechaNac) pushRuckProfileToCloud(ruckProfile);

    // Registrar peso en historial InBody si se ingresó un peso
    if (peso) registrarPesoEnHistorial(peso);

    // Feedback
    const btn = document.querySelector('[onclick="guardarMiPerfil()"]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ GUARDADO'; btn.style.background = '#27ae60';
      setTimeout(() => { btn.textContent = orig; btn.style.background = '#8B1A1A'; }, 1800);
    }
  }

  async function registrarPesoEnHistorial(peso) {
    const user = window._auth?.currentUser;
    if (!user) return;
    const hoy = new Date().toISOString().split('T')[0];
    const cacheKey = 'inbodyHistorial_' + user.uid;
    const cached = JSON.parse(localStorage.getItem(cacheKey) || '[]');

    // No sobreescribir si ya hay una entrada completa hoy (con composición)
    const hoyEntry = cached.find(m => m.fecha === hoy);
    if (hoyEntry && (hoyEntry.musculo || hoyEntry.grasa_kg)) {
      // Solo actualizar el peso de la entrada existente
      hoyEntry.peso = peso;
    } else if (hoyEntry) {
      // Entrada solo-peso existente → actualizar
      hoyEntry.peso = peso;
    } else {
      // Crear nueva entrada peso-solo
      cached.push({ fecha: hoy, peso, source: 'perfil',
        musculo: null, grasa_kg: null, grasa_pct: null,
        agua: null, imc: null, bmr: null, lbm: null });
    }

    // Actualizar caché local inmediatamente
    const sorted = cached.slice().sort((a,b) => a.fecha.localeCompare(b.fecha));
    localStorage.setItem(cacheKey, JSON.stringify(sorted));

    // Refrescar chart y cards si están visibles
    if (typeof cargarInbodyHistorial === 'function') cargarInbodyHistorial();

    // Guardar en cloud
    try {
      const mw = 'https://media.jaimea-gomezh.workers.dev';
      const medicion = { fecha: hoy, peso, source: 'perfil',
        musculo: null, grasa_kg: null, grasa_pct: null,
        agua: null, imc: null, bmr: null, lbm: null };
      await fetch(`${mw}/media/save-inbody`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, email: user.email, medicion })
      });
    } catch(e) { /* silencioso — ya quedó en cache local */ }
  }

  function actualizarResumenPerfil(p) {
    const edad = calcularEdad(p.fechaNac) || p.edad || null;
    const cardsEl = document.getElementById('dashPerfilCards');
    if (!cardsEl) return;
    const tieneData = p.peso || p.talla || edad;
    if (!tieneData) { cardsEl.style.display = 'none'; return; }
    const imc = (p.peso && p.talla) ? Math.round((p.peso / Math.pow(p.talla/100, 2)) * 10) / 10 : null;
    const card = (label, val, sub) =>
      `<div style="flex:1;background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:10px 10px 8px;min-width:0;text-align:center;">
        <div style="font-family:'Barlow Condensed',sans-serif;font-size:9px;letter-spacing:2px;color:#888;text-transform:uppercase;margin-bottom:4px;">${label}</div>
        <div style="font-size:17px;font-weight:700;color:#222;line-height:1;">${val}</div>
        ${sub ? `<div style="font-size:10px;color:#aaa;margin-top:3px;">${sub}</div>` : ''}
      </div>`;
    let html = '<div style="display:flex;gap:8px;">';
    if (p.peso)  html += card('Peso', p.peso + ' kg', imc ? 'IMC ' + imc : '');
    if (p.talla) html += card('Talla', p.talla + ' cm', '');
    if (edad)    html += card('Edad', edad + ' años', '');
    html += '</div>';
    cardsEl.innerHTML = html;
    cardsEl.style.display = 'block';
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
  // Datos crudos de la última actividad para tooltips cruzados (FC + ritmo + tiempo)
  let _streamData = { labels: [], hr: [], pace: [] };

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

    // pace decimal (min/km) → "M:SS /km"
    function _paceFmt(dec) {
      if (dec == null || isNaN(dec)) return '—';
      const m = Math.floor(dec);
      const s = Math.round((dec - m) * 60);
      return m + ':' + String(s).padStart(2, '0') + ' /km';
    }

    const thDefaults = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      // Modo index + intersect false = el toque/deslizamiento captura el punto
      // más cercano en X aunque el dedo no toque exactamente la línea (ideal touch)
      interaction: { mode: 'index', intersect: false, axis: 'x' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1e24',
          titleColor: '#C9A84C',
          bodyColor: '#ffffff',
          borderColor: 'rgba(0,200,212,0.2)',
          borderWidth: 1,
          padding: 11,
          cornerRadius: 6,
          displayColors: false,
          titleFont: { size: 12, weight: '700' },
          bodyFont: { size: 13 },
          callbacks: {
            // Título: minuto de la actividad
            title: (items) => {
              if (!items.length) return '';
              return 'Min ' + (_streamData.labels[items[0].dataIndex] || items[0].label);
            },
            // Cuerpo: FC + ritmo del mismo momento (cruzado desde _streamData)
            label: (item) => {
              const i = item.dataIndex;
              const lines = [];
              const hr = _streamData.hr[i];
              const pc = _streamData.pace[i];
              if (hr != null) lines.push('❤️  ' + Math.round(hr) + ' ppm');
              if (pc != null) lines.push('⏱️  ' + _paceFmt(pc));
              return lines.length ? lines : (item.formattedValue || '');
            }
          }
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

    // Actualizar stats
    document.getElementById('prBest').textContent      = secToTime(best);
    document.getElementById('prBestDate').textContent  = formatDate(bestEntry.date);
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

    // Pop en delta al cambiar distancia
    const deltaEl2 = document.getElementById('prDelta');
    if (deltaEl2) { deltaEl2.classList.remove('pr-pop'); void deltaEl2.offsetWidth; deltaEl2.classList.add('pr-pop'); }
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




  // ── ANIMACIONES PR: FLIP DIGITS / PROG BARS / WAVE / CONFETTI / TOAST ──────

  function prBuildFlip(id, sec) {
    const h  = Math.floor(sec / 3600);
    const m  = Math.floor((sec % 3600) / 60);
    const s  = sec % 60;
    const hs = String(h).padStart(2,'0');
    const ms = String(m).padStart(2,'0');
    const ss = String(s).padStart(2,'0');
    const sep = '<span class="pr-flip-sep">:</span>';
    if (h > 0) {
      return `<div class="pr-fd" id="${id}-h0">${hs[0]}</div><div class="pr-fd" id="${id}-h1">${hs[1]}</div>${sep}` +
             `<div class="pr-fd" id="${id}-m0">${ms[0]}</div><div class="pr-fd" id="${id}-m1">${ms[1]}</div>${sep}` +
             `<div class="pr-fd" id="${id}-s0">${ss[0]}</div><div class="pr-fd" id="${id}-s1">${ss[1]}</div>`;
    }
    return `<div class="pr-fd" id="${id}-m0">${ms[0]}</div><div class="pr-fd" id="${id}-m1">${ms[1]}</div>${sep}` +
           `<div class="pr-fd" id="${id}-s0">${ss[0]}</div><div class="pr-fd" id="${id}-s1">${ss[1]}</div>`;
  }

  function prRenderProgBars(data) {
    const list = document.getElementById('pr-prog-list');
    if (!list) return;
    list.innerHTML = '';
    const SHOW = 8; // máximo de sesiones a mostrar
    const slice = data.length > SHOW ? data.slice(-SHOW) : data;
    const secs  = slice.map(e => e.seconds);
    const mn    = Math.min(...secs);
    const mx    = Math.max(...secs);
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

    slice.forEach((e, i) => {
      const s   = e.seconds;
      const pct = Math.round(100 - ((s - mn) / (mx - mn || 1)) * 80);
      const d   = e.date instanceof Date ? e.date : new Date(e.date);
      const lbl = d.getDate() + ' ' + meses[d.getMonth()];

      const row    = document.createElement('div'); row.className = 'pr-prog-row';
      const label  = document.createElement('div'); label.className = 'pr-prog-label'; label.textContent = lbl;
      const track  = document.createElement('div'); track.className = 'pr-prog-track';
      const bar    = document.createElement('div'); bar.className   = 'pr-prog-bar'; bar.style.width = '0%';
      const time   = document.createElement('div'); time.className  = 'pr-prog-time'; time.textContent = secToTime(s);
      const delta  = document.createElement('div'); delta.className = 'pr-prog-delta';

      if (i > 0) {
        const prev = slice[i-1].seconds;
        const diff = s - prev;
        if (diff !== 0) {
          delta.className = 'pr-prog-delta show ' + (diff < 0 ? 'good' : 'bad');
          delta.textContent = diff < 0 ? '▼ ' + secToTime(-diff) : '▲ +' + secToTime(diff);
        }
      }

      track.appendChild(bar);
      row.appendChild(label); row.appendChild(track); row.appendChild(time); row.appendChild(delta);
      list.appendChild(row);

      const delay = 80 + i * 70;
      setTimeout(() => {
        bar.style.width = pct + '%';
        setTimeout(() => bar.classList.add('on'), 1100);
      }, delay);
    });
  }

  function prRenderWave(data) {
    const wrap = document.getElementById('pr-wave-wrap');
    const svg  = document.getElementById('pr-wave-svg');
    if (!wrap || !svg || data.length < 2) { if (wrap) wrap.style.display = 'none'; return; }
    wrap.style.display = '';
    const secs = data.map(e => e.seconds);
    const mn   = Math.min(...secs) * 0.995;
    const mx   = Math.max(...secs) * 1.005;
    const W = 400, H = 48, P = 8;
    const xs = secs.map((_, i) => P + (i / (secs.length - 1)) * (W - P * 2));
    const ys = secs.map(s => H - P - ((s - mn) / (mx - mn || 1)) * (H - P * 2));
    const pts  = xs.map((x, i) => x + ',' + ys[i]).join(' ');
    const area = `M${xs[0]},${ys[0]} ` + xs.map((x, i) => i > 0 ? `L${x},${ys[i]}` : '').join(' ') +
                 ` L${xs[xs.length-1]},${H} L${xs[0]},${H} Z`;
    const dots = xs.map((x, i) => {
      const last = i === xs.length - 1;
      const best = secs[i] === Math.min(...secs);
      const r    = (last || best) ? 4 : 2.5;
      const fill = best ? '#d4a843' : (last ? '#C9A84C' : '#00c8d4');
      return `<circle cx="${x}" cy="${ys[i]}" r="${r}" fill="${fill}" opacity="${(last||best)?1:0.6}"/>`;
    }).join('');
    svg.innerHTML = `
      <defs><linearGradient id="pr-wg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#00c8d4" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#00c8d4" stop-opacity="0"/>
      </linearGradient></defs>
      <path d="${area}" fill="url(#pr-wg)"/>
      <polyline points="${pts}" fill="none" stroke="#00c8d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}`;
  }

  // Confetti
  let _prParticles = [];
  const _prCv  = () => document.getElementById('pr-cf');
  function prBurst() {
    const cv = _prCv(); if (!cv) return;
    cv.width  = window.innerWidth;
    cv.height = window.innerHeight;
    const cols = ['#d4a843','#00c8d4','#8B1A1A','#ffffff','#f0c060'];
    for (let i = 0; i < 90; i++) _prParticles.push({
      x: Math.random() * cv.width, y: -8,
      vx: (Math.random() - 0.5) * 7, vy: Math.random() * 5 + 2,
      rot: Math.random() * 360, rv: (Math.random() - 0.5) * 9,
      w: Math.random() * 8 + 3, h: Math.random() * 4 + 2,
      c: cols[~~(Math.random() * cols.length)], life: 1
    });
    requestAnimationFrame(prDrawConfetti);
  }
  function prDrawConfetti() {
    const cv = _prCv(); if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    _prParticles = _prParticles.filter(p => p.life > 0);
    _prParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.13;
      p.rot += p.rv; p.life -= 0.013;
      ctx.save(); ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.c; ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });
    if (_prParticles.length) requestAnimationFrame(prDrawConfetti);
    else ctx.clearRect(0, 0, cv.width, cv.height);
  }

  // Toast
  let _prToastTimer;
  function prShowToast(msg) {
    const t = document.getElementById('pr-toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(_prToastTimer);
    _prToastTimer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  // Detectar nuevos PRs al sincronizar Strava
  function prCheckNewRecord(dist, newBestSec) {
    const key  = 'prBest_' + dist;
    const prev = parseInt(localStorage.getItem(key) || '0', 10);
    if (prev === 0 || newBestSec < prev) {
      if (prev > 0) { // solo festejar si había registro anterior
        prBurst();
        const distLabel = dist.replace('km',' km').replace('m',' m');
        prShowToast('🏆 Nuevo récord — ' + distLabel + ' · ' + secToTime(newBestSec));
      }
      localStorage.setItem(key, newBestSec);
    }
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
  let ruckMetrica = 'potencia'; // 'tiempo' | 'potencia' — default: potencia

  function setRuckMetrica(modo, btn) {
    if (modo === 'potencia' && !hayBMRegistrado()) {
      const warn = document.getElementById('ruckBMWarning');
      if (warn) {
        warn.style.display = 'block';
        warn.innerHTML = '⚠ <strong>Peso corporal obligatorio.</strong> Ve a <a onclick="toggleAccord(document.querySelector(\'[data-accord=composicion]\'))" style="color:#e07b00;cursor:pointer;text-decoration:underline;">Composición Corporal</a> e ingresa tu peso para activar esta métrica.';
      }
      return; // No cambiar métrica
    }
    ruckMetrica = modo;
    const warn = document.getElementById('ruckBMWarning');
    if (warn) warn.style.display = 'none';
    document.querySelectorAll('#ruckToggleTiempo,#ruckTogglePotencia').forEach(b => {
      b.style.background = '#fff';
      b.style.color = '#999';
      b.style.borderColor = 'rgba(0,0,0,0.12)';
    });
    btn.style.background = 'rgba(139,26,26,0.1)';
    btn.style.color = '#8B1A1A';
    btn.style.borderColor = 'rgba(139,26,26,0.4)';
    updateRuckingAtletaPR();
  }

  function getBMHistorial() {
    // 1. Historial InBody con fechas
    const h = JSON.parse(localStorage.getItem('atletaBMHistorial') || '[]');
    if (h.length) return h;
    // 2. Peso de Mi Perfil manual
    const perfil = JSON.parse(localStorage.getItem('atletaPerfil') || '{}');
    const bm = parseFloat(localStorage.getItem('atletaBM')) ||
               perfil.peso ||
               JSON.parse(localStorage.getItem('ruckProfile') || '{}').bw || null;
    return bm ? [{ fecha: '2000-01-01', peso: bm }] : [];
  }

  function getBMForDate(fecha) {
    const historial = getBMHistorial();
    if (!historial.length) return null;
    // Buscar el peso más reciente en o antes de la fecha de la sesión
    const anteriores = historial.filter(m => m.fecha <= fecha);
    if (anteriores.length) return anteriores[anteriores.length - 1].peso;
    // Si la sesión es anterior a todos los registros, usar el más antiguo
    return historial[0].peso;
  }

  function hayBMRegistrado() {
    return getBMHistorial().length > 0;
  }

  // ── POTENCIA MECÁNICA RUCKING (Watts) ──────────────────────────────────────
  // Física newtoniana: aísla trabajo de fricción horizontal + trabajo contra
  // gravedad en ascensos. Usa tiempo NETO en movimiento (no penaliza pausas).
  //   Power(W) = (Masa × g × (μ·distancia_m + desnivel_m)) / tiempo_movimiento_s
  const G_RUCK = 9.81;
  const MU_TERRENO = { asfalto: 0.10, tierra: 0.15, trail: 0.20, arena: 0.28 };

  function calcPotenciaRucking(bodyWeight, packWeight, distanceM, elevationGain, movingTime, terrainType) {
    const warnings = [];
    const totalMass = bodyWeight + packWeight;
    // Validación biomecánica: carga > 40% del peso corporal
    if (packWeight > 0.40 * bodyWeight) {
      warnings.push('Carga extrema: la fórmula de potencia puede subestimar la fatiga real debido al colapso biomecánico');
    }
    if (!movingTime || movingTime <= 0) {
      return { power_watts: null, total_mass: totalMass, warnings };
    }
    const mu = MU_TERRENO[terrainType] != null ? MU_TERRENO[terrainType] : MU_TERRENO.trail;
    const trabajo = totalMass * G_RUCK * (mu * distanceM + (elevationGain || 0));
    const power = trabajo / movingTime;
    return { power_watts: Math.round(power * 10) / 10, total_mass: totalMass, warnings };
  }

  function calcPotenciaRuck(session) {
    const bm = getBMForDate(session.date);
    if (!bm || !session.time || !session.dist) return null;
    const r = calcPotenciaRucking(bm, session.load, session.dist * 1000, session.elev || 0, session.time, session.terrain || 'trail');
    return r.power_watts != null ? Math.round(r.power_watts) : null;
  }

  function calcTrabajoRuck(session) {
    const bm = getBMForDate(session.date);
    if (!bm || !session.dist) return null;
    const mu = MU_TERRENO[session.terrain] != null ? MU_TERRENO[session.terrain] : MU_TERRENO.trail;
    const trabajoJ = (bm + session.load) * G_RUCK * (mu * session.dist * 1000 + (session.elev || 0));
    return Math.round(trabajoJ / 1000); // kJ
  }

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
    // Auto-formato H:MM:SS en input de tiempo manual
    const ruckTimeInp = document.getElementById('ruckATime');
    if (ruckTimeInp && !ruckTimeInp._fmtBound) {
      ruckTimeInp._fmtBound = true;
      ruckTimeInp._digits   = '';

      function ruckTimeFmt(inp) {
        const d = inp._digits;
        if (!d) { inp.value = ''; return; }
        // 5 dígitos: [H][MM][SS] → máx 9:59:59
        const padded = d.padStart(5, '0');
        const h  = parseInt(padded[0]);
        const mm = padded.slice(1, 3);
        const ss = padded.slice(3, 5);
        inp.value = h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
      }

      ruckTimeInp.addEventListener('keydown', function(e) {
        if (/^\d$/.test(e.key)) {
          e.preventDefault();
          if (this._digits.length >= 5) return;
          const next = this._digits + e.key;
          // Validar MM y SS no mayores a 59
          const padded = next.padStart(5, '0');
          if (parseInt(padded.slice(1,3)) > 59 || parseInt(padded.slice(3,5)) > 59) return;
          this._digits = next;
          ruckTimeFmt(this);
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          this._digits = this._digits.slice(0, -1);
          ruckTimeFmt(this);
        } else if (!['Tab','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
          e.preventDefault();
        }
      });

      // Cursor siempre al final
      ruckTimeInp.addEventListener('click', function() {
        const len = this.value.length;
        this.setSelectionRange(len, len);
      });
    }
    // Activar botón Potencia por defecto
    const btnP = document.getElementById('ruckTogglePotencia');
    const btnT = document.getElementById('ruckToggleTiempo');
    if (btnP && btnT) {
      btnT.style.background='#fff'; btnT.style.color='#999'; btnT.style.borderColor='rgba(0,0,0,0.12)';
      btnP.style.background='rgba(139,26,26,0.1)'; btnP.style.color='#8B1A1A'; btnP.style.borderColor='rgba(139,26,26,0.4)';
    }
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
    // Backfill: garantizar id estable en toda sesión (las del cloud pueden perderlo)
    let _idFix = false;
    sessions.forEach((s, i) => {
      if (!s.id) { s.id = (s.stravaId ? 'st_'+s.stravaId : 'sess_'+i+'_'+(s.date||'')+'_'+(s.time||'')); _idFix = true; }
    });
    if (_idFix) localStorage.setItem('ruckSessions', JSON.stringify(sessions));
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
    const yaActivo = btn.classList.contains('active');
    document.querySelectorAll('#ruckALoadBtns .th-range-btn').forEach(b=>b.classList.remove('active'));
    if (yaActivo) {
      ruckAtletaLoad = null; // deseleccionar → ver todos los kg
    } else {
      btn.classList.add('active');
      ruckAtletaLoad = kg;
    }
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

    // ── Detección PR rucking ───────────────────────────────────────────────
    if (best && ruckAtletaDist && ruckAtletaLoad && withTime.length > 1) {
      // Solo comparar cuando hay más de 1 sesión (evitar falso positivo en primer registro)
      const rkKey = 'ruckBest_' + ruckAtletaDist + '_' + ruckAtletaLoad + '_' + ruckMetrica;
      if (ruckMetrica === 'potencia') {
        const bestW = calcPotenciaRuck(best);
        if (bestW) {
          const prevW = parseFloat(localStorage.getItem(rkKey) || '0');
          if (prevW === 0) {
            localStorage.setItem(rkKey, bestW); // guardar base sin festejar
          } else if (bestW > prevW) {
            localStorage.setItem(rkKey, bestW);
            prBurst();
            prShowToast('🏆 Récord Rucking — ' + ruckAtletaDist + ' km · ' + ruckAtletaLoad + ' kg · ' + bestW + ' W');
          }
        } else {
          // Sin BM registrado → comparar por tiempo igual que en modo tiempo
          const prevT = parseInt(localStorage.getItem(rkKey + '_t') || '0', 10);
          if (prevT === 0) {
            localStorage.setItem(rkKey + '_t', best.time);
          } else if (best.time < prevT) {
            localStorage.setItem(rkKey + '_t', best.time);
            prBurst();
            prShowToast('🏆 Récord Rucking — ' + ruckAtletaDist + ' km · ' + ruckAtletaLoad + ' kg · ' + fmtTimerRuck(best.time));
          }
        }
      } else {
        if (best.time > 0) {
          const prevT = parseInt(localStorage.getItem(rkKey) || '0', 10);
          if (prevT === 0) {
            localStorage.setItem(rkKey, best.time);
          } else if (best.time < prevT) {
            localStorage.setItem(rkKey, best.time);
            prBurst();
            prShowToast('🏆 Récord Rucking — ' + ruckAtletaDist + ' km · ' + ruckAtletaLoad + ' kg · ' + fmtTimerRuck(best.time));
          }
        }
      }
    }

    // Delta vs primer registro
    const deltaEl = document.getElementById('ruckADelta');
    if (deltaEl && sorted.length >= 2) {
      if (ruckMetrica === 'potencia') {
        const firstW  = calcPotenciaRuck(sorted[0]);
        const latestW = calcPotenciaRuck(sorted[sorted.length-1]);
        if (firstW && latestW) {
          const diff = latestW - firstW;
          const pct  = (Math.abs(diff)/firstW*100).toFixed(1);
          if (diff > 0) {
            deltaEl.innerHTML = `<span style="color:#1e8c3a;">▲ +${diff} W</span> <span style="font-size:11px;color:#999;">mejora · ${pct}%</span>`;
          } else if (diff < 0) {
            deltaEl.innerHTML = `<span style="color:#d32f2f;">▼ ${diff} W</span> <span style="font-size:11px;color:#999;">baja · ${pct}%</span>`;
          } else {
            deltaEl.innerHTML = `<span style="color:#999;">— sin cambio</span>`;
          }
        } else {
          deltaEl.innerHTML = '<span style="color:#bbb;font-size:12px;">Sin peso registrado</span>';
        }
      } else {
        const first  = sorted[0].time;
        const latest = sorted[sorted.length-1].time;
        const diff   = first - latest;
        const pct    = (Math.abs(diff)/first*100).toFixed(1);
        if (diff > 0) {
          deltaEl.innerHTML = `<span style="color:#1e8c3a;">▲ ${fmtTimerRuck(diff)}</span> <span style="font-size:11px;color:#999;">mejora · ${pct}%</span>`;
        } else if (diff < 0) {
          deltaEl.innerHTML = `<span style="color:#d32f2f;">▼ ${fmtTimerRuck(-diff)}</span> <span style="font-size:11px;color:#999;">baja · ${pct}%</span>`;
        } else {
          deltaEl.innerHTML = `<span style="color:#999;">— sin cambio</span>`;
        }
      }
    } else if (deltaEl) {
      deltaEl.innerHTML = '<span style="color:#bbb;font-size:12px;">—</span>';
    }

    // Gráfico
    const ctx = document.getElementById('chartRucking');
    const bmWarn = document.getElementById('ruckBMWarning');
    if (ctx) {
      if (chartRucking) { chartRucking.destroy(); chartRucking = null; }
      if (sorted.length) {
        const usePotencia = ruckMetrica === 'potencia';
        const bm = hayBMRegistrado();
        if (usePotencia && bmWarn) bmWarn.style.display = bm ? 'none' : 'block';
        else if (bmWarn) bmWarn.style.display = 'none';

        const labels = sorted.map(s => {
          const d = new Date(s.date+'T12:00:00');
          return d.getDate()+'/'+(d.getMonth()+1);
        });

        const data = usePotencia
          ? sorted.map(s => calcPotenciaRuck(s))
          : sorted.map(s => +(s.time/60).toFixed(2));

        const isReversed = !usePotencia;
        const color = usePotencia ? '#C9A84C' : '#8B1A1A';
        const bgColor = usePotencia ? 'rgba(201,168,76,0.08)' : 'rgba(0,122,133,0.08)';

        chartRucking = new Chart(ctx, {
          type: 'line',
          data: {
            labels,
            datasets:[{
              data,
              borderColor: color, backgroundColor: bgColor,
              fill:true, tension:0.3, pointRadius:4,
              pointBackgroundColor: color,
              pointBorderColor:'#fff', pointBorderWidth:1.5
            }]
          },
          options:{
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:false } },
            scales:{
              y:{
                reverse: isReversed,
                ticks:{
                  color:'#999', font:{size:10},
                  callback: usePotencia
                    ? v => v+' W'
                    : v => { const s=Math.round(v*60); const h=Math.floor(s/3600); const m=Math.floor((s%3600)/60); const ss=s%60; return h>0?h+':'+String(m).padStart(2,'0')+':'+String(ss).padStart(2,'0'):String(m).padStart(2,'0')+':'+String(ss).padStart(2,'0'); }
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
        tbody.innerHTML = recent.map(s=>{
          const pot     = calcPotenciaRuck(s);
          const trabajo = calcTrabajoRuck(s);
          const esStrava = s.source === 'strava';
          const editTitle = esStrava ? 'Editar tiempo (Strava)' : 'Editar sesión';
          return `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.05);gap:8px;">
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:600;color:#333;">${fmtTimerRuck(s.time)}</div>
              <div style="font-size:11px;color:#999;">${fmtDateRuck(s.date)}${esStrava?' · <span style="color:#FC4C02;">Strava</span>':''}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#8B1A1A;">${s.dist} km · ${s.load} kg</div>
              ${pot ? `<div style="font-family:'Barlow Condensed',sans-serif;font-size:11px;color:#C9A84C;">${pot} W · ${trabajo} kJ</div>` : ''}
              ${s.elev>0?`<div style="font-size:10px;color:#bbb;">↑ ${s.elev} m desnivel</div>`:''}
            </div>
            <button onclick="editRuckSession('${s.id}')" title="${editTitle}"
              style="background:none;border:1px solid rgba(0,0,0,0.15);border-radius:4px;color:#aaa;font-size:13px;padding:3px 7px;cursor:pointer;flex-shrink:0;transition:all 0.15s;line-height:1;"
              onmouseover="this.style.borderColor='#C9A84C';this.style.color='#C9A84C';"
              onmouseout="this.style.borderColor='rgba(0,0,0,0.15)';this.style.color='#aaa';">✎</button>
            <button onclick="deleteRuckSessionAtleta('${s.id}')" title="Eliminar sesión"
              style="background:none;border:1px solid rgba(0,0,0,0.15);border-radius:4px;color:#aaa;font-size:13px;padding:3px 7px;cursor:pointer;flex-shrink:0;transition:all 0.15s;line-height:1;"
              onmouseover="this.style.borderColor='#d32f2f';this.style.color='#d32f2f';"
              onmouseout="this.style.borderColor='rgba(0,0,0,0.15)';this.style.color='#aaa';">✕</button>
          </div>`;
        }).join('');
      }
    }
  }

  function updateRuckingDashboard() {
    initRuckingAtleta();
  }

  function toggleRuckManualAdd() {
    const f = document.getElementById('ruckAManualForm');
    if (!f) return;
    const visible = f.style.display !== 'none' && f.style.display !== '';
    f.style.display = visible ? 'none' : 'block';
    if (!visible) {
      // Prellenar fecha de hoy si está vacía
      const dateInp = document.getElementById('ruckADate');
      if (dateInp && !dateInp.value) {
        dateInp.value = new Date().toISOString().slice(0, 10);
      }
      // Limpiar tiempo y resetear buffer de dígitos
      const timeInp = document.getElementById('ruckATime');
      if (timeInp) { timeInp.value = ''; timeInp._digits = ''; timeInp.focus(); }
    }
  }

  // ID de sesión en edición (null = modo agregar)
  let _ruckEditId = null;

  function editRuckSession(id) {
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');
    const s = sessions.find(x => x.id === id);
    if (!s) return;
    _ruckEditId = id;

    // Mostrar formulario
    const form = document.getElementById('ruckAManualForm');
    if (form) form.style.display = 'block';

    // Rellenar campos
    const dateInp = document.getElementById('ruckADate');
    const distInp = document.getElementById('ruckADist');
    const loadInp = document.getElementById('ruckALoad');
    const timeInp = document.getElementById('ruckATime');

    if (dateInp) { dateInp.value = s.date; dateInp.disabled = s.source==='strava'; }
    if (distInp) { distInp.value = s.dist; distInp.disabled = s.source==='strava'; }
    if (loadInp) { loadInp.value = s.load; loadInp.disabled = s.source==='strava'; }

    // Desnivel, terreno y notas (terreno editable también para sesiones Strava)
    const elevInp = document.getElementById('ruckAElev');
    if (elevInp) elevInp.value = s.elev || '';
    const terrInp = document.getElementById('ruckATerrain');
    if (terrInp) terrInp.value = (typeof s.terrain === 'string' && MU_TERRENO[s.terrain]) ? s.terrain : 'trail';
    const notesInp = document.getElementById('ruckANotes');
    if (notesInp) notesInp.value = (s.notes && s.notes !== 'Manual') ? s.notes : '';

    // Convertir segundos a H:MM:SS y setear _digits
    if (timeInp) {
      const h  = Math.floor(s.time / 3600);
      const m  = Math.floor((s.time % 3600) / 60);
      const sc = s.time % 60;
      timeInp.value = h > 0
        ? `${h}:${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`
        : `${String(m).padStart(2,'0')}:${String(sc).padStart(2,'0')}`;
      // _digits = 5 chars HMMSS (sin ceros iniciales de la hora si h=0)
      timeInp._digits = String(h) + String(m).padStart(2,'0') + String(sc).padStart(2,'0');
      timeInp._digits = timeInp._digits.replace(/^0+/,'') || '';
    }

    // Cambiar botón y título del formulario
    const addBtn = document.querySelector('[onclick="addRuckManualSession()"]');
    if (addBtn) addBtn.textContent = s.source==='strava' ? 'GUARDAR TIEMPO' : 'GUARDAR CAMBIOS';
    const formTitle = document.getElementById('ruckAFormTitle');
    if (formTitle) formTitle.textContent = s.source==='strava'
      ? 'EDITAR TIEMPO — STRAVA'
      : 'EDITAR SESIÓN MANUAL';

    // Scroll al formulario
    form?.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function _resetRuckForm() {
    _ruckEditId = null;
    const addBtn = document.querySelector('[onclick="addRuckManualSession()"]');
    if (addBtn) addBtn.textContent = 'AGREGAR';
    const formTitle = document.getElementById('ruckAFormTitle');
    if (formTitle) formTitle.textContent = 'AGREGAR SESIÓN MANUAL';
    ['ruckADate','ruckADist','ruckALoad'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.disabled = false;
    });
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
    const elev    = parseFloat(document.getElementById('ruckAElev')?.value)||0;
    const terrain = document.getElementById('ruckATerrain')?.value || 'trail';
    const notes   = document.getElementById('ruckANotes')?.value?.trim()||'Manual';
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]');

    if (_ruckEditId) {
      // ── MODO EDICIÓN ──────────────────────────────────────────
      const idx = sessions.findIndex(x => x.id === _ruckEditId);
      if (idx !== -1) {
        const orig = sessions[idx];
        sessions[idx] = orig.source === 'strava'
          ? { ...orig, time: tSec, terrain }                                       // Strava: tiempo + terreno editable
          : { ...orig, date, dist, load, time: tSec, elev, notes, terrain };       // Manual: todo
      }
      _resetRuckForm();
    } else {
      // ── MODO AGREGAR ─────────────────────────────────────────
      sessions.push({ id:Date.now().toString(), date, dist, load, time:tSec, elev, notes, terrain, source:'manual' });
    }

    localStorage.setItem('ruckSessions', JSON.stringify(sessions));
    pushRuckingToCloud(sessions);

    // Alerta biomecánica: carga > 40% del peso corporal
    const bmHoy = getBMForDate(date);
    if (bmHoy && load > 0.40 * bmHoy) {
      if (typeof prShowToast === 'function') {
        prShowToast('⚠ Carga extrema (' + Math.round(load/bmHoy*100) + '% del peso corporal): la potencia puede subestimar la fatiga real por colapso biomecánico.');
      }
    }

    document.getElementById('ruckAManualForm').style.display='none';
    const ti = document.getElementById('ruckATime');
    if (ti) { ti.value = ''; ti._digits = ''; }
    const elevEl = document.getElementById('ruckAElev');
    if (elevEl) elevEl.value = '';
    const terrEl = document.getElementById('ruckATerrain');
    if (terrEl) terrEl.value = 'trail';
    const notesEl = document.getElementById('ruckANotes');
    if (notesEl) notesEl.value = '';
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
    // Historial SE
    if (!profile.seHistory) profile.seHistory = [];
    // Evitar duplicado exacto mismo día
    const hoy = profile.seDate;
    profile.seHistory = profile.seHistory.filter(e => e.date !== hoy);
    profile.seHistory.push({ reps: val, date: hoy });
    profile.seHistory.sort((a,b) => a.date.localeCompare(b.date));
    localStorage.setItem('ruckProfile', JSON.stringify(profile));
    if (statusEl) {
      statusEl.textContent = `✓ SE guardado: ${val} reps · ${profile.seDate}`;
      statusEl.style.color = '#27ae60';
    }
    // Resultado semáforo
    mostrarSEResultado(val);
    // Feedback visual en el botón
    const btn = document.querySelector('[onclick="guardarRuckSE()"]');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ GUARDADO';
      btn.style.background = '#27ae60';
      btn.style.transform = 'scale(1.04)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.style.transform = '';
      }, 1800);
    }
    // Sincronizar con la nube
    pushRuckProfileToCloud(profile);
  }

  async function pushRuckProfileToCloud(profile) {
    const cloudId = getAthleteCloudId();
    if (!cloudId) return;
    const nombre = localStorage.getItem('atletaNombre')
                || window._auth?.currentUser?.displayName
                || '';
    // Preservar linkedStravaId en el perfil para que el coach siempre tenga el vínculo
    const stravaId = localStorage.getItem('strava_athlete_id');
    const profileToSave = stravaId ? { ...profile, linkedStravaId: stravaId } : profile;
    try {
      await fetch('https://flow-payments.jaimea-gomezh.workers.dev/rucking/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stravaId: cloudId, nombre, profile: profileToSave })
      });
    } catch(e) { console.warn('[Rucking] Profile sync error:', e); }
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
      mostrarSEResultado(profile.se);
    }
    renderSEHistorial(profile);
  }

  function renderSEHistorial(profile) {
    const hist = profile?.seHistory;
    const container = document.getElementById('ruckSEHistorial');
    if (!container) return;
    if (!hist || hist.length === 0) { container.innerHTML = ''; return; }
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const rows = [...hist].reverse().map(e => {
      const [y,mo,d] = e.date.split('-').map(Number);
      const fecha = `${d} ${meses[mo-1]} ${y}`;
      return `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid rgba(0,0,0,0.05);font-size:12px;">
        <span style="color:#555;">${fecha}</span>
        <span style="font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;color:#007a85;">${e.reps} reps</span>
        <button onclick="borrarSEEntry('${e.date}')" style="background:none;border:none;color:#bbb;cursor:pointer;font-size:15px;padding:0 4px;line-height:1;" title="Borrar">×</button>
      </div>`;
    }).join('');
    container.innerHTML = `<div style="margin-top:10px;font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:2px;color:#999;text-transform:uppercase;margin-bottom:6px;">Historial</div>${rows}`;
  }

  function borrarSEEntry(fecha) {
    const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
    if (!profile.seHistory) return;
    profile.seHistory = profile.seHistory.filter(e => e.date !== fecha);
    // Si borramos el más reciente, actualizar profile.se al nuevo último
    if (profile.seDate === fecha) {
      const ultimo = profile.seHistory[profile.seHistory.length - 1];
      profile.se = ultimo?.reps || null;
      profile.seDate = ultimo?.date || null;
      const inp = document.getElementById('ruckSEInput');
      if (inp) inp.value = profile.se || '';
      if (profile.se) mostrarSEResultado(profile.se);
    }
    localStorage.setItem('ruckProfile', JSON.stringify(profile));
    pushRuckProfileToCloud(profile);
    renderSEHistorial(profile);
  }

  function mostrarSEResultado(val) {
    const resultEl  = document.getElementById('ruckSEResultado');
    const bandaEl   = document.getElementById('ruckSEBanda');
    const mensajeEl = document.getElementById('ruckSEMensaje');
    if (!resultEl) return;
    let color, bg, border, banda, mensaje, anim;
    if (val >= 40) {
      color='#1e8c3a'; bg='rgba(30,140,58,0.10)'; border='rgba(30,140,58,0.4)';
      banda='● Zona óptima';
      mensaje='Buena resistencia muscular para rucking. Tu tren inferior aguanta la fatiga de marcha con carga.';
      anim='none';
    } else if (val >= 25) {
      color='#e07b00'; bg='rgba(224,123,0,0.10)'; border='rgba(224,123,0,0.4)';
      banda='● Zona media';
      mensaje='Resistencia muscular mejorable. Trabajar sentadilla con cargas moderadas y series largas.';
      anim='se-pulse-orange 2.4s ease-in-out infinite';
    } else {
      color='#d32f2f'; bg='rgba(211,47,47,0.10)'; border='rgba(211,47,47,0.4)';
      banda='● Zona crítica';
      mensaje='Priorizar fuerza-resistencia de tren inferior antes de aumentar la carga de rucking.';
      anim='se-pulse-red 1.2s ease-in-out infinite';
    }
    resultEl.style.display    = 'block';
    resultEl.style.background = bg;
    resultEl.style.border     = `1px solid ${border}`;
    resultEl.style.animation  = anim;
    bandaEl.style.color       = color;
    bandaEl.textContent       = banda;
    mensajeEl.style.color     = color;
    mensajeEl.textContent     = mensaje;
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
    const dists = ['1km','2km','2400m','3200m','5km','8km','10km','12km','15km','21km','42km'];
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
    const dists = ['1km','2km','2400m','3200m','5km','8km','10km','12km','15km','21km','42km'];

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

      // Si es 3200m → sincronizar como TMR en ruckProfile para Kraemer
      if (d === '3200m') {
        const parts3 = timeVal.split(':').map(Number);
        const tmrSec = parts3.length === 3
          ? parts3[0]*3600 + parts3[1]*60 + parts3[2]
          : parts3[0]*60  + (parts3[1] || 0);
        if (tmrSec > 0) {
          const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
          profile.tmrSec = tmrSec;
          profile.tmrStr = timeVal;
          localStorage.setItem('ruckProfile', JSON.stringify(profile));
          if (typeof pushRuckProfileToCloud === 'function') pushRuckProfileToCloud(profile);
        }
      }

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

  // ── BANNER TMR 3200m ────────────────────────────────────────────────────────
  function checkStrava3200mUpdate(runs) {
    const runs3200 = runs.filter(a => STRAVA_RUN_TYPES.has(a.type) && a.distance >= 3150 && a.distance <= 3250);
    if (!runs3200.length) return;
    const latest = runs3200.sort((a,b) => new Date(b.start_date_local) - new Date(a.start_date_local))[0];
    const latestDate = new Date(latest.start_date_local).toISOString().slice(0,10);
    if (localStorage.getItem('tmr3200mDate') === latestDate) return;
    // Ajustar tiempo a exactamente 3200m
    const tmrSec = Math.round(latest.moving_time * (3200 / latest.distance));
    const tmrStr = secToTime(tmrSec);
    const pending = { date: latestDate, tmrSec, tmrStr };
    localStorage.setItem('tmr3200m_pending', JSON.stringify(pending));
    mostrarTMRBanner(pending);
  }

  function mostrarTMRBanner(pending) {
    const banner = document.getElementById('tmrStravaBanner');
    const infoEl = document.getElementById('tmrStravaInfo');
    if (!banner || !pending) return;
    const [y, mo, da] = pending.date.split('-').map(Number);
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    infoEl.innerHTML = `<strong>${da} ${meses[mo-1]} ${y}</strong> · 3.2 km · ${pending.tmrStr} ` +
      `<span style="color:#888;">(¿Usar como tu nuevo TMR?)</span>`;
    banner.style.display = 'block';
  }

  function usarTMRStrava() {
    const pending = JSON.parse(localStorage.getItem('tmr3200m_pending') || 'null');
    if (!pending) return;
    const profile = JSON.parse(localStorage.getItem('ruckProfile') || '{}');
    profile.tmrSec = pending.tmrSec;
    profile.tmrStr = pending.tmrStr;
    localStorage.setItem('ruckProfile', JSON.stringify(profile));
    localStorage.setItem('tmr3200mDate', pending.date);
    localStorage.removeItem('tmr3200m_pending');
    descartarTMRBanner();
    if (typeof pushRuckProfileToCloud === 'function') pushRuckProfileToCloud(profile);
  }

  function descartarTMRBanner() {
    const banner = document.getElementById('tmrStravaBanner');
    if (banner) banner.style.display = 'none';
    const pending = JSON.parse(localStorage.getItem('tmr3200m_pending') || 'null');
    if (pending) localStorage.setItem('tmr3200mDate', pending.date);
    localStorage.removeItem('tmr3200m_pending');
  }

  // ── BANNER EV. 5 MINUTOS ────────────────────────────────────────────────────
  const EV5_PATTERN = /\bev\.?\s*5\s*min|\btest\s*5\s*min|\b5\s*min(uto)?s?\s*(test|ev)|\bevaluaci[oó]n\s*5\s*min/i;

  function checkStravaEv5minUpdate(acts) {
    const evRuns = acts.filter(a => STRAVA_RUN_TYPES.has(a.type) && EV5_PATTERN.test(a.name || ''));
    if (!evRuns.length) return;
    const latest = evRuns.sort((a,b) => new Date(b.start_date_local) - new Date(a.start_date_local))[0];
    const latestDate = new Date(latest.start_date_local).toISOString().slice(0,10);
    if (localStorage.getItem('ev5minStravaDate') === latestDate) return;
    const distKm  = parseFloat((latest.distance / 1000).toFixed(2));
    const vPico   = parseFloat((distKm * 12).toFixed(1)); // km/h = km / (5min/60)
    const pending = { date: latestDate, distKm, vPico, name: latest.name || 'Test 5 min' };
    localStorage.setItem('ev5min_pending', JSON.stringify(pending));
    mostrarEv5minBanner(pending);
  }

  function mostrarEv5minBanner(pending) {
    const banner = document.getElementById('ev5minStravaBanner');
    const infoEl = document.getElementById('ev5minStravaInfo');
    if (!banner || !pending) return;
    const [y, mo, da] = pending.date.split('-').map(Number);
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    infoEl.innerHTML = `<strong>${da} ${meses[mo-1]} ${y}</strong> · "${pending.name}" · ` +
      `${pending.distKm} km → V PICO estimada <strong>${pending.vPico} km/h</strong>`;
    banner.style.display = 'block';
  }

  function usarEv5minStrava() {
    const pending = JSON.parse(localStorage.getItem('ev5min_pending') || 'null');
    if (!pending) return;
    // Cambiar a modo 5min y prellenar distancia
    if (typeof setVpicoTab === 'function') setVpicoTab('5min', document.getElementById('tabVpico5min'));
    const inp = document.getElementById('inputDist5min');
    if (inp) {
      inp.value = pending.distKm;
      if (typeof onDist5minInput === 'function') onDist5minInput();
    }
    localStorage.setItem('zonaParams', JSON.stringify({
      vpico:    pending.vPico,
      fcmax:    parseFloat(document.getElementById('inputFcMax')?.value) || null,
      mode:     '5min',
      dist5min: pending.distKm,
      fromStrava: pending.date
    }));
    localStorage.setItem('ev5minStravaDate', pending.date);
    localStorage.removeItem('ev5min_pending');
    descartarEv5minBanner();
    if (typeof calcularZonasCarrera === 'function') calcularZonasCarrera();
  }

  function descartarEv5minBanner() {
    const banner = document.getElementById('ev5minStravaBanner');
    if (banner) banner.style.display = 'none';
    const pending = JSON.parse(localStorage.getItem('ev5min_pending') || 'null');
    if (pending) localStorage.setItem('ev5minStravaDate', pending.date);
    localStorage.removeItem('ev5min_pending');
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
    // Restaurar banners de Strava pendientes de sesión anterior
    const pending5km = JSON.parse(localStorage.getItem('zonaStrava5km_pending') || 'null');
    if (pending5km && localStorage.getItem('zonaStrava5kmDate') !== pending5km.date) {
      mostrarZonaStravaBanner(pending5km);
    }
    const pendingTMR = JSON.parse(localStorage.getItem('tmr3200m_pending') || 'null');
    if (pendingTMR && localStorage.getItem('tmr3200mDate') !== pendingTMR.date) {
      mostrarTMRBanner(pendingTMR);
    }
    const pendingEv5 = JSON.parse(localStorage.getItem('ev5min_pending') || 'null');
    if (pendingEv5 && localStorage.getItem('ev5minStravaDate') !== pendingEv5.date) {
      mostrarEv5minBanner(pendingEv5);
    }
  }

  // ── ZONAS DE ENTRENAMIENTO ─────────────────────────────────────────────────
  // Test de 5 minutos de Berthon (1997) → VAM (dist×12) y VO2max (dist×39)
  // Modelo de zonificación de Cerezuela-Espejo (2018) → reparte en 5 zonas
  //   (% de VAM y % de FCmáx para cada zona Z1-Z5 / R0-R3+)
  // Calcula rangos de pace (MM:SS), FC y RPE por zona.
  // distancia_5m: km recorridos en 5 min (float, requerido)
  // fc_max: pulsaciones máximas (int, opcional/nullable)
  function calcularZonasBerthon(distancia_5m, fc_max = null) {
    if (typeof distancia_5m !== 'number' || isNaN(distancia_5m) || distancia_5m <= 0) {
      throw new Error('distancia_5m debe ser un número positivo (km).');
    }
    const hasFc = fc_max != null && !isNaN(fc_max) && fc_max > 0;

    const VAM    = distancia_5m * 12;   // Velocidad Aeróbica Máxima (km/h)
    const VO2max = distancia_5m * 39;   // VO2max estimado (ml/kg/min)

    // velocidad (km/h) → ritmo "MM:SS" min/km
    function paceToMMSS(velKmh) {
      if (!velKmh || velKmh <= 0) return null;
      const dec = 60 / velKmh;                // min/km decimal
      let m = Math.floor(dec);
      let s = Math.round((dec - m) * 60);
      if (s === 60) { m += 1; s = 0; }
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    // Rangos según Cerezuela-Espejo (% VAM) + FC (% FCmáx)
    const DEF = [
      { zona:'Z1', ref:'R0',  nombre:'Recuperación',      vLo:0.00, vHi:0.53, fcLo:0.00, fcHi:0.71, rpe:'1-2'  },
      { zona:'Z2', ref:'R1',  nombre:'Umbral aeróbico',   vLo:0.53, vHi:0.65, fcLo:0.71, fcHi:0.82, rpe:'3-4'  },
      { zona:'Z3', ref:'R2',  nombre:'Tempo / MLSS',      vLo:0.65, vHi:0.80, fcLo:0.82, fcHi:0.89, rpe:'5-6'  },
      { zona:'Z4', ref:'R3',  nombre:'Umbral anaeróbico', vLo:0.80, vHi:0.89, fcLo:0.89, fcHi:0.94, rpe:'7-8'  },
      { zona:'Z5', ref:'R3+', nombre:'Potencia aeróbica', vLo:0.89, vHi:1.00, fcLo:0.94, fcHi:1.00, rpe:'9-10' },
    ];

    const zonas = DEF.map(z => {
      const vLow  = +(VAM * z.vLo).toFixed(2);
      const vHigh = +(VAM * z.vHi).toFixed(2);
      const paceFast = paceToMMSS(vHigh);             // ritmo más rápido (límite alto)
      const paceSlow = z.vLo > 0 ? paceToMMSS(vLow) : null;
      const pace = z.vLo > 0
        ? `${paceFast} – ${paceSlow}`
        : `> ${paceFast}`;

      let heartRate = 'N/A';
      if (hasFc) {
        const fcLow  = Math.round(fc_max * z.fcLo);
        const fcHigh = Math.round(fc_max * z.fcHi);
        heartRate = z.fcLo > 0 ? `${fcLow} – ${fcHigh}` : `< ${fcHigh}`;
      }

      return {
        zona: z.zona, ref: z.ref, nombre: z.nombre,
        vLow, vHigh,
        speed: `${vLow} – ${vHigh} km/h`,
        pace, heartRate, rpe: z.rpe
      };
    });

    return {
      VAM:    +VAM.toFixed(1),
      VO2max: +VO2max.toFixed(1),
      fcMax:  hasFc ? Math.round(fc_max) : null,
      zonas
    };
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

    // Calcular zonas con el modelo Berthon (necesita distancia_5m = VAM/12)
    let resultado = null;
    if (vpico) {
      try {
        resultado = calcularZonasBerthon(vpico / 12, fcmax || null);
      } catch(e) { console.warn('[Zonas] error:', e); }
    }

    if (refTexto) {
      const parts = [];
      if (resultado) {
        parts.push(`VAM ${resultado.VAM} km/h`);
        parts.push(`VO₂máx ${resultado.VO2max} ml/kg/min`);
      } else if (vpico) {
        parts.push(`V PICO ${vpico.toFixed(1)} km/h`);
      }
      if (fcmax) parts.push(`FC máx ${Math.round(fcmax)} ppm`);
      refTexto.textContent = parts.join(' · ');
    }

    // Colores por zona (Z1 azul → Z5 rojo)
    const COLORS = ['#5b9bd5', '#27ae60', '#f39c12', '#e67e22', '#e74c3c'];

    if (filasEl && resultado) {
      filasEl.innerHTML = resultado.zonas.map((z, i) => {
        const color    = COLORS[i];
        const speedStr = z.speed;
        const paceStr  = `${z.pace} /km`;
        const fcStr    = z.heartRate !== 'N/A' ? `${z.heartRate} ppm` : '';
        const rowBg = i % 2 === 0 ? 'rgba(0,0,0,0.018)' : 'transparent';
        const sep   = i < resultado.zonas.length - 1 ? 'border-bottom:1px solid rgba(0,0,0,0.05);' : '';

        return `<div style="display:grid;grid-template-columns:60px 1fr 120px;gap:0;padding:13px 12px;background:${rowBg};align-items:start;${sep}">
          <div>
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:800;letter-spacing:0.5px;color:${color};background:${color}18;border:1px solid ${color}55;border-radius:4px;padding:3px 7px;display:inline-block;">${z.zona}</span>
            <div style="font-family:'Barlow',sans-serif;font-size:10px;color:#bbb;margin-top:3px;text-align:center;">${z.ref}</div>
          </div>
          <div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:600;letter-spacing:0.3px;color:#1a1a1a;">${z.nombre}</div>
            <div style="font-family:'Barlow',sans-serif;font-size:13px;color:#999;margin-top:2px;">RPE ${z.rpe}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;color:#333;">${speedStr}</div>
            <div style="font-family:'Barlow',sans-serif;font-size:13px;color:#999;margin-top:2px;">${paceStr}</div>
            ${fcStr ? `<div style="font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;color:${color};margin-top:4px;">${fcStr}</div>` : ''}
          </div>
        </div>`;
      }).join('');
    }
    if (tablaEl) tablaEl.style.display = 'block';
  }

  // ── FLOW PAGOS ────────────────────────────────
  const FLOW_WORKER = 'https://flow-payments.jaimea-gomezh.workers.dev';

  // Función que procesa el pago según la opción elegida (mensual o único)
  // ── RUT chileno: formato y validación ─────────────────────
  function formatearRutInput(input) {
    let v = input.value.replace(/[^0-9kK]/g, '').toUpperCase();
    if (v.length > 9) v = v.slice(0, 9);
    if (v.length > 1) {
      const cuerpo = v.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      input.value = cuerpo + '-' + v.slice(-1);
    } else {
      input.value = v;
    }
    // Ocultar error mientras escribe
    const err = document.getElementById('modalRutError');
    if (err) err.style.display = 'none';
  }

  function validarRUT(rut) {
    const limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    if (limpio.length < 2) return false;
    const cuerpo = limpio.slice(0, -1);
    const dv = limpio.slice(-1);
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i]) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado);
    return dv === dvCalc;
  }

  function limpiarRUT(rut) {
    // Devuelve RUT sin puntos con guión: "12345678-9"
    const limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    return limpio.slice(0, -1) + '-' + limpio.slice(-1);
  }

  async function procesarPago() {
    const tipoPago = document.querySelector('input[name="tipoPago"]:checked')?.value;
    const planData = window._planData;

    if (!tipoPago || !planData) {
      alert('Error: no se pudo procesar el pago.');
      return;
    }

    const user = window._auth?.currentUser;

    // Si NO está logueado, obtener email del campo
    let email, nombre;
    if (!user) {
      const emailInput = document.getElementById('modalEmail');
      if (!emailInput?.value || !emailInput.value.includes('@')) {
        alert('Por favor ingresa un correo electrónico válido.');
        return;
      }
      email = emailInput.value;
      nombre = email.split('@')[0];
    } else {
      email = user.email;
      nombre = user.displayName || user.email.split('@')[0];
    }

    // Validar RUT (siempre requerido para la boleta)
    const rutInput = document.getElementById('modalRut');
    const rutError = document.getElementById('modalRutError');
    const rutRaw = rutInput?.value || '';
    if (!rutRaw || !validarRUT(rutRaw)) {
      if (rutError) rutError.style.display = 'block';
      rutInput?.focus();
      return;
    }
    const rutCliente = limpiarRUT(rutRaw);

    try {
      // Llamar al worker pasando: tipo de pago (mensual o unico), nombre del plan, monto
      const monto = tipoPago === 'mensual' ? planData.montoNum : planData.descuento15;
      const tipoSuscripcion = tipoPago === 'mensual' ? 'suscripcion-3m' : 'pago-unico';

      const res = await fetch(`${FLOW_WORKER}/crear-pago`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planData.nombre,
          monto,
          email,
          nombre,
          rutCliente,          // ← RUT para boleta SII
          tipoPago,
          tipoSuscripcion,
          isAnonymous: !user
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

  // ── Formato fecha dd/mm/aa ──────────────────────────────────
  function fmtFecha(iso) {
    if (!iso) return '';
    const [a, m, d] = iso.split('-');
    return `${d}/${m}/${a.slice(2)}`;
  }

  // ── MI CUENTA: dropdown con Mis Planes ──────────────────────
  let _miCuentaAbierto = false;

  function toggleMiCuenta() {
    const dd = document.getElementById('miCuentaDropdown');
    const ch = document.getElementById('miCuentaChevron');
    _miCuentaAbierto = !_miCuentaAbierto;
    dd.style.display = _miCuentaAbierto ? 'block' : 'none';
    if (ch) ch.style.transform = _miCuentaAbierto ? 'rotate(180deg)' : '';
    if (_miCuentaAbierto) cargarMiPlan();
  }

  // Cerrar dropdown al click fuera
  document.addEventListener('click', (e) => {
    if (_miCuentaAbierto && !document.getElementById('miCuentaWrap')?.contains(e.target)) {
      const dd = document.getElementById('miCuentaDropdown');
      const ch = document.getElementById('miCuentaChevron');
      if (dd) dd.style.display = 'none';
      if (ch) ch.style.transform = '';
      _miCuentaAbierto = false;
    }
  });

  // ── MENÚ MÓVIL DEL DASHBOARD ─────────────────────────────────
  let _dashMenuAbierto = false;

  function toggleDashMenu() {
    _dashMenuAbierto = !_dashMenuAbierto;
    const menu = document.getElementById('dashMobileMenu');
    const hbLines = document.querySelectorAll('.dash-hamburger span');
    if (menu) menu.classList.toggle('open', _dashMenuAbierto);
    // Animación hamburger → X
    if (hbLines.length === 3) {
      if (_dashMenuAbierto) {
        hbLines[0].style.transform = 'rotate(45deg) translate(5px,5px)';
        hbLines[1].style.opacity   = '0';
        hbLines[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
      } else {
        hbLines[0].style.transform = '';
        hbLines[1].style.opacity   = '1';
        hbLines[2].style.transform = '';
      }
    }
    if (!_dashMenuAbierto) {
    // Al cerrar el menú, colapsar también el acordeón de planes
    const wrap = document.getElementById('miPlanContentMobileWrap');
    const icon = document.getElementById('iconMiPlanesMobile');
    if (wrap) wrap.style.display = 'none';
    if (icon) { icon.textContent = '▼'; icon.style.transform = ''; }
    _miPlanesMobileAbierto = false;
  }
  }

  let _miPlanesMobileAbierto = false;
  function toggleMiPlanesMobile() {
    _miPlanesMobileAbierto = !_miPlanesMobileAbierto;
    const wrap = document.getElementById('miPlanContentMobileWrap');
    const icon = document.getElementById('iconMiPlanesMobile');
    if (wrap) wrap.style.display = _miPlanesMobileAbierto ? 'block' : 'none';
    if (icon) { icon.style.transform = _miPlanesMobileAbierto ? 'rotate(180deg)' : ''; }
    if (_miPlanesMobileAbierto) cargarMiPlan();
  }
  window.toggleMiPlanesMobile = toggleMiPlanesMobile;

  async function cargarMiPlan() {
    const user = window._auth?.currentUser;
    // Actualizar ambos contenedores (desktop dropdown + mobile menu)
    const targets = [
      document.getElementById('miPlanContent'),
      document.getElementById('miPlanContentMobile'),
    ].filter(Boolean);
    if (!targets.length) return;

    const banner = document.getElementById('dashSinPlanBanner');
    const mostrarBanner = (show) => { if (banner) banner.style.display = show ? 'flex' : 'none'; };

    const sinPlanHtml = () =>
      '<div style="color:#888;font-size:13px;">No tienes ningún plan activo.</div>';

    if (!user) {
      targets.forEach(el => el.innerHTML = '<div style="color:#666;font-size:13px;font-style:italic;">Inicia sesión para ver tu plan.</div>');
      mostrarBanner(false);
      return;
    }
    targets.forEach(el => el.innerHTML = '<div style="color:#666;font-size:13px;">Cargando...</div>');
    try {
      const res = await fetch(`${FLOW_WORKER}/mi-plan?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (!data.ok || !data.plan) {
        targets.forEach(el => el.innerHTML = sinPlanHtml());
        mostrarBanner(true);
        return;
      }
      const p = data.plan;
      const activo  = p.activo;
      const color   = activo ? '#2ecc71' : '#e74c3c';
      mostrarBanner(!activo); // mostrar banner si el plan está vencido
      const badge   = activo ? '✅ Activo' : '❌ Vencido';
      const diasTxt = p.diasRestantes !== null
        ? (p.diasRestantes > 0 ? `${p.diasRestantes} días restantes` : 'Vence hoy')
        : '';
      const html = `
        <div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:12px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div style="font-family:'Barlow Condensed',sans-serif;font-size:15px;letter-spacing:1px;color:#fff;">${p.nombre}</div>
            <span style="font-size:11px;color:${color};font-family:'Barlow Condensed';letter-spacing:1px;">${badge}</span>
          </div>
          ${p.vencimiento ? `<div style="font-size:12px;color:#aaa;margin-bottom:4px;">Vence: <strong style="color:#ccc;">${fmtFecha(p.vencimiento)}</strong></div>` : ''}
          ${diasTxt ? `<div style="font-size:12px;color:${p.diasRestantes <= 7 ? '#e67e22' : '#888'};">${diasTxt}</div>` : ''}
          ${activo
            ? `<button onclick="abrirModalCancelar()" style="margin-top:12px;width:100%;background:none;border:1px solid rgba(231,76,60,0.4);color:#e74c3c;font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:7px;border-radius:20px;cursor:pointer;">Cancelar plan</button>`
            : `<button onclick="abrirPlanes();toggleMiCuenta?.();toggleDashMenu?.();" style="margin-top:12px;width:100%;background:#d4a843;color:#000;border:none;font-family:'Barlow Condensed',sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:7px;border-radius:20px;cursor:pointer;">Renovar plan</button>`}
        </div>`;
      targets.forEach(el => el.innerHTML = html);
    } catch(e) {
      targets.forEach(el => el.innerHTML = '<div style="color:#666;font-size:13px;">Error al cargar. Intenta de nuevo.</div>');
    }
  }

  // Modal cancelar plan
  function abrirModalCancelar() {
    const ov = document.getElementById('modalCancelarOverlay');
    if (ov) { ov.style.display = 'flex'; toggleMiCuenta(); }
    const msg = document.getElementById('cancelarMsg');
    const ta  = document.getElementById('cancelarMotivo');
    if (msg) msg.style.display = 'none';
    if (ta)  ta.value = '';
  }
  function cerrarModalCancelar(e) {
    if (e && e.target !== document.getElementById('modalCancelarOverlay')) return;
    const ov = document.getElementById('modalCancelarOverlay');
    if (ov) ov.style.display = 'none';
  }
  async function enviarSolicitudCancelacion() {
    const user    = window._auth?.currentUser;
    const motivo  = document.getElementById('cancelarMotivo')?.value || '';
    const msg     = document.getElementById('cancelarMsg');
    if (!user) { alert('Debes iniciar sesión.'); return; }
    try {
      const res = await fetch(`${FLOW_WORKER}/cancelar-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, nombre: user.displayName || user.email, motivo }),
      });
      const data = await res.json();
      if (data.ok) {
        if (msg) { msg.textContent = '✅ Solicitud enviada. El coach te contactará pronto.'; msg.style.display = 'block'; }
        setTimeout(() => { const ov = document.getElementById('modalCancelarOverlay'); if (ov) ov.style.display = 'none'; }, 3000);
      } else {
        if (msg) { msg.textContent = '❌ Error al enviar. Intenta de nuevo.'; msg.style.color = '#e74c3c'; msg.style.display = 'block'; }
      }
    } catch(e) {
      if (msg) { msg.textContent = '❌ Error de conexión.'; msg.style.color = '#e74c3c'; msg.style.display = 'block'; }
    }
  }

  window.contratarPlan      = contratarPlan;
  window.contratarAsesoria  = contratarAsesoria;
  window.selectResMes       = selectResMes;
  window.toggleMiPerfil     = toggleMiPerfil;
  window.guardarMiPerfil    = guardarMiPerfil;
  window.precargarPesoVelocidad = precargarPesoVelocidad;
  // Abre Mi Perfil siempre (nunca cierra), luego cierra dropdown y menú móvil
  function abrirMiPerfil() {
    const panel = document.getElementById('miPerfilPanel');
    if (panel) panel.style.display = 'block';
    // Esperar a que el menú hamburguesa cierre y el layout se estabilice,
    // luego scrollear el contenedor del dashboard (no la ventana)
    setTimeout(() => {
      const dash = document.getElementById('dashboardAtleta');
      if (dash && panel) {
        const panelTop = panel.getBoundingClientRect().top - dash.getBoundingClientRect().top + dash.scrollTop;
        dash.scrollTo({ top: panelTop - 70, behavior: 'smooth' });
      }
    }, 320);
    // Cerrar dropdown desktop
    const dd = document.getElementById('miCuentaDropdown');
    const ch = document.getElementById('miCuentaChevron');
    if (dd) dd.style.display = 'none';
    if (ch) ch.style.transform = '';
    _miCuentaAbierto = false;
    // Cerrar menú móvil si está abierto
    if (_dashMenuAbierto) toggleDashMenu();
  }

  window.toggleMiCuenta     = toggleMiCuenta;
  window.cargarMiPlan       = cargarMiPlan;
  window.abrirMiPerfil      = abrirMiPerfil;
  window.abrirModalCancelar = abrirModalCancelar;
  window.cerrarModalCancelar= cerrarModalCancelar;
  window.enviarSolicitudCancelacion = enviarSolicitudCancelacion;
  window.toggleDashMenu     = toggleDashMenu;
  window.editRuckSession    = editRuckSession;
  window.deleteRuckSessionAtleta = function(id) {
    if (!confirm('¿Eliminar esta sesión de rucking?')) return;
    const sessions = JSON.parse(localStorage.getItem('ruckSessions')||'[]').filter(s => s.id !== id);
    localStorage.setItem('ruckSessions', JSON.stringify(sessions));
    if (typeof pushRuckingToCloud === 'function') pushRuckingToCloud(sessions);
    if (_ruckEditId === id) { _ruckEditId = null; const f=document.getElementById('ruckAManualForm'); if(f) f.style.display='none'; }
    initRuckingAtleta();
  };
  // Cancelar funciona en ambos modos (agregar y editar)
  window.cancelarEditRuck   = function() {
    _resetRuckForm();
    const form = document.getElementById('ruckAManualForm');
    if (form) form.style.display = 'none';
    const ti = document.getElementById('ruckATime');
    if (ti) { ti.value = ''; ti._digits = ''; }
    const elev = document.getElementById('ruckAElev');
    if (elev) elev.value = '';
    const terr = document.getElementById('ruckATerrain');
    if (terr) terr.value = 'trail';
    const notes = document.getElementById('ruckANotes');
    if (notes) notes.value = '';
  };
  window.addRuckManualSession = addRuckManualSession;


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
