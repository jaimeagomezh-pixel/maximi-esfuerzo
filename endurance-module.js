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

    if (!Number.isFinite(d5) || !Number.isFinite(d20)) {
      throw new Error('Las distancias deben ser números válidos.');
    }
    if (d5 <= 0 || d20 <= 0) {
      throw new Error('Las distancias deben ser mayores a cero.');
    }

    // Multiplicador: fallback seguro a 1.00 si es inválido, y clamp a rango sensato
    let mult = Number(ftpMultiplier);
    if (!Number.isFinite(mult) || mult <= 0) mult = FTP_MULT_DEFAULT;
    if (mult < FTP_MULT_MIN) mult = FTP_MULT_MIN;
    if (mult > FTP_MULT_MAX) mult = FTP_MULT_MAX;

    const vamMs      = d5  / SEG_TEST_VAM;        // m/s
    const ftpRawMs   = d20 / SEG_TEST_FTP;        // ritmo crudo de 20 min (m/s)
    const ftpFinalMs = ftpRawMs * mult;           // FTP ajustado por multiplicador

    return {
      ok: true,
      vam: { ms: Number(vamMs.toFixed(3)), pace: msARitmo(vamMs) },
      ftp: {
        ms: Number(ftpFinalMs.toFixed(3)),
        pace: msARitmo(ftpFinalMs),
        multiplier: Number(mult.toFixed(3)),
        raw20minMs: Number(ftpRawMs.toFixed(3)),
      },
    };
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
