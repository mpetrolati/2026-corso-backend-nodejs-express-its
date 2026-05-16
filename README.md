# Codice di esempio del corso

Tutti gli esempi di codice del **Corso Node.js + Express + JWT (Edizione 2026)**, organizzati per giorno e per blocco di lezione.

Repository pubblico di riferimento:

```
https://github.com/mpetrolati/2026-corso-backend-nodejs-express-its
```

Clona il repository all'inizio del Giorno 1 e tienilo aperto in aula come riferimento:

```bash
git clone https://github.com/mpetrolati/2026-corso-backend-nodejs-express-its.git
cd 2026-corso-backend-nodejs-express-its
```

## Struttura

Il corso dura 3 giorni e produce, alla fine, un'**API REST di autenticazione** (Auth API) costruita con Express, SQLite, bcrypt e JWT, organizzata a layer. Gli esempi seguono il percorso passo-passo.

```
codice-esempi/
├── giorno-1/                 → Parte 1: dal modulo http nudo a Express
├── giorno-1-parte-2/         → Parte 2: Express base
├── giorno-2-parte-1/         → Parte 1 Giorno 2: middleware + SQLite
├── giorno-2-parte-2/         → Parte 2 Giorno 2: validazione + bcrypt + register
└── giorno-3/                 → Giorno 3: JWT + login + route protette
```

Ogni sottocartella ha un suo `README.md` con la lista dettagliata dei mini-progetti, gli endpoint, gli esempi di chiamata `curl` e qualche idea di esercizio extra.

## Indice dei mini-progetti

### Giorno 1 — Parte 1 (2h) — Fondamenti di Node.js

| Cartella | Argomento |
|---|---|
| `01-hello/` | Il primo script Node, `console.log`, `process.argv`. |
| `02-event-loop/` | `setTimeout`, `setImmediate`, microtask vs macrotask. |
| `03-modules/` | ES Modules, `import`/`export`, perché `.js` è obbligatorio. |
| `04-core-modules/` | `fs`, `path`, `os`, `url`: i moduli built-in più usati. |
| `05-npm-intro/` | `npm init`, `package.json`, dipendenze, script. |
| `06-http-hello/` | Server HTTP minimale col modulo core `http`. |
| `07-http-routing/` | Routing manuale con `req.url` e `req.method`. |
| `08-http-get-params/` | Query string e parsing con `URL`. |
| `09-http-post-body/` | Lettura del body di una `POST` a stream. |

### Giorno 1 — Parte 2 (2h) — Express base

| Cartella | Argomento |
|---|---|
| `01-express-hello/` | Da `http` a Express: stesso server, codice ridotto. |
| `02-express-routing/` | Route, parametri di path, query string. |
| `03-express-middleware/` | Cos'è un middleware, ordine di esecuzione, `next()`. |
| `04-express-router/` | Modularizzazione con `express.Router`. |
| `05-express-crud-inmem/` | CRUD completo `GET/POST/PUT/DELETE` su array in memoria. |

### Giorno 2 — Parte 1 (2h) — Middleware + SQLite

| Cartella | Argomento |
|---|---|
| `01-middleware-tipi/` | Application, router, error e built-in middleware. |
| `02-error-handler/` | Gestione centralizzata degli errori con 4 argomenti. |
| `03-sqlite-base/` | Apertura DB con `sqlite3` + `sqlite` (binari precompilati per Windows), prime query async/await. |
| `04-schema-users/` | DDL della tabella `users`, vincoli, indice unico su `email`. |
| `05-user-repository/` | Repository pattern: separare le query dalla logica. |
| `06-crud-sqlite/` | CRUD persistente su SQLite, layer route/repository. |

### Giorno 2 — Parte 2 (2h) — Validazione + bcrypt + register

| Cartella | Argomento |
|---|---|
| `01-express-validator/` | Regole, `validationResult`, risposte 400 ben formattate. |
| `02-dotenv-config/` | Configurazione via `.env`, `process.env`, `.env.example`. |
| `03-bcrypt-playground/` | `hash`, `compare`, work factor, esempi di benchmarking. |
| `04-auth-service-register/` | Service layer: regole di business per la registrazione. |
| `05-register-endpoint-completo/` | `POST /auth/register` end-to-end con validator + service + repository. |

### Giorno 3 (3h) — JWT + login + route protette

| Cartella | Argomento |
|---|---|
| `01-jwt-base/` | `jsonwebtoken`: `sign`, `verify`, struttura del token. |
| `02-login-endpoint/` | `POST /api/auth/login` con `bcrypt.compare` e anti-enumeration. |
| `03-verify-token/` | Middleware `verifyToken` che popola `req.user`. |
| `04-users-me/` | Route protette `GET /api/users/me` e `PUT /api/users/me`. |
| `05-auth-api-completa/` | Il progetto finale: tutto integrato + Postman collection. |

## Convenzioni applicate dappertutto

Tutti i mini-progetti seguono le stesse regole, in modo che passare da uno all'altro sia indolore.

- **ES Modules** ovunque (`"type": "module"` nel `package.json`).
- **Estensione `.js` obbligatoria** negli import (`import x from './x.js'`).
- **Porta 3000** in tutti gli esempi.
- **Italiano** nei commenti e nei testi.
- **Struttura a layer** che cresce con il corso:
  - Giorno 1: `routes/` + `app.js` + `server.js`.
  - Giorno 2: si aggiungono `controllers/`, `services/`, `repositories/`, `validators/`.
  - Giorno 3: si aggiungono `middlewares/` e `utils/`.
- **Status code REST corretti**: 200, 201, 204, 400, 401, 403, 404, 409, 500.

## Prerequisiti

Per eseguire gli esempi servono:

- **Node.js** 20 LTS o superiore (`node --version` per verificare).
- **npm** 10 o superiore (arriva insieme a Node).
- Un editor (consigliato **VS Code**) e un client HTTP (consigliato **Postman**, oppure `curl` da terminale).
- Da Giorno 2 in poi è necessario lanciare `npm install` dentro la cartella del singolo mini-progetto.

Su Windows non serve installare Visual Studio Build Tools: il modulo `sqlite3` viene installato con binari precompilati, mentre `bcrypt` può essere sostituito da `bcryptjs` in caso di problemi di compilazione (vedi README della cartella `giorno-2-parte-2/`).

## Come eseguire un mini-progetto

Dal terminale, dentro la cartella del singolo esempio:

```bash
npm install        # solo la prima volta, o quando il README lo richiede
npm start          # avvia il server (oppure 'node src/server.js')
```

Il server resta in ascolto su `http://localhost:3000`. Per fermarlo: `Ctrl+C`.

## Mappa di lettura consigliata

Se segui il corso in aula, gli esempi vanno guardati nello stesso ordine della lezione. Se ti vuoi rinfrescare la memoria dopo il corso, l'ordine consigliato è:

1. `giorno-1/06-http-hello` e `giorno-1/09-http-post-body` per ricordarti com'è la vita senza Express.
2. `giorno-1-parte-2/05-express-crud-inmem` per il salto a Express.
3. `giorno-2-parte-1/05-user-repository` per fissare il repository pattern.
4. `giorno-2-parte-2/05-register-endpoint-completo` per vedere validator + service + bcrypt insieme.
5. `giorno-3/05-auth-api-completa` per leggere il progetto finale a layer.

## Docente

**Massimo Petrolati** — Product Manager, Namirial SpA
`m.petrolati@namirial.com`

## Licenza

Il codice è rilasciato per scopi didattici. Sentiti libero di clonarlo, modificarlo e riusarlo per progetti tuoi, anche personali.
