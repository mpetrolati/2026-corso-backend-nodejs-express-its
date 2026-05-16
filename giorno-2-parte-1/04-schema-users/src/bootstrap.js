// =====================================================
// Esempio 04 — Bootstrap del database
// =====================================================
// Script che importa il modulo connection.js (che esegue
// schema.sql) e poi ispeziona la struttura della tabella
// per verifica. Lancialo per creare il file app.db con la
// tabella users pronta.
//
// Esecuzione:  node src/bootstrap.js  (oppure  npm start)

import db from './db/connection.js';

console.log('\n=== Struttura della tabella users ===');
const columns = db.prepare("PRAGMA table_info('users')").all();
console.log(columns);

console.log('\n=== Indici sulla tabella users ===');
const indexes = db.prepare("PRAGMA index_list('users')").all();
console.log(indexes);

console.log('\n=== Inserisco un utente di prova ===');
try {
  const info = db.prepare(`
    INSERT INTO users (email, password_hash, name)
    VALUES (?, ?, ?)
  `).run('test@example.com', 'finto-hash-non-bcrypt-ancora', 'Test User');

  console.log('Inserito id:', info.lastInsertRowid);
} catch (err) {
  // Se rilanci lo script una seconda volta, il vincolo UNIQUE
  // su email scatena questo errore. E' esattamente cio' che vogliamo.
  console.log('Errore (atteso al secondo run):', err.message);
}

console.log('\n=== Utenti attualmente in tabella ===');
const users = db.prepare('SELECT id, email, name, role, created_at FROM users').all();
console.log(users);

db.close();

console.log('\nFatto. Apri data/app.db con DB Browser per vedere la tabella.');
