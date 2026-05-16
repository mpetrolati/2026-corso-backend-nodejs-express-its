// =====================================================
// math.js — Modulo di esempio (ES Modules)
// =====================================================
// Esportazione "named": più cose esportate per nome

export function somma(a, b) {
  return a + b;
}

export function sottrai(a, b) {
  return a - b;
}

export const PI = 3.14159;

// Esportazione "default": una sola cosa di default per modulo
export default function moltiplica(a, b) {
  return a * b;
}
