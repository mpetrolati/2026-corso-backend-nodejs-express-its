# 01 — JWT playground

Script standalone per capire come funzionano i JWT prima di portarli nell'app Express. Mostra `sign`, `verify`, `decode` e tutti i casi di errore.

## Esecuzione

```bash
npm install
npm start
# oppure: node playground.js
```

## Output atteso

```
=== 1) Firmo un token ===
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQ...

=== 2) Le tre parti del token (separate da .) ===
Header (base64url): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
Header decoded:     { alg: 'HS256', typ: 'JWT' }

Payload (base64url): eyJ1c2VySWQiOjEsImVtYWlsIjoibWFy...
Payload decoded:     { userId: 1, email: 'mario@example.com', role: 'user', iat: ..., exp: ... }

Signature: 8K1G4yJDU3CmF4UQVeoR_xLqzL9PpwUtcExNXKlZHs0
(la firma e' opaca: HMAC-SHA256 di header.payload con il secret)

=== 3) Verifica con la chiave GIUSTA ===
OK, payload verificato: { userId: 1, email: 'mario@example.com', role: 'user', iat: ..., exp: ... }

=== 4) Verifica con chiave SBAGLIATA ===
Errore atteso [JsonWebTokenError]: invalid signature

=== 5) Token con firma manomessa ===
Errore atteso [JsonWebTokenError]: invalid signature

=== 6) Token scaduto ===
Errore atteso [TokenExpiredError]: jwt expired

=== 7) jwt.decode (NON verifica la firma) ===
Decode senza secret: { userId: 1, email: 'mario@example.com', role: 'user', iat: ..., exp: ... }
NOTA: chiunque puo' leggere il payload. Mai metterci segreti.
```

## Punti chiave

- **`jwt.sign(payload, secret, options)`** ritorna una stringa. Sincrono.
- **`jwt.verify(token, secret)`** ritorna il payload, o lancia eccezione.
- Due tipi principali di errore: `TokenExpiredError` (`exp` passato) e `JsonWebTokenError` (firma invalida, formato sbagliato).
- **`jwt.decode(token)`** decodifica senza verificare la firma. **Non usarlo per validare richieste autenticate**: serve solo per debug o per leggere il payload di token nostri.
- Il payload è **leggibile da chiunque** (`base64url` non è cifratura). La sicurezza viene dalla firma + dal secret.

## Per sperimentare

- Cambia il `SECRET` e rilancia: il token vecchio risulta invalido se provi a verificarlo col nuovo secret (è la base della rotazione delle chiavi).
- Aggiungi un claim custom al payload (es. `tenantId: 'acme'`) e ritrovalo nel payload verificato.
- Imposta `expiresIn: '5s'`, fai partire lo script, decodifica il token su jwt.io durante quei 5 secondi. Dopo 5 secondi, `verify` rifiuta.
- Prova `jwt.verify(token, SECRET, { algorithms: ['HS256'] })`: è una buona pratica white-list-are l'algoritmo (anti `none algorithm attack`).
