// =====================================================
// Esempio 01 — Il primo script in Node.js
// =====================================================
// Esegui con: node hello.js

console.log('Hello Node!');

// Variabili globali disponibili in Node (NON nel browser!)
console.log('Sto eseguendo:', __filename);
console.log('Nella cartella:', __dirname);
console.log('Versione Node:', process.version);
console.log('Sistema operativo:', process.platform);

// process.argv = array di argomenti passati da riga di comando
// Prova: node hello.js Mario
const nome = process.argv[2] || 'sconosciuto';
console.log(`Ciao ${nome}!`);
