# 03 — Middleware in Express

Tutti i tipi di middleware in un unico server: built-in (`express.json`), di terze parti (`morgan`), custom (`durata`) e factory (`richiediHeader`).

## Esecuzione

```bash
npm install
npm run dev
```

## Endpoint disponibili

| Metodo | Path | Header richiesti |
|---|---|---|
| `GET`  | `/` | nessuno |
| `GET`  | `/api/info` | `X-Client-Id` |
| `POST` | `/api/echo` | `X-Client-Id`, `Content-Type: application/json` |

## Test con curl

Senza l'header richiesto, ricevi 400:

```bash
curl http://localhost:3000/api/info
# {"errore":"Manca header X-Client-Id"}
```

Con l'header, tutto funziona:

```bash
curl http://localhost:3000/api/info -H "X-Client-Id: pippo"
# {"versione":"1.0.0","clientId":"pippo"}
```

## Punti chiave

- **L'ordine conta**: i middleware vengono eseguiti nell'ordine in cui sono registrati con `app.use()`. Se sposti `express.json()` dopo le route, `req.body` sarà `undefined`.
- **Il middleware factory** è una funzione che ritorna un altro middleware. Pattern utilissimo per parametrizzare il comportamento (es. nome dell'header, ruolo richiesto, eccetera).
- **Il middleware `durata`** si aggancia all'evento `finish` di `res`. Non blocca la pipeline: chiama `next()` subito e logga quando la risposta è completata.

## Output che vedrai nel terminale

```
GET / 200 4.123 ms - 33                  <-- morgan
GET / -> 200 (5ms)                       <-- durata
GET /api/info 400 1.876 ms - 38          <-- morgan (manca header)
GET /api/info -> 400 (3ms)               <-- durata
```

## Per sperimentare

- Inverti l'ordine di `app.use(express.json())` e `app.post(...)`: noterai che `req.body` diventa `undefined`.
- Scrivi un altro middleware factory `richiediQueryParam('apiKey')` che restituisce 400 se manca un parametro di query.
