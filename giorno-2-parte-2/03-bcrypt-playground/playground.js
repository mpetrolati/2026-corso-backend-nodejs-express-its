// =====================================================
// Esempio 03 — bcrypt: hash diversi, compare sempre true
// =====================================================
// Lo script piu' importante per capire visivamente cos'e'
// il salt: hasha la stessa password 3 volte, mostra che
// gli hash sono diversi ma compare ritorna sempre true.
//
// Esecuzione: node playground.js  (oppure  npm start)

import bcrypt from 'bcrypt';

const ROUNDS = 10;
const plain = 'PasswordSegreta123';

console.log(`Plaintext: "${plain}"\n`);

// === 1) Hasho tre volte ==============================
console.log('Hasho la stessa password 3 volte:\n');
const h1 = await bcrypt.hash(plain, ROUNDS);
const h2 = await bcrypt.hash(plain, ROUNDS);
const h3 = await bcrypt.hash(plain, ROUNDS);

console.log(`hash 1: ${h1}`);
console.log(`hash 2: ${h2}`);
console.log(`hash 3: ${h3}`);
console.log();
console.log(`Tre hash diversi: ${h1 !== h2 && h2 !== h3 && h1 !== h3}`);
console.log('(grazie al salt casuale che bcrypt inserisce in ogni hash)');

// === 2) compare con la password giusta ===============
console.log('\nVerifico con compare (password GIUSTA):');
console.log(`  compare(plain, h1): ${await bcrypt.compare(plain, h1)}`);
console.log(`  compare(plain, h2): ${await bcrypt.compare(plain, h2)}`);
console.log(`  compare(plain, h3): ${await bcrypt.compare(plain, h3)}`);

// === 3) compare con la password sbagliata ============
console.log('\nVerifico con compare (password SBAGLIATA):');
console.log(`  compare('wrong', h1): ${await bcrypt.compare('wrong', h1)}`);

// === 4) Struttura di un hash =========================
console.log('\nStruttura di un hash bcrypt:');
const [, algo, rounds, saltAndHash] = h1.split('$');
console.log(`  algoritmo:    ${algo}`);
console.log(`  rounds:       ${rounds}`);
console.log(`  salt + hash:  ${saltAndHash}`);

console.log('\nFatto.');
