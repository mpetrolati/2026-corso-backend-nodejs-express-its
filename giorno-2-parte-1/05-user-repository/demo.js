// =====================================================
// Esempio 05 — Demo del userRepository
// =====================================================
// Script standalone che esercita tutte le funzioni del
// repository: create, find, update, delete, count.
// Tutte le funzioni del repository sono async (sqlite3+sqlite),
// quindi useremo await ovunque.
//
// Esecuzione:  node demo.js  (oppure  npm start)

import db from './src/db/connection.js';
import * as repo from './src/repositories/userRepository.js';

// Pulisco la tabella per ripartire da zero ad ogni run
await db.exec('DELETE FROM users');

console.log('=== Stato iniziale ===');
console.log('Totale utenti:', await repo.count());

console.log('\n=== Creo due utenti ===');
const mario = await repo.create({
  email: 'mario@example.com',
  passwordHash: 'hash-finto-non-bcrypt-ancora',
  name: 'Mario Rossi'
});
console.log('Creato:', mario);

const lucia = await repo.create({
  email: 'lucia@example.com',
  passwordHash: 'hash-finto-2',
  name: 'Lucia Bianchi',
  role: 'admin'
});
console.log('Creato:', lucia);

console.log('\n=== findAll ===');
console.log(await repo.findAll());

console.log('\n=== findByEmail ===');
console.log(await repo.findByEmail('mario@example.com'));

console.log('\n=== findById ===');
console.log(await repo.findById(lucia.id));

console.log('\n=== findById inesistente ===');
console.log(await repo.findById(999));   // undefined

console.log('\n=== Aggiorno Mario (solo nome) ===');
const marioUpdated = await repo.update(mario.id, { name: 'Mario Rossi Junior' });
console.log(marioUpdated);

console.log('\n=== Cambio password e role a Mario ===');
const marioFull = await repo.update(mario.id, {
  passwordHash: 'nuovo-hash',
  role: 'admin'
});
console.log(marioFull);

console.log('\n=== Elimino Mario ===');
console.log('Esito:', await repo.deleteById(mario.id));
console.log('Totale dopo delete:', await repo.count());

console.log('\n=== Tentativo di delete inesistente ===');
console.log('Esito:', await repo.deleteById(999));  // false

console.log('\n=== Vincolo UNIQUE su email ===');
try {
  await repo.create({
    email: 'lucia@example.com',
    passwordHash: 'altro-hash',
    name: 'Lucia clone'
  });
} catch (err) {
  console.log('Errore atteso:', err.message);
}

await db.close();
console.log('\nFatto.');
