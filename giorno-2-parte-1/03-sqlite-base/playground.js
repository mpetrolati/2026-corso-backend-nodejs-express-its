// =====================================================
// Esempio 03 — Primi passi con sqlite3 + sqlite
// =====================================================
// Script standalone (non un server!): crea un DB,
// scrive qualcosa, legge. Serve per prendere confidenza
// con db.get/.all/.run con async/await prima di usarli
// dentro l'app vera (esempi 04, 05, 06).
//
// Esecuzione:  node playground.js  (oppure  npm start)

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { mkdirSync } from 'fs';

// Creo la cartella data/ se non esiste
mkdirSync('./data', { recursive: true });

// Apro (o creo) il file del DB.
// open(...) ritorna una Promise: usiamo await (top-level OK in ESM).
const db = await open({
  filename: './data/app.db',
  driver: sqlite3.Database
});

// === 1. Creo una tabella di prova ====================
await db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    price REAL NOT NULL
  );
`);

// Pulisco le righe precedenti per ripartire da capo
// ogni volta che lancio lo script
await db.exec('DELETE FROM products');

// === 2. INSERT con .run(...) =========================
console.log('\n=== INSERT ===');
const a = await db.run(
  'INSERT INTO products (name, price) VALUES (?, ?)',
  'Tastiera', 49.90
);
const b = await db.run(
  'INSERT INTO products (name, price) VALUES (?, ?)',
  'Mouse', 19.50
);
const c = await db.run(
  'INSERT INTO products (name, price) VALUES (?, ?)',
  'Cuffie', 89.00
);
console.log('Inserito id:', a.lastID, 'righe affette:', a.changes);
console.log('Inserito id:', b.lastID);
console.log('Inserito id:', c.lastID);

// === 3. SELECT singolo con .get(...) =================
console.log('\n=== SELECT singolo ===');
const tastiera = await db.get(
  'SELECT * FROM products WHERE id = ?', 1
);
console.log(tastiera);

// === 4. SELECT multiplo con .all(...) ================
console.log('\n=== SELECT multiplo ===');
const tutti = await db.all('SELECT * FROM products');
console.log(tutti);

// === 5. SELECT filtrato con parametri ================
console.log('\n=== SELECT filtrato: price < 50 ===');
const economici = await db.all(
  'SELECT * FROM products WHERE price < ?', 50
);
console.log(economici);

// === 6. UPDATE con .run(...) =========================
console.log('\n=== UPDATE: alzo il prezzo del Mouse del 10% ===');
const update = await db.run(
  'UPDATE products SET price = price * 1.10 WHERE id = ?', 2
);
console.log('Righe affette:', update.changes);
console.log(await db.get('SELECT * FROM products WHERE id = 2'));

// === 7. DELETE con .run(...) =========================
console.log('\n=== DELETE: rimuovo le cuffie ===');
const del = await db.run(
  'DELETE FROM products WHERE name = ?', 'Cuffie'
);
console.log('Righe affette:', del.changes);
console.log('Restano:', await db.get('SELECT COUNT(*) AS n FROM products'));

// === 8. SQL Injection: NON FARE COSI' ================
console.log('\n=== Esempio di SQL injection ===');
const userInput = "'; DROP TABLE products; --";

// VULNERABILE (concatenazione di stringhe)
// await db.get(`SELECT * FROM products WHERE name = '${userInput}'`);
// ... non lo eseguiamo davvero perché distruggerebbe la tabella!

// SICURO (placeholder con ?)
const result = await db.all(
  'SELECT * FROM products WHERE name = ?', userInput
);
console.log(`Cercato "${userInput}" -> ${result.length} risultati (zero, come previsto)`);
console.log('La tabella esiste ancora:',
  await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='products'")
);

await db.close();
console.log('\nFatto. Apri data/app.db con DB Browser per ispezionare.');
