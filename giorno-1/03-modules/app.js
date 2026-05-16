// =====================================================
// Esempio 03 — Moduli con ES Modules
// =====================================================
// Esegui con: node app.js
//
// Requisito: nel package.json deve esserci "type": "module"
// e nei file devi sempre indicare l'estensione .js negli import.

// Import named (in graffe)
import { somma, sottrai, PI } from './math.js';

// Import default (senza graffe, posso dargli il nome che voglio)
import moltiplica from './math.js';

console.log('somma(2, 3) =', somma(2, 3));
console.log('sottrai(10, 4) =', sottrai(10, 4));
console.log('moltiplica(6, 7) =', moltiplica(6, 7));
console.log('PI =', PI);

// =====================================================
// Boilerplate ESM per ricreare __dirname e __filename
// =====================================================
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('File corrente:', __filename);
console.log('Cartella corrente:', __dirname);
