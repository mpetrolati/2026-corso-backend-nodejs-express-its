# 02 — Routing con Express

Refactor in Express del server del Giorno 1, con l'aggiunta di parametri di route e body JSON.

## Esecuzione

```bash
npm install
npm run dev
```

## Endpoint disponibili

| Metodo | Path | Cosa fa |
|---|---|---|
| `GET`  | `/` | Risponde con "Home" |
| `GET`  | `/about` | Risponde con "About" |
| `GET`  | `/saluta?nome=Mario` | Risponde con "Ciao Mario!" |
| `GET`  | `/users/:id` | Risponde con `{ id, name }` |
| `POST` | `/echo` | Risponde con il body ricevuto, decorato |
| `POST` | `/users` | Crea un utente (201) o restituisce 400 se mancano i campi |

## Test rapido con curl

```bash
curl http://localhost:3000/saluta?nome=Anna
curl http://localhost:3000/users/42

curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"messaggio":"ciao mondo"}'

curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Anna Verdi","email":"anna@example.com"}'
```

## Punti chiave

- `app.use(express.json())` va **prima** delle route, altrimenti `req.body` è `undefined`.
- I parametri di route e di query arrivano sempre come **stringhe**: convertili con `Number(...)` o `parseInt(...)` se ti serve un numero.
- `res.status(201).json(...)` è il pattern corretto per la creazione.
- `return res.status(400).json(...)` evita di rispondere due volte alla stessa richiesta.

## Per sperimentare

- Aggiungi `GET /api/somma?a=2&b=3` che ritorna `{ risultato: 5 }`.
- Aggiungi `PUT /users/:id` e `DELETE /users/:id` come esercizio.
