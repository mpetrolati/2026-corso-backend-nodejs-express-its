# Corso Node.js + Express + JWT — Codice Giorno 1, Parte 2

Esempi di codice usati durante le seconde 2 ore del Giorno 1 del corso, dedicate a Express, routing, middleware, struttura del progetto e un primo CRUD in memoria.

## Indice degli esempi

| Cartella | Argomento | Slide |
|---|---|---|
| `01-express-hello/` | Primo server Express con ESM e nodemon | Slide 11 |
| `02-express-routing/` | Routing dichiarativo: GET, POST, parametri, query, body JSON | Slide 17 |
| `03-express-middleware/` | Middleware custom (logger, durata), built-in, terze parti (morgan) | Slide 22 |
| `04-express-router/` | `express.Router()`, struttura a cartelle, separazione `app.js` / `server.js` | Slide 27 |
| `05-express-crud-inmem/` | CRUD in-memory di utenti finti con catch-all 404 | Slide 33 |

## Prerequisiti

- Node.js 20+ (LTS, scaricabile da [nodejs.org](https://nodejs.org))
- Un terminale (Terminal su macOS/Linux, PowerShell o cmd su Windows)
- Un editor (VS Code consigliato)
- Postman oppure l'estensione **REST Client** di VS Code per testare gli endpoint

## Come usare gli esempi

Ogni cartella è un mini-progetto autonomo. Il flusso è sempre lo stesso:

```bash
# 1. Entra nella cartella dell'esempio
cd 01-express-hello

# 2. Installa le dipendenze
npm install

# 3. Avvia il server in modalità sviluppo (con riavvio automatico)
npm run dev

# Oppure in modalità "produzione" (senza nodemon)
npm start
```

Poi apri il browser su [http://localhost:3000](http://localhost:3000) (o l'URL indicato nel terminale).

## Convenzioni del corso

- Tutti gli esempi usano **ES Modules** (`"type": "module"` + `import/export`).
- I file usano sempre l'estensione `.js` negli import (requisito ESM).
- Le porte usate sono **3000** in tutti gli esempi.
- Commenti in italiano per facilitare lo studio.
- Ogni cartella ha un `README.md` con istruzioni e punti chiave.

## Per chi vuole sperimentare

Idee di esercizi extra (non obbligatori) per fissare i concetti:

- **02-express-routing**: aggiungere un endpoint `GET /api/somma?a=2&b=3` che ritorna la somma come JSON.
- **03-express-middleware**: scrivere un middleware `richiediHeader('X-Client-Id')` che restituisce 400 se manca l'header.
- **04-express-router**: spostare le route utility in un router separato e montarlo sotto `/util`.
- **05-express-crud-inmem**: aggiungere la route `GET /api/users/search?nome=X` che filtra l'array (attenzione all'ordine di dichiarazione rispetto a `/:id`).
