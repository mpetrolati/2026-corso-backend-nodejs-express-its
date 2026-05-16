# 05 — POST /api/auth/register end-to-end

L'endpoint completo che integra **tutti** i mattoncini della giornata: validazione con `express-validator`, configurazione via `dotenv`, hashing con `bcrypt`, service layer, error handler centralizzato, persistenza su SQLite.

È lo **scheletro su cui costruiremo `POST /api/auth/login` e le route protette del Giorno 3**.

## Esecuzione

```bash
cp .env.example .env
npm install
npm run dev
```

## Struttura del progetto

```
src/
├── config/
│   └── env.js              ← .env + fail-fast
├── db/
│   ├── connection.js
│   └── schema.sql
├── repositories/
│   └── userRepository.js
├── services/
│   └── authService.js      ← cervello: dup-check + hash + save
├── controllers/
│   └── authController.js   ← sottile: req → service → res
├── routes/
│   └── authRoutes.js       ← validatori + validate + controller
├── validators/
│   └── authValidators.js
├── middlewares/
│   ├── validate.js
│   └── errorHandler.js
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   └── hashPassword.js
├── app.js
└── server.js
```

## Endpoint

| Metodo | Path | Cosa fa | Status atteso |
|---|---|---|---|
| `POST` | `/api/auth/register` | Crea un utente | 201 / 400 / 409 |
| `*`    | qualsiasi altra | Catch-all 404 | 404 |

## Sequenza di test in aula

```bash
# 1) HAPPY PATH → 201 Created
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123","name":"Mario Rossi"}'

# 2) EMAIL MAL FORMATA → 400 Bad Request
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"non-email","password":"Password123"}'

# 3) PASSWORD TROPPO CORTA → 400 Bad Request
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"anna@example.com","password":"abc"}'

# 4) PASSWORD SENZA MAIUSCOLA O NUMERO → 400 Bad Request (custom validator)
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"x@example.com","password":"password"}'

# 5) EMAIL GIÀ USATA → 409 Conflict
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123"}'

# 6) UTENTE ADMIN → 201 (con role:"admin")
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"AdminPwd1","role":"admin"}'

# 7) ROLE NON VALIDO → 400 Bad Request
curl -i -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"x@example.com","password":"Password123","role":"superuser"}'
```

## Risposte attese

### Happy path (201)
```json
{
  "id": 1,
  "email": "mario@example.com",
  "name": "Mario Rossi",
  "role": "user",
  "created_at": "2026-05-16 10:23:45",
  "updated_at": "2026-05-16 10:23:45"
}
```

**Nota**: `password_hash` non c'è. Il service lo ha tolto.

### Validazione fallita (400)
```json
{
  "errore": "Validazione fallita",
  "dettagli": [
    { "campo": "email", "messaggio": "Email non valida" }
  ]
}
```

### Email già usata (409)
```json
{
  "errore": "Email gia registrata"
}
```

## La pipeline completa

```
Client request
    ↓
Express.json() popola req.body
    ↓
morgan logga la richiesta
    ↓
/api/auth/register router
    ↓
registerValidator (catena di middleware: email, password, name, role)
    ↓
validate (se errori → 400 + dettagli; altrimenti next())
    ↓
authController.register (asyncHandler)
    ↓
authService.register
    │
    ├─ userRepository.findByEmail → trovato? → AppError 409
    ├─ hashPassword → bcrypt.hash(password, env.bcryptRounds)
    ├─ userRepository.create → INSERT SQL parametrizzato
    └─ toSafeUser → toglie password_hash
    ↓
res.status(201).json(safeUser)
```

## Apri il file .db

Lancia il server, fai una `POST /api/auth/register`, poi apri `data/app.db` con [DB Browser for SQLite](https://sqlitebrowser.org):

- Tabella `users` con la riga di Mario.
- Colonna `password_hash`: una stringa lunga e illeggibile (`$2b$10$...`).
- **La password "Password123" non c'è da nessuna parte**. E non c'è modo di ricavarla. È il momento "ah, ora è davvero sicuro" della giornata.

## Defense in depth: il vincolo UNIQUE del DB

Anche se il check `findByEmail` nel service fallisse (race condition, bug, qualunque cosa), il vincolo `UNIQUE` sull'email nello schema farebbe scattare `SQLITE_CONSTRAINT_UNIQUE`. L'`errorHandler` mappa quell'errore a **409 Conflict**, quindi il client riceve comunque la risposta giusta.

Più strati di difesa, ognuno indipendente. Se uno fallisce, gli altri ti coprono.

## Per sperimentare

- Aggiungi un endpoint `GET /api/users/stats` che ritorna `{ totale: N }` usando `db.prepare('SELECT COUNT(*) ...')`.
- Estendi `authValidators` con un campo `passwordConfirm` che deve essere uguale a `password` (via custom validator).
- Sostituisci `bcrypt` con `bcryptjs` (utile se sei su Windows): cambia solo l'import in `hashPassword.js`.
- Aggiungi un test del service con `node --test` (test runner built-in di Node 22): un mock del repository fa risparmiare un DB vero.
