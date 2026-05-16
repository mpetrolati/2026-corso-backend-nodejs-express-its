// =====================================================
// Esempio 01 — JWT playground
// =====================================================
// Script standalone per capire visivamente come funzionano
// i JSON Web Token: sign, verify, struttura del token,
// cosa succede manomettendo la firma.
//
// Esecuzione:  node playground.js  (oppure  npm start)

import jwt from 'jsonwebtoken';

const SECRET = 'questo-secret-vive-solo-sul-server-32-caratteri';

// === 1) Firmo un token =========================================
console.log('=== 1) Firmo un token ===');
const payload = {
  userId: 1,
  email: 'mario@example.com',
  role: 'user'
};

const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
console.log('Token:', token);

// === 2) Smonto le tre parti ====================================
console.log('\n=== 2) Le tre parti del token (separate da .) ===');
const [headerB64, payloadB64, signature] = token.split('.');

console.log('Header (base64url):', headerB64);
console.log('Header decoded:    ', JSON.parse(Buffer.from(headerB64, 'base64url').toString()));

console.log('\nPayload (base64url):', payloadB64);
console.log('Payload decoded:    ', JSON.parse(Buffer.from(payloadB64, 'base64url').toString()));

console.log('\nSignature:', signature);
console.log('(la firma e\' opaca: HMAC-SHA256 di header.payload con il secret)');

// === 3) Verifica con la chiave giusta ==========================
console.log('\n=== 3) Verifica con la chiave GIUSTA ===');
try {
  const verified = jwt.verify(token, SECRET);
  console.log('OK, payload verificato:', verified);
} catch (err) {
  console.log('Errore inatteso:', err.message);
}

// === 4) Verifica con chiave SBAGLIATA ==========================
console.log('\n=== 4) Verifica con chiave SBAGLIATA ===');
try {
  jwt.verify(token, 'chiave-diversa');
  console.log('Non dovrebbe arrivare qui');
} catch (err) {
  console.log(`Errore atteso [${err.name}]: ${err.message}`);
}

// === 5) Token con firma MANOMESSA ==============================
console.log('\n=== 5) Token con firma manomessa ===');
const tokenRotto = headerB64 + '.' + payloadB64 + '.firma_falsa_invalida';
try {
  jwt.verify(tokenRotto, SECRET);
} catch (err) {
  console.log(`Errore atteso [${err.name}]: ${err.message}`);
}

// === 6) Token SCADUTO ==========================================
console.log('\n=== 6) Token scaduto ===');
const tokenScaduto = jwt.sign({ userId: 1 }, SECRET, { expiresIn: '1ms' });
await new Promise((r) => setTimeout(r, 10));
try {
  jwt.verify(tokenScaduto, SECRET);
} catch (err) {
  console.log(`Errore atteso [${err.name}]: ${err.message}`);
}

// === 7) decode (NO verifica) -- da non usare in produzione =====
console.log('\n=== 7) jwt.decode (NON verifica la firma) ===');
const decoded = jwt.decode(token);
console.log('Decode senza secret:', decoded);
console.log('NOTA: chiunque puo\' leggere il payload. Mai metterci segreti.');

console.log('\nFatto.');
