# Corso Node.js + Express + JWT — Codice Giorno 3

Esempi del Giorno 3 (3 ore): teoria JWT, implementazione di `POST /api/auth/login`, middleware `verifyToken`, route protette `GET/PUT /api/users/me`, e il progetto **Auth API completo** con collection Postman.

## Indice degli esempi

| Cartella | Argomento | Slide |
|---|---|---|
| `01-jwt-base/` | Playground JWT: sign, verify, struttura del token, rotture della firma | Slide 6 |
| `02-login-endpoint/` | `POST /api/auth/login` con anti-enumeration | Slide 10 |
| `03-verify-token/` | Middleware completo con tutti i casi d'errore mappati a 401 | Slide 14 |
| `04-users-me/` | Route protette `GET` e `PUT /api/users/me` con filtro campi pubblici | Slide 18 |
| `05-auth-api-completa/` | **Il progetto finale del corso**: register + login + me + collection Postman | Slide 21 |

## Prerequisiti

- Node.js 20+ (LTS)
- Postman o REST Client (per l'esempio 05)
- DB Browser for SQLite (opzionale ma consigliato): [sqlitebrowser.org](https://sqlitebrowser.org)

## Come usare gli esempi

Ogni cartella è un mini-progetto autonomo:

```bash
cd 05-auth-api-completa
cp .env.example .env       # crea il tuo .env con secret JWT
npm install
npm run dev
```

L'esempio **05** è il pezzo finale del corso: l'API completa, pronta da deployare (con qualche aggiustamento per la produzione).

## La collection Postman

`05-auth-api-completa/postman-collection.json` è una collection completa con sette richieste in sequenza e uno script che salva il token dopo il login. Importala in Postman e lancia il **Runner** per vederle girare in fila.

## Convenzioni del corso

- **ES Modules** (`"type": "module"`).
- Estensione `.js` obbligatoria negli import.
- Porta **3000**.
- Database SQLite in `./data/app.db` (escluso dal Git).
- `.env` mai committato, `.env.example` sì.

## Trappola: secret JWT mancante

Se lanci il server senza il `.env` (o senza `JWT_SECRET` dentro), `config/env.js` fa **fail-fast**:

```
[config] Variabile d'ambiente mancante: JWT_SECRET
```

E il processo si chiude. È voluto: meglio crashare subito con un messaggio chiaro, che andare in produzione senza chiave.

## Per chi vuole sperimentare

- **01-jwt-base**: cambia la chiave di firma e prova a verificare un token firmato con un'altra chiave: vedrai `JsonWebTokenError`.
- **02-login-endpoint**: aggiungi un campo `role` al payload del token. Vedrai apparire in `req.user.role` nel middleware.
- **03-verify-token**: aggiungi un check: se `req.user.role !== 'admin'`, ritorna 403 (anteprima di RBAC).
- **04-users-me**: aggiungi un endpoint `GET /api/users` (lista di tutti gli utenti) protetto da `verifyToken` + un middleware `requireRole('admin')`.
- **05-auth-api-completa**: scrivi qualche test con `node --test` (test runner built-in di Node 22): per esempio test del `authService.login` con mock del repository.
