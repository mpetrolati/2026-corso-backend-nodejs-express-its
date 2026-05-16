// =====================================================
// Esempio 03 — Benchmark dei rounds bcrypt
// =====================================================
// Misura quanto tempo ci mette bcrypt a hashare con
// diversi valori di rounds. Aiuta a capire perche' la
// scelta del work factor e' un compromesso.
//
// Esecuzione: node benchmark.js  (oppure  npm run bench)

import bcrypt from 'bcrypt';

const plain = 'PasswordSegreta123';
const ROUNDS_DA_TESTARE = [4, 8, 10, 12];

console.log('Benchmark di bcrypt.hash al variare dei rounds:\n');
console.log('rounds  |  tempo medio (3 esecuzioni)');
console.log('--------|------------------------------');

for (const rounds of ROUNDS_DA_TESTARE) {
  const tempi = [];
  for (let i = 0; i < 3; i++) {
    const start = Date.now();
    await bcrypt.hash(plain, rounds);
    tempi.push(Date.now() - start);
  }
  const media = tempi.reduce((a, b) => a + b, 0) / tempi.length;
  console.log(`${rounds.toString().padStart(6, ' ')}  |  ${media.toFixed(1).padStart(8, ' ')} ms`);
}

console.log('\nCosa significa:');
console.log('  rounds = 4   → veloce, ma poco resistente al brute-force');
console.log('  rounds = 10  → standard di settore, ~100ms per hash');
console.log('  rounds = 12  → piu sicuro, ma piu lento sotto carico');
console.log('  rounds = 14  → solo se hai CPU da vendere');
console.log('\nIn corso usiamo 10 (default). In test si scende a 4 per velocita.');
