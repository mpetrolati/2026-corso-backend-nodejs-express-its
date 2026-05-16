// =====================================================
// path — Gestione percorsi file cross-platform
// =====================================================
// Su Windows si usa "\", su macOS/Linux "/". path risolve la differenza.
// Esegui con: node path-demo.js

import path from 'path';

// path.join: costruisce un percorso usando il separatore corretto
const percorso = path.join('cartella', 'sotto-cartella', 'file.txt');
console.log('join:', percorso);

// path.resolve: restituisce sempre un percorso assoluto
const assoluto = path.resolve('cartella', 'file.txt');
console.log('resolve:', assoluto);

// Estrarre parti di un percorso
const file = '/Users/mario/progetti/app.js';
console.log('dirname:', path.dirname(file));   // /Users/mario/progetti
console.log('basename:', path.basename(file)); // app.js
console.log('extname:', path.extname(file));   // .js
console.log('parse:', path.parse(file));
