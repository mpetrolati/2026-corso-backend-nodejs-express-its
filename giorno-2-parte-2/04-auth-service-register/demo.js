// =====================================================
// Esempio 04 — Demo standalone del authService
// =====================================================
// Lo eseguiamo SENZA Express: cosi' vediamo che il service
// si puo' testare come una semplice funzione async.
//
// Esecuzione: node demo.js  (oppure  npm start)

import db from './src/db/connection.js';
import * as authService from './src/services/authService.js';

// Pulisco la tabella per ripartire da zero ad ogni run
db.exec('DELETE FROM users');

console.log('=== Test 1: registrazione valida ===');
try {
  const user = await authService.register({
    email: 'mario@example.com',
    password: 'Password123',
    name: 'Mario Rossi'
  });
  console.log('Utente creato:');
  console.log(user);
  console.log('(notare che password_hash NON e\' presente nell\'output)');
} catch (err) {
  console.log('Errore inatteso:', err.message);
}

console.log('\n=== Test 2: stessa email -> 409 ===');
try {
  await authService.register({
    email: 'mario@example.com',
    password: 'AltraPassword456'
  });
  console.log('NON dovrebbe arrivare qui');
} catch (err) {
  console.log(`Errore atteso: [${err.statusCode}] ${err.message}`);
}

console.log('\n=== Test 3: utente con ruolo admin ===');
const admin = await authService.register({
  email: 'admin@example.com',
  password: 'AdminPassword1',
  name: 'Admin User',
  role: 'admin'
});
console.log(admin);

console.log('\n=== Test 4: verifico che la password sia hashata nel DB ===');
const raw = db.prepare('SELECT email, password_hash FROM users WHERE email = ?')
              .get('mario@example.com');
console.log(`email: ${raw.email}`);
console.log(`password_hash: ${raw.password_hash}`);
console.log('(stringa lunga e illeggibile = bcrypt ha fatto il suo lavoro)');

db.close();
console.log('\nFatto.');
