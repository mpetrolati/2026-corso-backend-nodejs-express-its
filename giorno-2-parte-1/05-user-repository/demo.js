// =====================================================
// Esempio 05 — Demo del userRepository
// =====================================================
// Script standalone che esercita tutte le funzioni del
// repository: create, find, update, delete, count.
// E' un mini test "casalingo" che useremo per essere sicuri
// che il repository funzioni prima di integrarlo nell'app.
//
// Esecuzione:  node demo.js  (oppure  npm start)

import db from './src/db/connection.js';
import * as repo from './src/repositories/userRepository.js';

// Pulisco la tabella per ripartire da zero ad ogni run
db.exec('DELETE FROM users');

console.log('=== Stato iniziale ===');
console.log('Totale utenti:', repo.count());

console.log('\n=== Creo due utenti ===');
const mario = repo.create({
  email: 'mario@example.com',
  passwordHash: 'hash-finto-non-bcrypt-ancora',
  name: 'Mario Rossi'
});
console.log('Creato:', mario);

const lucia = repo.create({
  email: 'lucia@example.com',
  passwordHash: 'hash-finto-2',
  name: 'Lucia Bianchi',
  role: 'admin'
});
console.log('Creato:', lucia);

console.log('\n=== findAll ===');
console.log(repo.findAll());

console.log('\n=== findByEmail ===');
console.log(repo.findByEmail('mario@example.com'));

console.log('\n=== findById ===');
console.log(repo.findById(lucia.id));

console.log('\n=== findById inesistente ===');
console.log(repo.findById(999));   // undefined

console.log('\n=== Aggiorno Mario (solo nome) ===');
const marioUpdated = repo.update(mario.id, { name: 'Mario Rossi Junior' });
console.log(marioUpdated);

console.log('\n=== Cambio password e role a Mario ===');
const marioFull = repo.update(mario.id, {
  passwordHash: 'nuovo-hash',
  role: 'admin'
});
console.log(marioFull);

console.log('\n=== Elimino Mario ===');
console.log('Esito:', repo.deleteById(mario.id));
console.log('Totale dopo delete:', repo.count());

console.log('\n=== Tentativo di delete inesistente ===');
console.log('Esito:', repo.deleteById(999));  // false

console.log('\n=== Vincolo UNIQUE su email ===');
try {
  repo.create({
    email: 'lucia@example.com',
    passwordHash: 'altro-hash',
    name: 'Lucia clone'
  });
} catch (err) {
  console.log('Errore atteso:', err.message);
}

db.close();
console.log('\nFatto.');
