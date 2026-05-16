# 04 — Service authService.register testato in isolamento

Il service `register` con tutti i suoi pezzi (repository, hashPassword, AppError) ma **senza Express**: un demo standalone che mostra come testare la logica di business come una pura funzione `async`.

## Esecuzione

```bash
cp .env.example .env
npm install
npm start      # esegue demo.js
```

## Output atteso

```
=== Test 1: registrazione valida ===
Utente creato:
{
  id: 1,
  email: 'mario@example.com',
  name: 'Mario Rossi',
  role: 'user',
  created_at: '2026-05-16 10:23:45',
  updated_at: '2026-05-16 10:23:45'
}
(notare che password_hash NON e' presente nell'output)

=== Test 2: stessa email -> 409 ===
Errore atteso: [409] Email gia registrata

=== Test 3: utente con ruolo admin ===
{ id: 2, email: 'admin@example.com', name: 'Admin User', role: 'admin', ... }

=== Test 4: verifico che la password sia hashata nel DB ===
email: mario@example.com
password_hash: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAg...
(stringa lunga e illeggibile = bcrypt ha fatto il suo lavoro)
```

## Struttura del progetto

```
src/
├── config/
│   └── env.js            ← legge .env con fail-fast
├── db/
│   ├── connection.js
│   └── schema.sql
├── repositories/
│   └── userRepository.js
├── services/
│   └── authService.js    ← register()
└── utils/
    ├── AppError.js
    └── hashPassword.js
```

## Punti chiave del service

- **Check duplicato PRIMA dell'hash**: l'hashing costa ~100ms, evitiamo di sprecarlo se l'email è già usata.
- **Lancia `AppError`**: non chiama `next(err)`. È compito del controller (sopra) catturare. Il service non conosce Express.
- **Ritorna l'utente già pulito** (senza `password_hash`): chi consuma il service non deve ricordarsi di toglierlo.
- **`async`**: usiamo `await` per l'hash. La funzione intera ritorna una Promise.
- **Non sa di route, né di JSON, né di status code HTTP**: è 100% logica di dominio. Estremamente testabile.

## Come si testerebbe questo service

Con un framework di test (jest, vitest, node:test), il service è una **pasta**:

```javascript
import { register } from './src/services/authService.js';

test('rifiuta email duplicata', async () => {
  // mock del repository
  jest.unstable_mockModule('./src/repositories/userRepository.js', () => ({
    findByEmail: () => ({ id: 1 })   // simulo email esistente
  }));

  await expect(register({
    email: 'gia@example.com',
    password: 'Password123'
  })).rejects.toMatchObject({ statusCode: 409 });
});
```

Niente Express da avviare, niente HTTP da fare, nessuna richiesta da costruire. **Questa è la testabilità di un service ben fatto.**

## Per sperimentare

- Aggiungi `getProfile(userId)` al service: cerca per id e toglie `password_hash`. Se non esiste lancia `AppError('Utente non trovato', 404)`.
- Aggiungi `updateProfile(userId, data)`: valida che i campi siano permessi (non si può aggiornare email da qui), hasha la nuova password se presente.
- Scrivi un mini-test manuale come `demo.js` per ciascuna funzione nuova.
