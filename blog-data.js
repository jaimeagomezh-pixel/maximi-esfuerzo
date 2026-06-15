/* ═══════════════════════════════════════════════════════════════
   MÁXIMO ESFUERZO — Blog Data
   Fuente de verdad para todos los artículos del blog.
   Usado por: blog.html (índice) y articulo.html (post completo)
═══════════════════════════════════════════════════════════════ */

const BLOG_DATA = [

  // ────────────────────────────────────────────────────────────
  // FUERZA
  // ────────────────────────────────────────────────────────────
  {
    slug: 'sobrecarga-progresiva',
    category: 'fuerza',
    categoryLabel: 'Fuerza',
    categoryColor: '#00a8b3',
    title: 'Por qué la sobrecarga progresiva es el único principio que necesitas entender',
    excerpt: 'Si solo pudieras aplicar un principio durante un año, este sería. Todo lo demás es derivado.',
    date: '12 May 2025',
    dateISO: '2025-05-12',
    readTime: 5,
    imgLabel: 'FUERZA',
    content: `
      <p>La sobrecarga progresiva es tan simple que la mayoría la ignora. La idea central: para que tu cuerpo se adapte, debe enfrentar un estímulo ligeramente mayor al que ya soporta. Eso es todo.</p>
      <p>No necesitas periodización ondulante, ni ciclos de potencia, ni meses de acumulación. Necesitas una cosa: hacer un poco más la próxima sesión. Más peso, más repeticiones, menos descanso.</p>
      <h3>Por qué falla la mayoría</h3>
      <p>El problema no es falta de esfuerzo. Es falta de registro. El atleta que no anota sus levantamientos no sabe si progresó. Entrena "duro" pero nunca sabe si avanza o simplemente sufre.</p>
      <p>La herramienta es sencilla: un cuaderno, una app, una hoja. Semana a semana, ¿hiciste más? Si la respuesta es sí, estás aplicando sobrecarga progresiva. Si no, estás haciendo cardio con pesas.</p>
      <h3>Cómo aplicarlo en práctica</h3>
      <p>Empieza con un peso que puedas manejar en 3 sets de 8 repeticiones con buena técnica. La siguiente sesión, intenta 9 repeticiones. Cuando llegues a 12, sube el peso 2–5 kg y vuelve a 8. Eso es todo el sistema.</p>
      <p>No es glamoroso. No hay secretos. Hay registros, consistencia y un poco más cada semana. Lo que separa al atleta que progresa del que se estanca no es el programa — es el cuaderno.</p>
    `
  },
  {
    slug: 'trampa-fallo-muscular',
    category: 'fuerza',
    categoryLabel: 'Fuerza',
    categoryColor: '#00a8b3',
    title: 'La trampa del fallo muscular: cuándo entrenar al límite y cuándo no',
    excerpt: 'El fallo no es un indicador de esfuerzo. Es una herramienta — y como toda herramienta, tiene un lugar y un momento.',
    date: '05 May 2025',
    dateISO: '2025-05-05',
    readTime: 6,
    imgLabel: 'FUERZA',
    content: `
      <p>Si entrenas hasta el fallo en cada set, cada sesión, cada semana, no eres disciplinado. Eres ineficiente. El fallo muscular es una herramienta, no un objetivo.</p>
      <h3>Qué pasa cuando llegas al fallo</h3>
      <p>Tu sistema nervioso central se fatiga más que tus músculos. La recuperación se extiende. La técnica se compromete en las últimas repeticiones, donde el riesgo de lesión es mayor. Y el volumen total que puedes acumular en la semana cae.</p>
      <p>Los estudios muestran que entrenar 1–3 repeticiones antes del fallo genera las mismas adaptaciones de hipertrofia que entrenar hasta el fallo, con significativamente menos fatiga acumulada.</p>
      <h3>Cuándo SÍ usar el fallo</h3>
      <p>El fallo tiene lugar en ejercicios de bajo riesgo al final de una sesión: curls, extensiones, cables. No en sentadillas, peso muerto ni press banca cuando estás solo.</p>
      <p>También es útil como diagnóstico puntual: una vez al mes, un set final al fallo para calibrar dónde estás realmente. No como política de entrenamiento cotidiano.</p>
      <h3>La regla práctica</h3>
      <p>Termina tus sets dejando 2–3 repeticiones en el tanque. Entrena más frecuente, acumula más volumen, y progresa más rápido. El fallo es un recurso para ocasiones específicas — no donde vives.</p>
    `
  },
  {
    slug: 'sentadilla-vs-prensa',
    category: 'fuerza',
    categoryLabel: 'Fuerza',
    categoryColor: '#00a8b3',
    title: 'Sentadilla vs prensa: qué elige un atleta funcional',
    excerpt: 'La prensa es más segura, dicen. La sentadilla es mejor, responden otros. La respuesta real depende de lo que quieras lograr.',
    date: '22 Abr 2025',
    dateISO: '2025-04-22',
    readTime: 5,
    imgLabel: 'FUERZA',
    content: `
      <p>La prensa de piernas y la sentadilla no son lo mismo. No son intercambiables. Y la discusión sobre cuál es "mejor" está mal planteada desde el principio.</p>
      <h3>Lo que la prensa hace bien</h3>
      <p>Aisla cuádriceps y glúteos con menor carga espinal. Es útil para acumular volumen en una sesión donde ya hiciste mucho trabajo de espalda. También sirve como ejercicio puente durante recuperación de lesión o cuando la movilidad de cadera limita la sentadilla profunda.</p>
      <h3>Lo que solo la sentadilla puede hacer</h3>
      <p>La sentadilla libre demanda coordinación, propiocepción, control del core y carga axial. Entrena el patrón de movimiento completo — el mismo que usas cuando corres cargado, cuando saltas una valla o cuando sacas a alguien del suelo.</p>
      <p>Para un atleta funcional — especialmente en roles operativos — la sentadilla es irreemplazable. La prensa puede ser un complemento, no un sustituto.</p>
      <h3>La decisión práctica</h3>
      <p>Aprende la sentadilla. Invierte en técnica los primeros 3–6 meses. Luego usa la prensa como suplemento de volumen cuando la necesites. Pero si tuvieras que elegir solo uno, la sentadilla no tiene competencia.</p>
    `
  },
  {
    slug: 'semana-fuerza-turnos',
    category: 'fuerza',
    categoryLabel: 'Fuerza',
    categoryColor: '#00a8b3',
    title: 'Cómo estructurar tu semana de fuerza cuando tienes turnos irregulares',
    excerpt: 'El horario 12×24 o 8×16 no es excusa. Es una restricción. Y como toda restricción, tiene solución.',
    date: '10 Abr 2025',
    dateISO: '2025-04-10',
    readTime: 7,
    imgLabel: 'FUERZA',
    content: `
      <p>Turnos de 12 horas, rotaciones nocturnas, días de guardia — el trabajo operativo rompe cualquier rutina de 5 días a la semana. La solución no es buscar un programa que encaje en tu horario. Es diseñar un sistema que funcione con el caos.</p>
      <h3>El error más común</h3>
      <p>Seguir un programa diseñado para un trabajador de oficina con L-M-X-J-V libre. Cuando tu turno cambia, "saltas" un día. Luego otro. En dos semanas abandonaste sin haber fallado el entrenamiento — fallaste el sistema.</p>
      <h3>El sistema correcto</h3>
      <p>En lugar de anclar sesiones a días de la semana, ancla sesiones a días disponibles. Tu semana de entrenamiento empieza cuando termina tu turno, no el lunes.</p>
      <p><strong>Ejemplo:</strong> Si tienes 3 sesiones disponibles, estructura tu semana de entrenamiento en bloques de "Sesión A → Sesión B → Sesión C → descanso → repetir". No importa si A cae miércoles esta semana y sábado la siguiente.</p>
      <h3>Qué incluir en cada sesión</h3>
      <p>Con solo 3 sesiones semanales, usa movimientos compuestos en cada una. Sentadilla o variante, press o jalón, y un empuje horizontal. 3 ejercicios principales, 4 sets cada uno, 45–60 minutos y saliste.</p>
      <p>Los resultados no vienen de la frecuencia perfecta. Vienen de la consistencia imperfecta durante meses y años.</p>
    `
  },

  // ────────────────────────────────────────────────────────────
  // ENDURANCE
  // ────────────────────────────────────────────────────────────
  {
    slug: 'zonas-entrenamiento',
    category: 'endurance',
    categoryLabel: 'Endurance',
    categoryColor: '#e74c3c',
    title: 'Zonas de entrenamiento: el mapa que la mayoría ignora',
    excerpt: 'Zona 2 no es fácil — es estratégico. Entender el mapa de zonas es la diferencia entre entrenar duro y entrenar bien.',
    date: '08 May 2025',
    dateISO: '2025-05-08',
    readTime: 6,
    imgLabel: 'ENDURANCE',
    content: `
      <p>La mayoría de los atletas principiantes corre en zona 3 todo el tiempo. Demasiado rápido para construir base, demasiado lento para desarrollar capacidad anaeróbica. Es la zona muerta — y ahí pasan meses sin progresar.</p>
      <h3>Las 5 zonas básicas</h3>
      <p><strong>Zona 1 (50–60% FC max):</strong> Recuperación activa. Caminar rápido, trote muy suave.</p>
      <p><strong>Zona 2 (60–70% FC max):</strong> Base aeróbica. Aquí se construyen mitocondrias. Puedes mantener una conversación completa.</p>
      <p><strong>Zona 3 (70–80% FC max):</strong> Zona de confort falso. Incómodo pero sostenible. Útil en dosis pequeñas.</p>
      <p><strong>Zona 4 (80–90% FC max):</strong> Umbral láctico. Series largas, tempo runs. Exige recuperación real.</p>
      <p><strong>Zona 5 (90–100% FC max):</strong> VO2max. Intervalos cortos, máximo esfuerzo. No más del 5% del volumen total.</p>
      <h3>La regla 80/20</h3>
      <p>El 80% de tus kilómetros debería estar en zona 2. El 20% restante en zonas 4–5. La zona 3 es, paradójicamente, la que menos deberías usar.</p>
      <p>Si tu entrenamiento está todo en zona 3, baja el ritmo. Correr lento no es correr mal — es construir la base que te permitirá correr rápido cuando importe.</p>
    `
  },
  {
    slug: 'vam-ftp-test-campo',
    category: 'endurance',
    categoryLabel: 'Endurance',
    categoryColor: '#e74c3c',
    title: 'VAM y FTP: cómo medir tu techo aeróbico sin laboratorio',
    excerpt: 'No necesitas un VO2max en laboratorio para entrenar por zonas. Hay protocolos de campo que funcionan igual de bien.',
    date: '24 Abr 2025',
    dateISO: '2025-04-24',
    readTime: 8,
    imgLabel: 'ENDURANCE',
    content: `
      <p>El VAM (Velocidad Aeróbica Máxima) es la velocidad a la que consumes tu máximo de oxígeno. El FTP (Functional Threshold Power) es la potencia que puedes sostener 1 hora en bici. Ambos te permiten calcular tus zonas de entrenamiento con precisión real.</p>
      <h3>Test de campo VAM (running)</h3>
      <p>Protocolo: 6 minutos al máximo esfuerzo sostenible en pista o superficie plana. La distancia cubierta en metros, dividida por 100, es tu VAM aproximado en km/h.</p>
      <p><strong>Ejemplo:</strong> 1500m en 6 minutos = 15 km/h de VAM. Tus zonas de entrenamiento se calculan como porcentajes de este valor.</p>
      <h3>Test FTP (ciclismo)</h3>
      <p>20 minutos al máximo esfuerzo en rodillo o terreno plano. La potencia promedio en vatios multiplicada por 0.95 es tu FTP estimado. Este valor define tus zonas en potencia.</p>
      <h3>Cómo usar estos datos</h3>
      <p>Una vez tienes VAM o FTP, configúralos en el módulo de Endurance de la app. El sistema calculará tus zonas automáticamente y las cruzará con tus actividades de Strava.</p>
      <p>Repite el test cada 6–8 semanas. Si tu VAM subió, el plan funcionó. Si no cambió, algo en la distribución de carga necesita revisión.</p>
    `
  },
  {
    slug: 'regla-80-20',
    category: 'endurance',
    categoryLabel: 'Endurance',
    categoryColor: '#e74c3c',
    title: 'Por qué el 80% de tu entrenamiento debe ser lento',
    excerpt: 'El atleta que siempre corre "a medio gas" no descansa ni mejora. La polarización te saca de esa trampa.',
    date: '18 Abr 2025',
    dateISO: '2025-04-18',
    readTime: 5,
    imgLabel: 'ENDURANCE',
    content: `
      <p>El modelo de entrenamiento polarizado dice algo contraintuitivo: el 80% de tu volumen debería estar a baja intensidad (zona 1–2), y el 20% restante a alta intensidad (zona 4–5). La zona media — donde crees que estás "entrenando" — debe ser mínima.</p>
      <h3>Por qué funciona</h3>
      <p>El volumen en zona 2 construye la base mitocondrial. El trabajo en zona 4–5 empuja los topes de potencia y tolerancia al lactato. La zona 3, en cambio, es suficientemente intensa para causar fatiga pero no lo suficiente para generar adaptaciones de alta calidad. Es el peor de los mundos.</p>
      <h3>El error del "ritmo de confort"</h3>
      <p>La mayoría de atletas amateurs entrena en zona 3 porque se siente como esfuerzo real. El problema es que acumula fatiga sin generar las adaptaciones específicas de ninguna de las otras zonas. Estás sufriendo sin propósito.</p>
      <h3>Cómo aplicarlo</h3>
      <p>Calcula tu zona 2 (60–70% FC max). Usa un reloj con monitor cardíaco. Si superas la zona 2 en un trote "fácil", baja el ritmo aunque te parezca ridículo lento.</p>
      <p>En 8–12 semanas, ese mismo ritmo cardíaco te llevará significativamente más rápido. La base se construye de esta forma — sin apuro, sin ego.</p>
    `
  },
  {
    slug: 'interpretar-strava',
    category: 'endurance',
    categoryLabel: 'Endurance',
    categoryColor: '#e74c3c',
    title: 'Cómo interpretar tus datos de Strava para progresar de verdad',
    excerpt: 'Strava muestra muchos números. Saber cuáles importan — y cuáles ignorar — marca la diferencia.',
    date: '03 Abr 2025',
    dateISO: '2025-04-03',
    readTime: 6,
    imgLabel: 'ENDURANCE',
    content: `
      <p>Strava genera docenas de métricas por actividad. La mayoría son ruido. Hay cuatro que realmente importan para el atleta que quiere progresar.</p>
      <h3>Las 4 métricas que importan</h3>
      <p><strong>1. Distribución por zona de FC:</strong> No el ritmo total, sino cuánto tiempo pasaste en cada zona. Esto te dice si el entrenamiento fue lo que planeaste o simplemente lo que "se sintió bien".</p>
      <p><strong>2. Suffer Score relativo:</strong> No para presumirlo — para compararlo entre sesiones similares. Si hiciste la misma ruta y el Suffer Score fue más bajo con mismo esfuerzo, mejoraste.</p>
      <p><strong>3. Carga de entrenamiento semanal (Training Load):</strong> La tendencia importa más que el número individual. Una carga creciente pero controlada durante 3–4 semanas, seguida de una semana de reducción, es el ciclo correcto.</p>
      <p><strong>4. Tiempo en zona 2 vs zona 3+:</strong> Si más del 50% de tu tiempo está en zona 3 o superior en tus sesiones "fáciles", tu base aeróbica no está creciendo como podría.</p>
      <h3>Lo que puedes ignorar</h3>
      <p>PR de segmento, KOM, comparaciones con amigos. Son métricas de competición, no de entrenamiento. Úsalas para motivarte, no para dirigir tu plan de carga.</p>
    `
  },

  // ────────────────────────────────────────────────────────────
  // NUTRICIÓN
  // ────────────────────────────────────────────────────────────
  {
    slug: 'rastrear-macros',
    category: 'nutricion',
    categoryLabel: 'Nutrición',
    categoryColor: '#3dba7c',
    title: 'Cómo rastrear macros sin que te consuma 2 horas al día',
    excerpt: 'El seguimiento perfecto que no haces vale menos que el seguimiento imperfecto que sí haces.',
    date: '28 Abr 2025',
    dateISO: '2025-04-28',
    readTime: 7,
    imgLabel: 'NUTRICIÓN',
    content: `
      <p>Rastrear macros tiene fama de ser tedioso y obsesivo. Puede serlo — si lo haces mal. Pero hay un sistema mínimo que funciona sin consumirte el día.</p>
      <h3>El método de 3 pasos</h3>
      <p><strong>Paso 1 — Fija tus objetivos una vez:</strong> Usa tu peso corporal como base. 1.8–2.2g de proteína por kg de peso. Carbohidratos según tu nivel de actividad (4–6g/kg para alta intensidad, 2–3g/kg para días de descanso). Grasas: el resto de las calorías.</p>
      <p><strong>Paso 2 — Cocina con repeats:</strong> No planifiques 21 comidas distintas a la semana. Diseña 5–7 comidas que te gusten, que sean fáciles de preparar, y rota entre ellas. Construyes tu base de datos una vez, luego solo registras.</p>
      <p><strong>Paso 3 — Registra con palma, no con balanza:</strong> Palma de mano = ~30g proteína cocida. Puño cerrado = 1 porción de carbohidratos. Pulgar = grasa. Impreciso al 10%, perfecto para el 90% de los días.</p>
      <h3>La trampa a evitar</h3>
      <p>No entres en un loop de precisión obsesiva. El objetivo es el 90% de las calorías correctas el 90% de los días. No 100% perfecto el 60% del tiempo.</p>
    `
  },
  {
    slug: 'proteina-carga-entreno',
    category: 'nutricion',
    categoryLabel: 'Nutrición',
    categoryColor: '#3dba7c',
    title: 'Proteína: cuánta necesitas según tu carga de entrenamiento',
    excerpt: 'La respuesta no es "lo más posible". Hay un umbral óptimo — y pasarlo no añade nada.',
    date: '20 Abr 2025',
    dateISO: '2025-04-20',
    readTime: 5,
    imgLabel: 'NUTRICIÓN',
    content: `
      <p>El consenso científico actual sitúa la proteína óptima para adaptación muscular entre 1.6 y 2.2 gramos por kilogramo de peso corporal al día. Más allá de 2.2g/kg no agrega beneficio medible en la mayoría de los contextos.</p>
      <h3>Ajuste por carga de entrenamiento</h3>
      <p><strong>Días de descanso o carga baja:</strong> 1.6g/kg es suficiente. El músculo se repara con el estímulo mínimo necesario.</p>
      <p><strong>Días de entrenamiento de fuerza:</strong> 1.8–2.0g/kg. El daño muscular es mayor y la síntesis proteica está elevada hasta 48h post-sesión.</p>
      <p><strong>Períodos de déficit calórico o alta carga combinada:</strong> Sube a 2.0–2.2g/kg. La proteína protege masa muscular cuando estás en déficit energético.</p>
      <h3>La distribución importa tanto como la cantidad</h3>
      <p>La síntesis proteica se maximiza con dosis de 30–40g cada 3–4 horas. No sirve consumir 200g en dos comidas. Distribuye en 4–5 momentos del día y maximizas la absorción real.</p>
      <p>Las fuentes: pollo, huevos, atún, carne magra, whey, caseína. No hay magia — solo cantidad y consistencia diaria.</p>
    `
  },
  {
    slug: 'nutricion-pre-post',
    category: 'nutricion',
    categoryLabel: 'Nutrición',
    categoryColor: '#3dba7c',
    title: 'Qué comer antes y después de la sesión: la guía sin mitos',
    excerpt: 'La "ventana anabólica" de 30 minutos no existe como la pintan. Pero el timing sí importa — con matices.',
    date: '12 Abr 2025',
    dateISO: '2025-04-12',
    readTime: 6,
    imgLabel: 'NUTRICIÓN',
    content: `
      <p>Durante años circuló el mito de la "ventana anabólica": tienes 30 minutos post-entrenamiento para consumir proteína o "pierdes" el músculo. La realidad es más tranquilizadora — y más práctica.</p>
      <h3>Pre-entrenamiento: combustible, no ritual</h3>
      <p>Entrena 1.5–3 horas después de tu última comida. Incluye carbohidratos de digestión media (avena, arroz, pan integral) y proteína. Evita grasas en exceso — ralentizan el vaciado gástrico y generan pesadez durante el ejercicio.</p>
      <p>Si entrenas en ayunas (guardia nocturna, 5am), un batido proteico 30 minutos antes protege la masa muscular sin cargarte el estómago.</p>
      <h3>Post-entrenamiento: recuperación, no urgencia</h3>
      <p>La ventana de recuperación real dura 2–4 horas, no 30 minutos. Lo importante es que dentro de ese período consumas proteína (30–40g) y carbohidratos para reponer glucógeno muscular.</p>
      <p>Prioridad: proteína primero, carbohidratos segundo, hidratación siempre.</p>
      <h3>La regla simple</h3>
      <p>Come bien antes, come bien después. El timing exacto importa menos que la calidad total de tu dieta durante el día. Nutrición diaria sólida y timing imperfecto > timing perfecto y nutrición deficiente.</p>
    `
  },
  {
    slug: 'suplementos-reales',
    category: 'nutricion',
    categoryLabel: 'Nutrición',
    categoryColor: '#3dba7c',
    title: 'Suplementos que funcionan (y los que solo llenan el bolsillo del vendedor)',
    excerpt: 'De las miles de opciones en el mercado, menos de 10 tienen evidencia sólida. Aquí están.',
    date: '01 Abr 2025',
    dateISO: '2025-04-01',
    readTime: 8,
    imgLabel: 'NUTRICIÓN',
    content: `
      <p>La industria de suplementos mueve miles de millones vendiendo esperanza disfrazada de ciencia. Pero hay un grupo reducido con evidencia sólida y efecto medible en rendimiento real.</p>
      <h3>Los que funcionan</h3>
      <p><strong>Creatina monohidratada:</strong> El suplemento más estudiado del mundo. 3–5g al día. Aumenta la potencia en esfuerzos explosivos y acelera la recuperación. Sin carga, sin ciclos, sin marca específica necesaria.</p>
      <p><strong>Proteína en polvo (whey o caseína):</strong> No es magia — es comida en formato conveniente. Si tu ingesta proteica diaria está por debajo de 1.6g/kg, esto la sube. Si ya comes bien, el polvo es opcional.</p>
      <p><strong>Cafeína:</strong> 3–6mg/kg, 45–60 minutos pre-entrenamiento. Mejora rendimiento tanto en fuerza como en resistencia. El café funciona exactamente igual que la pastilla.</p>
      <p><strong>Vitamina D3:</strong> Si vives en latitud media-alta o no recibes sol directo 20+ minutos al día, 2000–4000 UI diarias. Impacta testosterona, sistema inmune y recuperación nocturna.</p>
      <h3>Los que no funcionan (y están en todos lados)</h3>
      <p>BCAAs si ya comes suficiente proteína, óxido nítrico pre-workout, testosterona natural de origen vegetal, quemadores de grasa termogénicos, colágeno para ganancia muscular. Son dinero que puedes invertir mejor en comida real de calidad.</p>
    `
  },

  // ────────────────────────────────────────────────────────────
  // MENTALIDAD
  // ────────────────────────────────────────────────────────────
  {
    slug: 'servicio-consistencia',
    category: 'mentalidad',
    categoryLabel: 'Mentalidad',
    categoryColor: '#9b8ea0',
    title: 'Lo que 10 años de servicio me enseñaron sobre la consistencia',
    excerpt: 'No es inspiración. Es protocolo. Así funciona la disciplina cuando la motivación falla.',
    date: '02 Abr 2025',
    dateISO: '2025-04-02',
    readTime: 8,
    imgLabel: 'MENTE',
    content: `
      <p>La motivación es un recurso finito. Se agota. El día que no dormiste bien, que la guardia fue larga, que el mundo no cooperó — ese día, la motivación no aparece. Y sin embargo, hay que entrenar.</p>
      <h3>La diferencia entre motivación y protocolo</h3>
      <p>Un soldado no decide cada mañana si va a formar. Forma porque es lo que toca. No porque quiera, sino porque el sistema lo requiere. El atletismo de alto rendimiento opera exactamente igual.</p>
      <p>El protocolo dice: 6am, 45 minutos, los ejercicios están escritos. No hay negociación mental. No hay debate interno. Hay ejecución.</p>
      <h3>Cómo construir tu protocolo personal</h3>
      <p>Primero, fija un horario que no dependa del humor. El mejor horario de entrenamiento es el que puedes cumplir el 90% de las semanas, no el que es "ideal" el 50%.</p>
      <p>Segundo, reduce las decisiones. El programa está escrito antes de llegar al gym. La ropa está preparada la noche anterior. El bolso está en la puerta.</p>
      <p>Tercero, acepta el entrenamiento de baja calidad. Algunos días saldrás sin haber dado el 100%. Ese entrenamiento también cuenta. Aparecer sin ganas es mejor que no aparecer.</p>
      <h3>El compuesto del tiempo</h3>
      <p>La consistencia durante un año supera cualquier protocolo perfecto seguido durante 3 meses. No necesitas el programa ideal. Necesitas el programa que vas a hacer.</p>
    `
  },
  {
    slug: 'gestionar-mal-dia',
    category: 'mentalidad',
    categoryLabel: 'Mentalidad',
    categoryColor: '#9b8ea0',
    title: 'El atleta que no se rinde: cómo gestionar el mal día sin perder el hilo',
    excerpt: 'El mal entrenamiento no es el problema. Lo que haces después de él sí puede serlo.',
    date: '18 Mar 2025',
    dateISO: '2025-03-18',
    readTime: 6,
    imgLabel: 'MENTE',
    content: `
      <p>Habrá sesiones donde no llegarás al 60% de tu nivel habitual. Donde el peso se siente el doble. Donde la cabeza no está. Eso no es un fracaso — es biología normal.</p>
      <h3>Por qué ocurren los días malos</h3>
      <p>Sueño insuficiente, estrés acumulado, déficit calórico no intencional, carga acumulada de semanas anteriores, variabilidad normal del rendimiento. La mayoría de las veces no es algo que hiciste mal — es el sistema nervioso diciéndote que necesita tiempo.</p>
      <h3>La respuesta correcta</h3>
      <p>No abandonar. No sobrecompensar al día siguiente. Completar la sesión al nivel que sea posible, registrar lo que pasó, y seguir la próxima sesión como si el mal día no hubiera ocurrido.</p>
      <p>El atleta que cataloga cada mala sesión como señal de que "el programa no funciona" o "no estoy hecho para esto" crea un patrón de abandono. El atleta que lo trata como ruido estadístico y sigue acumula años de progreso real.</p>
      <h3>Cuándo SÍ detenerse</h3>
      <p>Si el bajo rendimiento dura más de una semana y va acompañado de irritabilidad, sueño perturbado y aversión al entrenamiento que antes disfrutabas, es señal de sobreentrenamiento real. Ahí la respuesta correcta es reducir carga — no empujar más fuerte.</p>
    `
  },
  {
    slug: 'recuperacion-mental',
    category: 'mentalidad',
    categoryLabel: 'Mentalidad',
    categoryColor: '#9b8ea0',
    title: 'Protocolo de recuperación mental: por qué el descanso también se entrena',
    excerpt: 'El músculo crece mientras duermes. La mente también se recalibra — pero solo si lo permites.',
    date: '05 Mar 2025',
    dateISO: '2025-03-05',
    readTime: 7,
    imgLabel: 'MENTE',
    content: `
      <p>La industria del fitness glorifica el esfuerzo constante. Los descansos se ven como debilidad, las semanas de descarga como perder terreno. Esta narrativa es equivocada y tiene un costo real en el largo plazo.</p>
      <h3>Lo que pasa mientras descansas</h3>
      <p>La síntesis proteica se dispara en las primeras 24–48h post-entrenamiento. El sistema nervioso central se recupera de la fatiga acumulada. Los niveles de cortisol bajan. Las adaptaciones — fisiológicas y neurales — se consolidan.</p>
      <p>No descansas a pesar del progreso. Progresas gracias al descanso.</p>
      <h3>Herramientas de recuperación mental</h3>
      <p><strong>Sueño:</strong> 7–9 horas es el rango óptimo para la mayoría. Menos de 6 horas deteriora la fuerza, el tiempo de reacción y la regulación del apetito. No hay suplemento que compense el déficit de sueño crónico.</p>
      <p><strong>Respiración:</strong> 5 minutos de respiración lenta (4s inhala, 6s exhala) activan el sistema parasimpático. Útil post-turno y pre-sueño.</p>
      <p><strong>Desconexión deliberada:</strong> Un día a la semana completamente libre de entrenamiento y de métricas. Sin Strava, sin registros, sin pensar en el próximo mesociclo.</p>
      <h3>La semana de descarga</h3>
      <p>Cada 4–6 semanas, reduce el volumen al 50–60% pero mantén la intensidad. Esto no es perder forma — es la inversión que te permite progresar las siguientes semanas sin acumular fatiga crónica que te frene.</p>
    `
  },

  // ────────────────────────────────────────────────────────────
  // RUCKING
  // ────────────────────────────────────────────────────────────
  {
    slug: 'rucking-101',
    category: 'rucking',
    categoryLabel: 'Rucking',
    categoryColor: '#a07840',
    title: 'Rucking 101: cómo empezar si nunca has cargado peso caminando',
    excerpt: 'El rucking es uno de los entrenamientos más efectivos y subestimados. Este es el punto de entrada correcto.',
    date: '29 Abr 2025',
    dateISO: '2025-04-29',
    readTime: 6,
    imgLabel: 'RUCKING',
    content: `
      <p>Rucking es marchar con una mochila cargada. Viene del entrenamiento militar — los soldados cargan peso durante largas distancias para construir capacidad aeróbica, fuerza funcional y resiliencia mental. Es efectivo, accesible y no requiere equipamiento especializado.</p>
      <h3>Por qué funciona</h3>
      <p>El rucking quema aproximadamente el doble de calorías que caminar a la misma velocidad. Carga la columna lumbar, los glúteos y el tríceps sural sin el impacto de la carrera. Es ideal como complemento de bajo impacto para runners o como base aeróbica principal para quienes no pueden correr.</p>
      <h3>Cómo empezar</h3>
      <p><strong>Semana 1–2:</strong> 15–20 minutos, 5–8 kg en mochila, superficie plana. El peso va en la parte alta de la espalda, no colgando en la cintura.</p>
      <p><strong>Semana 3–4:</strong> 30 minutos, mismo peso. Agrega desnivel gradualmente si el terreno lo permite.</p>
      <p><strong>Mes 2:</strong> 45–60 minutos, 10–15 kg según tu peso corporal (no más del 20% de tu peso total).</p>
      <h3>Los errores a evitar</h3>
      <p>Poner el peso demasiado bajo en la mochila (genera tensión cervical). Agregar peso demasiado rápido. Usar calzado de running (necesitas mayor soporte lateral para cargas altas). Inclinarte hacia adelante — mantén espalda recta, hombros hacia atrás.</p>
    `
  },
  {
    slug: 'error-rucking',
    category: 'rucking',
    categoryLabel: 'Rucking',
    categoryColor: '#a07840',
    title: 'El error que comete el 90% en rucking: cargar demasiado demasiado pronto',
    excerpt: 'Más peso no siempre es mejor. La progresión en rucking sigue reglas específicas que la mayoría ignora.',
    date: '15 Abr 2025',
    dateISO: '2025-04-15',
    readTime: 5,
    imgLabel: 'RUCKING',
    content: `
      <p>El rucking atrae a personas con mentalidad de alta exigencia. Y esa misma mentalidad puede convertirse en el principal obstáculo: sobrecargar demasiado pronto, lesionarse, y abandonar antes de ver resultados.</p>
      <h3>La regla del 20%</h3>
      <p>El peso en la mochila nunca debería superar el 20–25% de tu peso corporal en entrenamientos regulares. Para un atleta de 80 kg, eso es 16–20 kg máximo. Y no en la primera semana.</p>
      <p>La columna, los hombros y las rodillas se adaptan más lento que los músculos. Puedes sentirte cómodo con un peso que ya está generando microlesiones de manera acumulativa.</p>
      <h3>Señales de sobrecarga temprana</h3>
      <p>Dolor en hombros durante o después de la sesión (no fatiga muscular — dolor articular). Cambio de postura durante la marcha (inclinación lateral o hacia adelante). Dolor lumbar que no mejora con el descanso. Dolor en rodillas en bajadas.</p>
      <h3>La progresión correcta</h3>
      <p>Aumenta el peso máximo un 5–10% por semana. Antes de aumentar el peso, aumenta la duración con el mismo peso. Aumenta el desnivel antes que el peso.</p>
      <p>El rucking es un deporte de acumulación de años. El volumen sostenido con buena postura produce los resultados que semanas de sobrecarga nunca pueden lograr.</p>
    `
  },
  {
    slug: 'rucking-y-running',
    category: 'rucking',
    categoryLabel: 'Rucking',
    categoryColor: '#a07840',
    title: 'Rucking y running: cómo combinarlos sin destruir tus rodillas',
    excerpt: 'Ambos son movimientos de resistencia, pero las demandas sobre el cuerpo son distintas. Combinarlos requiere estructura.',
    date: '28 Mar 2025',
    dateISO: '2025-03-28',
    readTime: 7,
    imgLabel: 'RUCKING',
    content: `
      <p>El rucking y el running comparten el sistema aeróbico pero difieren en impacto, velocidad y carga mecánica. Combinados con estructura se potencian. Combinados sin criterio acumulan sobrecarga en rodillas y caderas.</p>
      <h3>Cómo se complementan</h3>
      <p>El rucking trabaja fuerza de resistencia, erguimiento postural y cadena posterior a baja velocidad. El running desarrolla economía de carrera, tolerancia al impacto y capacidad anaeróbica a velocidades más altas.</p>
      <p>El rucking puede reemplazar el trote de zona 2 (misma intensidad cardíaca con mayor trabajo muscular) o servir como sesión de recuperación activa post-running.</p>
      <h3>Reglas de combinación</h3>
      <p><strong>No hagas rucking el día anterior a una sesión de running de calidad</strong> (series, tempo). La fatiga muscular acumulada afectará la técnica de carrera y el rendimiento.</p>
      <p><strong>Separa el rucking del running de alta intensidad por al menos 48 horas</strong> si son sesiones largas (60+ min de rucking).</p>
      <p><strong>En semana de descarga:</strong> Prefiere rucking suave sobre running — menos impacto articular para el mismo estímulo cardíaco.</p>
      <h3>Un ejemplo de semana mixta</h3>
      <p>Lunes: Running series zona 4. Martes: Fuerza. Miércoles: Rucking 45 min zona 2. Jueves: Descanso o movilidad. Viernes: Running largo zona 2. Sábado: Rucking 60 min. Domingo: Descanso total.</p>
    `
  }

];
