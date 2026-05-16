# 05 — CRUD in-memory di utenti finti

Il CRUD completo costruito in aula: anteprima della struttura del progetto finale (Auth API) ma senza database vero, senza validazione formale, senza autenticazione. Tutto vive in un array JavaScript.

## Esecuzione

```bash
npm install
npm run dev
```

## Struttura del progetto

```
src/
├── data/
│   └── userStore.js       ← il "DB" in memoria (anteprima repository pattern)
├── routes/
│   └── userRoutes.js      ← CRUD su /api/users
├── app.js                 ← configurazione + monta il router + catch-all 404
└── server.js              ← entry point
```

## Endpoint

| Metodo | Path | Cosa fa | Status |
|---|---|---|---|
| `GET`    | `/api/users` | Lista utenti | 200 |
| `GET`    | `/api/users/search?nome=mario` | Cerca per nome (contiene) | 200 |
| `GET`    | `/api/users/:id` | Singolo utente | 200 / 404 |
| `POST`   | `/api/users` | Crea utente | 201 / 400 |
| `PUT`    | `/api/users/:id` | Aggiorna utente | 200 / 404 |
| `DELETE` | `/api/users/:id` | Elimina utente | 204 / 404 |
| `*`      | qualsiasi altra | Catch-all | 404 |

## Sequenza di test in aula

Con Postman o REST Client, in ordine:

1. **Lista iniziale**
   ```
   GET http://localhost:3000/api/users
   ```

2. **Creazione**
   ```
   POST http://localhost:3000/api/users
   Content-Type: application/json

   { "name": "Anna Verdi", "email": "anna@example.com" }
   ```
   Risposta: **201 Created** con l'utente creato (id 3).

3. **Rilettura della lista** (ora con 3 utenti)
   ```
   GET http://localhost:3000/api/users
   ```

4. **Aggiornamento parziale**
   ```
   PUT http://localhost:3000/api/users/3
   Content-Type: application/json

   { "name": "Anna Verdi Junior" }
   ```

5. **Eliminazione**
   ```
   DELETE http://localhost:3000/api/users/3
   ```
   Risposta: **204 No Content**, body vuoto.

6. **Verifica**: la lista è di nuovo di 2 utenti.

7. **Test 404**
   ```
   GET http://localhost:3000/api/users/999
   GET http://localhost:3000/api/non-esiste
   ```

## Punti chiave

- **Repository pattern in anteprima**: tutta la conoscenza dei dati è nel solo file `userStore.js`. Le route lo chiamano come una libreria, senza sapere se sotto c'è un array, SQLite, o Postgres. Domani sostituiremo il file senza toccare nessuna route.
- **Ordine di dichiarazione delle route**: la route `/search` (path fisso) deve venire **prima** di `/:id` (path con parametro), altrimenti Express tratta "search" come un id e finisci sempre in 404.
- **Status code corretti**: 200 lettura riuscita, 201 creazione, 204 cancellazione senza body, 400 input invalido, 404 risorsa non trovata.
- **Catch-all 404**: un middleware senza path registrato per ultimo, che cattura qualunque richiesta non gestita dalle route.

## Limite voluto

Se fermi e riavvii il server (`Ctrl+C` + `npm run dev`), l'array torna al contenuto iniziale: i dati vivono solo finché vive il processo Node. Esattamente quello che vogliamo per oggi: dal Giorno 2 useremo SQLite e i dati saranno persistenti su disco.

## Per sperimentare

- Aggiungi un campo `role` opzionale alla creazione, default `'user'`.
- Implementa `count()` nel `userStore` e l'endpoint `GET /api/users/stats` che ritorna `{ totale: N }`.
- Sposta la validazione minimale dentro un middleware riutilizzabile (`src/middlewares/validateUser.js`).
