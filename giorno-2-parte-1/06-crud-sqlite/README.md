# 06 — CRUD completo su SQLite via repository

Il CRUD del Giorno 1 (parte 2, esempio 05) rifattorizzato per usare SQLite con il pattern repository e l'error handler centralizzato. È **lo scheletro su cui il pomeriggio innesteremo `bcrypt`, validazione e l'endpoint di registrazione**.

## Esecuzione

```bash
npm install
npm run dev
```

Il file `data/app.db` viene creato al primo avvio. Il `.gitignore` esclude `data/` e `*.db`.

## Struttura del progetto

```
src/
├── db/
│   ├── connection.js     ← apertura SQLite + bootstrap schema
│   └── schema.sql        ← DDL della tabella users
├── repositories/
│   └── userRepository.js ← UNICO punto col DB
├── routes/
│   └── userRoutes.js     ← CRUD su /api/users (uses asyncHandler + AppError)
├── middlewares/
│   └── errorHandler.js   ← gestione errori + mapping UNIQUE → 409
├── utils/
│   ├── AppError.js
│   └── asyncHandler.js
├── app.js
└── server.js
```

## Endpoint

| Metodo | Path | Cosa fa | Status |
|---|---|---|---|
| `GET`    | `/api/users` | Lista utenti | 200 |
| `GET`    | `/api/users/:id` | Singolo utente | 200 / 404 |
| `POST`   | `/api/users` | Crea utente | 201 / 400 / 409 |
| `PUT`    | `/api/users/:id` | Aggiorna utente | 200 / 404 |
| `DELETE` | `/api/users/:id` | Elimina utente | 204 / 404 |
| `*`      | qualsiasi altra | Catch-all | 404 |

## Sequenza di test in aula

```bash
# 1) Lista (vuota all'inizio)
curl http://localhost:3000/api/users

# 2) Creo Mario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"segreta","name":"Mario Rossi"}'
# 201 + l'utente creato (senza password_hash!)

# 3) Provo a creare un altro utente con la STESSA email
curl -i -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"altra"}'
# 409 Conflict, mappato dall'error handler dal codice SQLITE_CONSTRAINT_UNIQUE

# 4) Aggiorno il nome di Mario (id=1)
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mario Rossi Junior"}'

# 5) Cerco un utente che non esiste
curl -i http://localhost:3000/api/users/999
# 404 con {"errore":"Utente non trovato"}

# 6) Cancello Mario
curl -X DELETE http://localhost:3000/api/users/1
# 204 No Content

# 7) Verifico
curl http://localhost:3000/api/users
# []
```

## Apri il file con DB Browser for SQLite

Mentre il server gira, apri `data/app.db` con [DB Browser](https://sqlitebrowser.org). Vedrai le righe apparire e sparire in tempo reale. È il momento "guardiamo davvero dentro al database" che fissa un sacco di concetti.

## Punti chiave da fissare

- **Le route sono praticamente identiche** a quelle del Giorno 1 parte 2 esempio 05 (CRUD in-memory). Cambia solo l'import: prima `store`, ora `userRepository`. È il superpotere del pattern repository.
- **Il client non vede mai `password_hash`**: `toSafeUser()` lo toglie prima di mandare la risposta. Nel pomeriggio sposteremo questa logica in un `userService`.
- **Il vincolo UNIQUE su email viene gestito dall'error handler**, non da check applicativi: codice SQLite `SQLITE_CONSTRAINT_UNIQUE` mappato a `409 Conflict`. Difesa a livello DB, risposta uniforme al client.
- **`asyncHandler` ci permette di scrivere `throw new AppError(...)`** dentro le route senza `try/catch`. Express cattura il throw via promise rifiutata.

## ATTENZIONE: la password NON è ancora hashata

Nel `POST /api/users` di questo esempio scriviamo nel DB una password fake hashata (`not-bcrypt-yet:...`). **Questo è volutamente sbagliato**: serve solo per far girare il CRUD oggi. Domani pomeriggio:

1. Installeremo `bcrypt`.
2. Sostituiremo `fakePasswordHash` con `await bcrypt.hash(password, BCRYPT_ROUNDS)`.
3. Sposteremo questa logica in un `authService.register()` dedicato.

Da quel momento le password saranno gestite correttamente.

## Per sperimentare

- Aggiungi `GET /api/users/stats` che ritorna `{ totale: N }` usando un nuovo `count()` nel repository.
- Aggiungi `GET /api/users/search?q=mario` che cerca per nome (usa `LIKE ?` con placeholder).
- Sposta `toSafeUser` in un `userService.js` con metodi `getProfile(id)`, `listAll()`, `createUser(...)`, e fa diventare le route ancora più magre.
- Aggiungi un middleware di logging che salva ogni richiesta su un file (`fs.appendFile`).
