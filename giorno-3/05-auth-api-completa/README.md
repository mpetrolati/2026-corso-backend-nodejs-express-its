# 05 — Auth API completa

**Il progetto finale del corso.** Integra tutto quello che abbiamo costruito in 3 giorni: ESM + Express + middleware + SQLite + repository + dotenv + validazione + bcrypt + service layer + JWT + verifyToken. Più una **collection Postman** completa.

A fine corso, questo è il progetto che ti porti a casa.

## Esecuzione

```bash
cp .env.example .env
npm install
npm run dev
```

Il server gira su `http://localhost:3000` e crea `data/app.db` al primo avvio.

## Struttura del progetto

```
src/
├── config/
│   └── env.js                 ← .env + fail-fast
├── db/
│   ├── connection.js
│   └── schema.sql
├── repositories/
│   └── userRepository.js      ← UNICO punto col DB
├── services/
│   ├── authService.js         ← register + login
│   └── userService.js         ← getProfile + updateProfile + deleteAccount
├── controllers/
│   ├── authController.js
│   └── userController.js
├── routes/
│   ├── authRoutes.js          ← /api/auth/*
│   └── userRoutes.js          ← /api/users/* (tutte protette)
├── middlewares/
│   ├── authMiddleware.js      ← verifyToken
│   ├── validate.js
│   └── errorHandler.js        ← + mapping SQLITE_CONSTRAINT_UNIQUE → 409
├── utils/
│   ├── AppError.js
│   ├── asyncHandler.js
│   ├── hashPassword.js
│   └── generateToken.js
├── validators/
│   ├── authValidators.js
│   └── userValidators.js
├── app.js
└── server.js
```

## Endpoint

| Metodo | Path | Protetto? | Cosa fa |
|---|---|---|---|
| `POST`   | `/api/auth/register` | No | Crea un utente |
| `POST`   | `/api/auth/login` | No | Verifica credenziali, ritorna JWT |
| `GET`    | `/api/users/me` | **Sì** | Profilo dell'utente loggato |
| `PUT`    | `/api/users/me` | **Sì** | Aggiorna name e/o password |
| `DELETE` | `/api/users/me` | **Sì** | Cancella il proprio account |

## Test con la collection Postman

1. Importa `postman-collection.json` in Postman.
2. Seleziona la collection "Auth API - Corso Node.js + Express + JWT" e lancia il **Runner**.
3. Le 7 richieste girano in sequenza. Lo script di test dopo il login salva il token automaticamente nelle variabili della collection.

In alternativa, puoi cliccare le richieste una a una nell'ordine numerato.

## La pipeline completa di una richiesta protetta

```
Client manda GET /api/users/me con Authorization: Bearer <token>
    ↓
Express riceve la richiesta
    ↓
express.json() (anche se non c'è body)
    ↓
morgan logga la richiesta
    ↓
/api/users router → router.use(verifyToken)
    ↓
verifyToken:
    ├─ Header presente? OK
    ├─ Formato "Bearer <token>"? OK
    ├─ jwt.verify(token, secret) → payload
    └─ req.user = payload
    ↓
userController.getMe (asyncHandler)
    ↓
userService.getProfile(req.user.userId)
    ↓
userRepository.findById(userId) → SELECT FROM users
    ↓
toSafeUser(user) → toglie password_hash
    ↓
res.json(safeUser)
```

Niente DB lookup per la verifica del token. Solo cripto. È il superpotere dei JWT stateless.

## Come portarlo in produzione

### Da SQLite a PostgreSQL

1. `npm uninstall sqlite sqlite3 && npm install pg`
2. Riscrivi **solo** `src/db/connection.js` e `src/repositories/userRepository.js`.
3. Lo schema SQL è quasi identico (cambia `INTEGER PRIMARY KEY AUTOINCREMENT` in `SERIAL PRIMARY KEY`).
4. Tutto il resto (route, controller, service, middleware, validatori): **intatto**.

Questa è la promessa del repository pattern.

### Deploy

Le piattaforme più semplici:

- **Render.com** — collega il repo GitHub, setta le env vars, deploy automatico.
- **Railway.app** — simile, ottimo per progetti piccoli.
- **Fly.io** — ottimo se vuoi Docker, scali geograficamente.
- **Cloud serio** — AWS (ECS/Fargate), GCP (Cloud Run), Azure App Service.

Ricorda: **SQLite va sostituito** prima del deploy in produzione (è un file, non sopravvive ai redeploy nelle piattaforme moderne).

### Gestione segreti in produzione

- Mai committare `.env`.
- Setta `JWT_SECRET`, `BCRYPT_ROUNDS`, ecc. **dal pannello della piattaforma di deploy** (Render, Railway hanno una UI per le env vars).
- Per progetti grossi: AWS Secrets Manager, HashiCorp Vault, Azure Key Vault.

### Logging strutturato

Sostituisci `morgan` con `pino` per output JSON parsabile da Elasticsearch / Datadog / CloudWatch:

```bash
npm install pino pino-http
```

```javascript
import pinoHttp from 'pino-http';
app.use(pinoHttp());
```

## Roadmap di estensione

- **Refresh token** (15min access + 7d refresh come cookie httpOnly).
- **Password reset via email** (link short-lived).
- **OAuth / Social login** con `passport.js`.
- **RBAC**: middleware `requireRole('admin')` che legge `req.user.role`.
- **Test automatici**: `node:test` o `jest + supertest`.
- **Documentazione API**: OpenAPI / Swagger UI.

## Per sperimentare (compiti per casa)

- Aggiungi un endpoint `GET /api/users/count` (protetto da `verifyToken`) che ritorna il numero di utenti.
- Implementa il middleware `requireRole('admin')` e proteggi `GET /api/users` (lista completa).
- Aggiungi un campo `bio` allo schema e gestiscilo nel `PUT /me`.
- Scrivi un test del `authService.login` con `node:test` e un mock del repository.

## E adesso?

Fai un **push del progetto sul tuo GitHub personale**. Mettilo nel CV e in LinkedIn. È un progetto piccolo ma con tutto: autenticazione vera, sicura, organizzata a layer. Vale più di 50 "hello world".

Buona carriera.
