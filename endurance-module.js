/**
 * ════════════════════════════════════════════════════════════════════════════
 *  MÓDULO DE ENDURANCE — MáximoEsfuerzo.cl
 * ────────────────────────────────────────────────────────────────────────────
 *  Metodología "Endurance Tool" (tests de campo) + estrés rTSS.
 *
 *  Función 1 · calcularPerfilEndurance()  → umbrales estáticos (VAM, FTP)
 *  Función 2 · calcularFatigaDiaria()     → carga diaria (IF, rTSS) desde Strava
 *
 *  JS puro (ES module): la Fn1 corre en el panel del atleta (scripts.js) y la
 *  Fn2 en el Cloudflare Worker que recibe el webhook de Strava.
 * ════════════════════════════════════════════════════════════════════════════
 */

// ── Constantes ──────────────────────────────────────────────────────────────
const SEG_TEST_VAM = 300;   // 5 min en segundos
const SEG_TEST_FTP = 1200;  // 20 min en segundos
const UMBRAL_RETEST_IF = 1.05; // IF por encima del cual el FTP se asume subestimado

// Multiplicador de FTP (recalibración de zonas desde el perfil del atleta).
// 1.00 = FTP es el ritmo crudo de 20 min (por defecto).
// 0.95 = convención Coggan; el coach lo baja si el atleta "se quema" en rodajes.
const FTP_MULT_DEFAULT = 1.00;
const FTP_MULT_MIN = 0.80;  // límites de seguridad para no distorsionar las zonas
const FTP_MULT_MAX = 1.10;

// ════════════════════════════════════════════════════════════════════════════
//  HELPER · m/s → ritmo "MM:SS min/km"
// ════════════════════════════════════════════════════════════════════════════
/**
 * Convierte una velocidad en m/s a ritmo de carrera "MM:SS min/km".
 * Ritmo (min/km) = 1000 / (velocidad_ms * 60)
 *
 * @param {number} velocidadMs - Velocidad en metros por segundo (> 0).
 * @returns {string} Ritmo formateado, p. ej. "3:20 min/km". Si la velocidad
 *                   no es válida (<= 0 o NaN) devuelve "--:-- min/km".
 */
export function msARitmo(velocidadMs) {
  if (!Number.isFinite(velocidadMs) || velocidadMs <= 0) return '--:-- min/km';

  const ritmoDecimal = 1000 / (velocidadMs * 60); // minutos por km (decimal)
  let minutos = Math.floor(ritmoDecimal);
  let segundos = Math.round((ritmoDecimal - minutos) * 60);

  // Corrección de redondeo: 60 segundos → +1 minuto
  if (segundos === 60) { minutos += 1; segundos = 0; }

  return `${minutos}:${String(segundos).padStart(2, '0')} min/km`;
}

// ════════════════════════════════════════════════════════════════════════════
//  FUNCIÓN 1 · CALCULADORA DE PERFIL DEL ATLETA (EVALUACIONES DE CAMPO)
// ════════════════════════════════════════════════════════════════════════════
/**
 * @typedef {Object} UmbralEndurance
 * @property {number} ms    - Velocidad en m/s (cruda, 3 decimales).
 * @property {string} pace  - Ritmo formateado "MM:SS min/km".
 */

/**
 * @typedef {Object} UmbralFTP
 * @property {number} ms          - FTP final en m/s (ya con el multiplicador aplicado).
 * @property {string} pace        - Ritmo FTP formateado "MM:SS min/km".
 * @property {number} multiplier  - Multiplicador aplicado (p. ej. 1.00 o 0.95).
 * @property {number} raw20minMs  - Ritmo crudo del test de 20 min, sin ajustar (m/s).
 */

/**
 * @typedef {Object} PerfilEndurance
 * @property {boolean} ok
 * @property {UmbralEndurance} [vam] - Velocidad Aeróbica Máxima (test 5 min).
 * @property {UmbralFTP} [ftp]       - Functional Threshold Pace (test 20 min, ajustado).
 * @property {string} [error]
 */

/**
 * Calcula los umbrales estáticos del atleta a partir de dos tests máximos
 * de campo (5 min y 20 min). El test de 20 min debe realizarse en TERRENO PLANO
 * para que el FTP sea comparable con el GAP (velocidad ajustada) de Strava.
 *
 *   VAM (m/s) = distancia_5_minutos  / 300
 *   FTP (m/s) = (distancia_20_minutos / 1200) * multiplicador
 *
 * El multiplicador vive en el perfil del atleta:
 *   • 1.00 (por defecto) → FTP = ritmo promedio puro de 20 min.
 *   • 0.95 → recalibración hacia abajo cuando el atleta se "quema" en rodajes
 *            largos; el coach lo edita y todas las zonas se recalculan solas.
 *
 * @param {number} distancia5Minutos  - Metros recorridos en test máximo de 5 min.
 * @param {number} distancia20Minutos - Metros recorridos en test máximo de 20 min.
 * @param {number} [ftpMultiplier=1.0] - Multiplicador de FTP del perfil (0.80–1.10).
 * @returns {PerfilEndurance}
 */
export function calcularPerfilEndurance(distancia5Minutos, distancia20Minutos, ftpMultiplier = FTP_MULT_DEFAULT) {
  try {
    const d5  = Number(distancia5Minutos);
    const d20 = Number(distancia20Minutos);

    const tiene5  = Number.isFinite(d5)  && d5  > 0;  // test 5 min → VAM
    const tiene20 = Number.isFinite(d20) && d20 > 0;  // test 20 min → FTP

    // Cada test es independiente; basta con uno. La VAM (5 min) alimenta las
    // zonas; el FTP (20 min) es opcional y solo se usa para el rTSS.
    if (!tiene5 && !tiene20) {
      throw new Error('Ingresa al menos el test de 5 min (VAM) o el de 20 min (FTP).');
    }

    // Multiplicador: fallback seguro a 1.00 si es inválido, y clamp a rango sensato
    let mult = Number(ftpMultiplier);
    if (!Number.isFinite(mult) || mult <= 0) mult = FTP_MULT_DEFAULT;
    if (mult < FTP_MULT_MIN) mult = FTP_MULT_MIN;
    if (mult > FTP_MULT_MAX) mult = FTP_MULT_MAX;

    const result = { ok: true };

    if (tiene5) {
      const vamMs = d5 / SEG_TEST_VAM; // m/s
      result.vam = { ms: Number(vamMs.toFixed(3)), pace: msARitmo(vamMs) };
    }

    if (tiene20) {
      const ftpRawMs   = d20 / SEG_TEST_FTP;  // ritmo crudo de 20 min (m/s)
      const ftpFinalMs = ftpRawMs * mult;     // FTP ajustado por multiplicador
      result.ftp = {
        ms: Number(ftpFinalMs.toFixed(3)),
        pace: msARitmo(ftpFinalMs),
        multiplier: Number(mult.toFixed(3)),
        raw20minMs: Number(ftpRawMs.toFixed(3)),
      };
    }

    return result;
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  FUNCIÓN 2 · MOTOR DE FATIGA DIARIA (rTSS desde webhook de Strava)
// ════════════════════════════════════════════════════════════════════════════
/**
 * @typedef {Object} FatigaDiaria
 * @property {boolean} ok
 * @property {number} [if]       - Factor de Intensidad (2 decimales).
 * @property {number} [rTSS]     - Running Training Stress Score (entero).
 * @property {string[]} [warnings]
 * @property {string} [error]
 */

/**
 * Calcula la carga de estrés de un entrenamiento diario (rTSS) a partir de los
 * datos que entrega el webhook de Strava.
 *
 *   IF   = gap_ms / ftp_atleta
 *   rTSS = (moving_time * IF² / 3600) * 100
 *
 * El GAP (Grade Adjusted Pace) de Strava ya neutraliza el desnivel, por eso se
 * usa como proxy del Ritmo Normalizado para el cálculo del estrés.
 *
 * @param {number} ftpAtleta  - FTP en m/s guardado en la BD (de la Función 1, > 0).
 * @param {number} movingTime - Segundos netos en movimiento de la actividad.
 * @param {number} gapMs      - average_grade_adjusted_speed de Strava, en m/s.
 * @returns {FatigaDiaria}
 */
export function calcularFatigaDiaria(ftpAtleta, movingTime, gapMs) {
  try {
    const ftp = Number(ftpAtleta);
    const t   = Number(movingTime);
    const gap = Number(gapMs);

    if (!Number.isFinite(ftp) || ftp <= 0) {
      throw new Error('FTP del atleta inválido: debe ser un número mayor a 0.');
    }
    if (!Number.isFinite(t) || t <= 0) {
      throw new Error('moving_time inválido: debe ser un número mayor a 0.');
    }
    if (!Number.isFinite(gap) || gap < 0) {
      throw new Error('gap_ms inválido: debe ser un número >= 0.');
    }

    const intensityFactor = gap / ftp;                          // IF
    const rTSS = (t * Math.pow(intensityFactor, 2) / 3600) * 100; // estrés

    const warnings = [];
    if (intensityFactor > UMBRAL_RETEST_IF) {
      warnings.push(
        'IF > 1.05: el atleta sostuvo un ritmo por encima de su umbral actual. ' +
        'Su FTP probablemente está subestimado — se recomienda re-test de 20 min.'
      );
    }

    return {
      ok: true,
      if: Number(intensityFactor.toFixed(2)),
      rTSS: Math.round(rTSS),
      warnings,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  FUNCIÓN 3 · COSTO METABÓLICO DE MARCHA CON CARGA — PANDOLF et al. (1977)
// ════════════════════════════════════════════════════════════════════════════
// Multiplicador de Estrés Operativo y umbrales de carga (% del peso corporal)
// según la etiqueta del perfil del atleta.
export const MO_FACTOR        = 1.25;  // estrés operativo cuando se supera el umbral
export const UMBRAL_CARGA_CIVIL   = 0.30;  // Civil/Fitness: MO si lastre > 30% del peso
export const UMBRAL_CARGA_MILITAR = 0.45;  // Militar/Táctico: MO si lastre > 45% del peso

// Coeficientes de terreno η de Pandolf (resistencia del suelo al desplazamiento).
export const ETA_TERRENO = { asfalto: 1.0, tierra: 1.1, trail: 1.2, arena: 2.1 };

/**
 * Costo metabólico de caminar/marchar con carga — ecuación de Pandolf (1977):
 *
 *   M = 1.5·W + 2.0·(W+L)·(L/W)² + η·(W+L)·(1.5·V² + 0.35·V·G)
 *
 * @param {Object} p
 * @param {number} p.bodyKg       - Peso corporal W (kg, > 0).
 * @param {number} [p.loadKg=0]   - Carga externa L (kg, lastre).
 * @param {number} p.speedMs      - Velocidad de marcha V (m/s, >= 0).
 * @param {number} [p.gradePct=0] - Pendiente media G (%, >= 0).
 * @param {number} [p.terrainEta=1.0] - Coeficiente de terreno η.
 * @returns {{ok:boolean, watts?:number, error?:string}} M en Watts.
 */
export function calcularPandolfWatts({ bodyKg, loadKg = 0, speedMs, gradePct = 0, terrainEta = 1.0 }) {
  const W = Number(bodyKg);
  const V = Number(speedMs);
  if (!Number.isFinite(W) || W <= 0) return { ok: false, error: 'peso corporal inválido' };
  if (!Number.isFinite(V) || V < 0)  return { ok: false, error: 'velocidad inválida' };

  const L   = (Number.isFinite(Number(loadKg))   && loadKg   > 0) ? Number(loadKg)   : 0;
  const G   =  Number.isFinite(Number(gradePct))                  ? Number(gradePct) : 0;
  const eta = (Number.isFinite(Number(terrainEta)) && terrainEta > 0) ? Number(terrainEta) : 1.0;

  const term1 = 1.5 * W;                                       // mantener el cuerpo en pie
  const term2 = 2.0 * (W + L) * Math.pow(L / W, 2);            // sobrecosto de portar el lastre
  const term3 = eta * (W + L) * (1.5 * V * V + 0.35 * V * G);  // desplazamiento + terreno + pendiente
  const M = term1 + term2 + term3;

  return { ok: true, watts: Number(M.toFixed(1)) };
}

// ════════════════════════════════════════════════════════════════════════════
//  FUNCIÓN 4 · rkTSS — ÍNDICE DE ESTRÉS PROPIETARIO PARA RUCKING
// ════════════════════════════════════════════════════════════════════════════
/**
 * Calcula el rkTSS de una sesión de marcha con peso.
 *
 *   IF_metab = M_sesión / M_umbral
 *      M_sesión = Pandolf con carga, terreno y desnivel reales de la sesión
 *      M_umbral = Pandolf SIN carga, terreno llano (η=1.0), al ritmo FTP del atleta
 *                 → costo metabólico de locomoción en umbral (análogo al FTP de Coggan)
 *   MO = 1.25  si  (L/W) supera el umbral del perfil (30% civil · 45% militar); si no 1.0
 *   rkTSS = (tiempo_s · IF_metab² / 3600) · 100 · MO
 *
 * @param {Object} p
 * @param {number} p.bodyKg        - Peso corporal (kg, > 0).
 * @param {number} p.loadKg        - Lastre (kg).
 * @param {number} p.distM         - Distancia (m, > 0).
 * @param {number} [p.elevM=0]     - Desnivel positivo acumulado (m).
 * @param {number} p.movingSec     - Tiempo neto en movimiento (s, > 0).
 * @param {number} [p.terrainEta=1.2] - Coeficiente de terreno η de la sesión.
 * @param {number} p.ftpMs         - FTP del atleta (m/s, > 0) — define el umbral metabólico.
 * @param {string} [p.perfilTactico='civil'] - 'civil' | 'militar'.
 * @returns {{ok:boolean, rkTSS?:number, watts?:number, if?:number, mo?:number, loadPct?:number, gradePct?:number, error?:string}}
 */
export function calcularRkTSS({ bodyKg, loadKg, distM, elevM = 0, movingSec, terrainEta = ETA_TERRENO.trail, ftpMs, perfilTactico = 'civil' }) {
  const W   = Number(bodyKg);
  const t   = Number(movingSec);
  const d   = Number(distM);
  const ftp = Number(ftpMs);

  if (!Number.isFinite(W)  || W  <= 0) return { ok: false, error: 'peso corporal inválido' };
  if (!Number.isFinite(t)  || t  <= 0) return { ok: false, error: 'tiempo en movimiento inválido' };
  if (!Number.isFinite(d)  || d  <= 0) return { ok: false, error: 'distancia inválida' };
  if (!Number.isFinite(ftp)|| ftp<= 0) return { ok: false, error: 'FTP requerido para rkTSS' };

  const V = d / t;                                  // velocidad media (m/s)
  const elev = (Number.isFinite(Number(elevM)) && elevM > 0) ? Number(elevM) : 0;
  let G = (elev / d) * 100;                          // pendiente media (%)
  if (!Number.isFinite(G) || G < 0) G = 0;
  if (G > 45) G = 45;                                // cota de seguridad

  const sesion = calcularPandolfWatts({ bodyKg: W, loadKg, speedMs: V,   gradePct: G, terrainEta });
  const umbral = calcularPandolfWatts({ bodyKg: W, loadKg: 0, speedMs: ftp, gradePct: 0, terrainEta: 1.0 });
  if (!sesion.ok || !umbral.ok || umbral.watts <= 0) {
    return { ok: false, error: 'no se pudo calcular el costo metabólico' };
  }

  const IF = sesion.watts / umbral.watts;

  // Multiplicador de Estrés Operativo según etiqueta de perfil y % de carga
  const L = (Number.isFinite(Number(loadKg)) && loadKg > 0) ? Number(loadKg) : 0;
  const loadPct = L / W;
  const esMilitar = String(perfilTactico).toLowerCase().startsWith('mil');
  const umbralCarga = esMilitar ? UMBRAL_CARGA_MILITAR : UMBRAL_CARGA_CIVIL;
  const MO = loadPct > umbralCarga ? MO_FACTOR : 1.0;

  const rkTSS = (t * IF * IF / 3600) * 100 * MO;

  return {
    ok: true,
    rkTSS: Math.round(rkTSS),
    watts: sesion.watts,            // M metabólico de la sesión (Pandolf)
    umbralWatts: umbral.watts,
    if: Number(IF.toFixed(2)),
    mo: MO,
    loadPct: Number((loadPct * 100).toFixed(1)),
    gradePct: Number(G.toFixed(1)),
  };
}
