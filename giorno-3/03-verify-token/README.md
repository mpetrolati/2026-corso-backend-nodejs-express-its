# 03 — Middleware verifyToken

App minimale con un endpoint "demo" che genera token al volo (per testing) e una route protetta da `verifyToken`. Serve per esercitare TUTTI i casi d'errore del middleware senza dover prima registrare/loggare.

## Esecuzione

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoint

| Metodo | Path | Cosa fa | Protetto? |
|---|---|---|---|
| `GET`  | `/` | Risposta pubblica | No |
| `POST` | `/token` | Genera un token con il body come payload | No |
| `GET`  | `/protected` | Ritorna `req.user` se il token è valido | **Sì** |

## Tutti i casi d'errore (uno per scenario)

### 1) Genera un token valido

```bash
TOKEN=$(curl -s -X POST http://localhost:3000/token \
  -H "Content-Type: application/json" \
  -d '{"userId":42,"email":"demo@example.com"}' | jq -r .token)
echo $TOKEN
```

### 2) Happy path → 200

```bash
curl -i http://localhost:3000/protected -H "Authorization: Bearer $TOKEN"
# HTTP/1.1 200 OK
# { "messaggio": "Sei dentro!", "sei": { "userId": 42, ... } }
```

### 3) Senza header → 401 Token mancante

```bash
curl -i http://localhost:3000/protected
# HTTP/1.1 401 Unauthorized
# { "errore": "Token mancante" }
```

### 4) Header malformato → 401 Formato header non valido

```bash
curl -i http://localhost:3000/protected -H "Authorization: $TOKEN"   # senza "Bearer "
# { "errore": "Formato header non valido" }
```

### 5) Firma manomessa → 401 Token non valido

Prendi il `$TOKEN` e cambia un carattere alla fine (la firma):

```bash
curl -i http://localhost:3000/protected -H "Authorization: Bearer ${TOKEN}XXX"
# { "errore": "Token non valido" }
```

### 6) Token scaduto → 401 Token scaduto

Cambia `JWT_EXPIRES_IN=2s` nel `.env`, riavvia, genera un token, aspetta 3 secondi:

```bash
sleep 3
curl -i http://localhost:3000/protected -H "Authorization: Bearer $TOKEN"
# { "errore": "Token scaduto" }
```

### 7) Token firmato con secret diverso → 401 Token non valido

Modifica temporaneamente `JWT_SECRET` nel `.env`, **riavvia il server**, prova il vecchio token:

```bash
curl -i http://localhost:3000/protected -H "Authorization: Bearer $TOKEN"
# { "errore": "Token non valido" }
```

(Riporta poi il secret al valore originale per non rompere altri esempi.)

## Punti chiave

- **`algorithms: ['HS256']`** in `jwt.verify`: white-list dell'algoritmo. Evita `none algorithm attack`, dove un attaccante manda un token con `alg: none` per by-passare la firma.
- **Tutti i casi → 401 + messaggio generico**: token mancante, header malformato, firma invalida, token scaduto. Il client non deve capire COSA non funziona, deve solo sapere che non è autenticato.
- **`req.user` viene popolato** dal middleware: i controller successivi possono leggerlo.
- **Il middleware non chiama il DB**: la verifica è solo crittografica. Niente lookup. Niente latenza. È il superpotere dei JWT stateless.

## Per sperimentare

- Aggiungi un middleware `requireRole(role)` che legge `req.user.role` (tu lo metti nel payload del `/token`) e ritorna 403 se non match. È la base di RBAC.
- Sposta la generazione del token in un endpoint protetto (es. `POST /api/auth/login`) dove richiedi credenziali vere.
- Aggiungi un payload claim `iss` (issuer) e verifica anche quello (`jwt.verify(token, secret, { issuer: 'my-app' })`).
