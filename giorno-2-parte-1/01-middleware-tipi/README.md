# 01 — I tre tipi di middleware

Application-level, router-level e factory pattern in un unico server. Mostra anche l'effetto dell'ordine di registrazione.

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

Senza l'header richiesto su `/api`, ricevi 400:

```bash
curl http://localhost:3000/api/info
# {"errore":"Manca header X-Client-Id"}
```

Con l'header, tutto funziona:

```bash
curl http://localhost:3000/api/info -H "X-Client-Id: pippo"
# {"versione":"1.0.0","clientId":"pippo"}
```

Route fuori da `/api` non richiedono l'header:

```bash
curl http://localhost:3000/
# Server con middleware di tre tipi!
```

## Punti chiave

- **Application-level** (`app.use`): vale per tutte le richieste. Qui: `express.json`, `morgan`, `durata`.
- **Router-level** (`router.use`): vale solo per le route di quel router. Qui: il logger `[api]` e il `richiediHeader`.
- **Factory pattern**: `richiediHeader('X-Client-Id')` è una funzione che ritorna un middleware. Permette di configurare il comportamento al volo. È lo stesso pattern di `verifyToken(secret)` che useremo nel Giorno 3.
- **L'ordine conta**: `express.json()` deve venire prima delle route che leggono `req.body`. Se lo sposti dopo, `req.body` diventa `undefined`.

## Output che vedrai nel terminale

```
GET / 200 4.123 ms - 33                  ← morgan
GET / -> 200 (5ms)                       ← durata
[api] GET /info                          ← logger router-level
GET /api/info 200 2.876 ms - 38          ← morgan
GET /api/info -> 200 (3ms)               ← durata
```

## Per sperimentare

- Inverti l'ordine di `express.json()` e l'handler della POST. Vedrai che `req.body` diventa `undefined`.
- Scrivi un altro factory `richiediQueryParam('apiKey')` che restituisce 400 se manca `?apiKey=...`.
