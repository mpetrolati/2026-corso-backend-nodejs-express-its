# Corso Node.js + Express + JWT — Codice Giorno 2, Parte 1

Esempi di codice usati durante le prime 2 ore del Giorno 2 del corso, dedicate ai middleware avanzati, all'error handler centralizzato, a SQLite con `sqlite3` + `sqlite` e al Repository Pattern.

## Indice degli esempi

| Cartella | Argomento | Slide |
|---|---|---|
| `01-middleware-tipi/` | Application-level, router-level, factory pattern (logger durata, richiediHeader) | Slide 6 |
| `02-error-handler/` | `AppError`, error handler centralizzato, `asyncHandler` per route async | Slide 10 |
| `03-sqlite-base/` | Primi passi con `sqlite3` + `sqlite`: `db.get/.all/.run` con async/await, query parametrizzate | Slide 13 |
| `04-schema-users/` | `schema.sql` + bootstrap della connessione (file `connection.js`) | Slide 18 |
| `05-user-repository/` | Il repository completo con `findByEmail`, `findById`, `create`, `update`, `deleteById` | Slide 23 |
| `06-crud-sqlite/` | Il CRUD del Giorno 1 rifattorizzato su SQLite via repository, con error handler centralizzato | — |

## Prerequisiti

- Node.js 20+ (LTS, scaricabile da [nodejs.org](https://nodejs.org))
- Un terminale (Terminal su macOS/Linux, PowerShell o cmd su Windows)
- Un editor (VS Code consigliato)
- Postman o REST Client per testare gli endpoint
- (Opzionale ma consigliato) **DB Browser for SQLite** per ispezionare il file `app.db`: [sqlitebrowser.org](https://sqlitebrowser.org)

## Come usare gli esempi

Ogni cartella è un mini-progetto autonomo:

```bash
cd 01-middleware-tipi
npm install
npm run dev
```

L'esempio 06 (`06-crud-sqlite`) è il "pezzo forte" della giornata: integra tutti i concetti delle 2 ore in una mini-applicazione funzionante con DB persistente, che useremo come base per il pomeriggio (Parte 2 del Giorno 2).

## Driver SQLite usato

Per evitare problemi di compilazione su Windows, in questo corso usiamo **`sqlite3`** (driver con binari precompilati) combinato col piccolo wrapper **`sqlite`** che espone l'API a Promise/async-await:

- `sqlite3` ha i binari precompilati per Windows, macOS e Linux: `npm install` di solito funziona al primo colpo senza Visual Studio Build Tools.
- `sqlite` trasforma l'API a callback in async/await pulito. Il codice resta vicino a quello che avresti scritto con `better-sqlite3`, ma con `await` davanti.

Se incontri problemi rari di installazione su qualche ambiente, in alternativa puoi provare `node:sqlite` (built-in di Node 22+, sperimentale, richiede `--experimental-sqlite`).

## Convenzioni del corso

- Tutti gli esempi usano **ES Modules** (`"type": "module"` + `import/export`).
- L'estensione `.js` negli import è obbligatoria (requisito ESM).
- Porta **3000** in tutti gli esempi.
- Database SQLite in `./data/app.db` (la cartella `data/` è già nel `.gitignore`).
- Commenti in italiano per facilitare lo studio.
- Ogni cartella ha un `README.md` con istruzioni e punti chiave.

## Per chi vuole sperimentare

- **01-middleware-tipi**: scrivi un middleware `richiediQueryParam('apiKey')` che restituisce 400 se manca il parametro `apiKey`.
- **02-error-handler**: estendi `AppError` in `ValidationError` (statusCode 400) e usala dove serve.
- **03-sqlite-base**: scrivi una funzione `count()` che ritorna il numero totale di righe nella tabella `users`.
- **04-schema-users**: aggiungi un campo opzionale `avatar_url TEXT` allo schema e ricrea il file `.db` (cancellandolo prima).
- **05-user-repository**: aggiungi una funzione `search(q)` che cerca utenti per nome con `LIKE '%q%'`.
- **06-crud-sqlite**: aggiungi un endpoint `GET /api/users/stats` che ritorna `{ totale: N }` usando il `count()` dell'esercizio precedente.
