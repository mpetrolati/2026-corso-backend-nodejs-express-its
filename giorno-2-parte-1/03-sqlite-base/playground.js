// =====================================================
// Esempio 03 — Primi passi con better-sqlite3
// =====================================================
// Script standalone (non un server!): crea un DB in
// memoria, ci scrive qualcosa, ci legge. Serve per
// prendere confidenza con prepare/get/all/run prima di
// usarli dentro l'app vera (esempi 04, 05, 06).
//
// Esecuzione:  node playground.js  (oppure  npm start)

import Database from 'better-sqlite3';
import { mkdirSync } from 'fs';

// Creo la cartella data/ se non esiste
mkdirSync('./data', { recursive: true });

// Apro (o creo) il file del DB.
// In alternativa "':memory:'" per un DB in RAM.
const db = new Database('./data/app.db');

// === 1. Creo una tabella di prova ====================
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    price REAL NOT NULL
  );
`);

// Pulisco le righe precedenti per ripartire da capo
// ogni volta che lancio lo script
db.exec('DELETE FROM products');

// === 2. INSERT con .run(...) =========================
console.log('\n=== INSERT ===');
const inserisci = db.prepare(`
  INSERT INTO products (name, price) VALUES (?, ?)
`);
const a = inserisci.run('Tastiera', 49.90);
const b = inserisci.run('Mouse', 19.50);
const c = inserisci.run('Cuffie', 89.00);
console.log('Inserito id:', a.lastInsertRowid, 'righe affette:', a.changes);
console.log('Inserito id:', b.lastInsertRowid);
console.log('Inserito id:', c.lastInsertRowid);

// === 3. SELECT singolo con .get(...) =================
console.log('\n=== SELECT singolo ===');
const tastiera = db
  .prepare('SELECT * FROM products WHERE id = ?')
  .get(1);
console.log(tastiera);

// === 4. SELECT multiplo con .all(...) ================
console.log('\n=== SELECT multiplo ===');
const tutti = db.prepare('SELECT * FROM products').all();
console.log(tutti);

// === 5. SELECT filtrato con parametri ================
console.log('\n=== SELECT filtrato: price < 50 ===');
const economici = db
  .prepare('SELECT * FROM products WHERE price < ?')
  .all(50);
console.log(economici);

// === 6. UPDATE con .run(...) =========================
console.log('\n=== UPDATE: alzo i prezzi del 10% ===');
const update = db
  .prepare('UPDATE products SET price = price * 1.10 WHERE id = ?')
  .run(2);
console.log('Righe affette:', update.changes);
console.log(db.prepare('SELECT * FROM products WHERE id = 2').get());

// === 7. DELETE con .run(...) =========================
console.log('\n=== DELETE: rimuovo le cuffie ===');
const del = db.prepare('DELETE FROM products WHERE name = ?').run('Cuffie');
console.log('Righe affette:', del.changes);
console.log('Restano:', db.prepare('SELECT COUNT(*) AS n FROM products').get());

// === 8. SQL Injection: NON FARE COSI' ================
console.log('\n=== Esempio di SQL injection ===');
const userInput = "'; DROP TABLE products; --";

// VULNERABILE (concatenazione di stringhe)
// db.prepare(`SELECT * FROM products WHERE name = '${userInput}'`).all();
// ... non lo eseguiamo davvero perché distruggerebbe la tabella!

// SICURO (placeholder con ?)
const result = db
  .prepare('SELECT * FROM products WHERE name = ?')
  .all(userInput);
console.log(`Cercato "${userInput}" -> ${result.length} risultati (zero, come previsto)`);
console.log('La tabella esiste ancora:', db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='products'").get());

db.close();
console.log('\nFatto. Apri data/app.db con DB Browser per ispezionare.');
