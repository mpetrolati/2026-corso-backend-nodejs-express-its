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
const columns = await db.all("PRAGMA table_info('users')");
console.log(columns);

console.log('\n=== Indici sulla tabella users ===');
const indexes = await db.all("PRAGMA index_list('users')");
console.log(indexes);

console.log('\n=== Inserisco un utente di prova ===');
try {
  const info = await db.run(
    `INSERT INTO users (email, password_hash, name)
     VALUES (?, ?, ?)`,
    'test@example.com', 'finto-hash-non-bcrypt-ancora', 'Test User'
  );

  console.log('Inserito id:', info.lastID);
} catch (err) {
  // Se rilanci lo script una seconda volta, il vincolo UNIQUE
  // su email scatena questo errore. E' esattamente cio' che vogliamo.
  console.log('Errore (atteso al secondo run):', err.message);
}

console.log('\n=== Utenti attualmente in tabella ===');
const users = await db.all(
  'SELECT id, email, name, role, created_at FROM users'
);
console.log(users);

await db.close();

console.log('\nFatto. Apri data/app.db con DB Browser per vedere la tabella.');
