// =====================================================
// fs — File System
// =====================================================
// Modulo per leggere/scrivere file e cartelle.
// Esegui con: node fs-demo.js

import { writeFile, readFile, readdir } from 'fs/promises';

// Scrittura asincrona di un file
await writeFile('./esempio.txt', 'Ciao dal modulo fs!\nSeconda riga.', 'utf-8');
console.log('File scritto.');

// Lettura asincrona dello stesso file
const contenuto = await readFile('./esempio.txt', 'utf-8');
console.log('Contenuto:\n', contenuto);

// Lettura della lista di file nella cartella corrente
const files = await readdir('./');
console.log('File nella cartella:', files);

// NOTA: usiamo top-level await, possibile solo grazie a ESM!
