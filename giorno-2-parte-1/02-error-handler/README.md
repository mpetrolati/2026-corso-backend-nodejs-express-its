# 02 — Error handler centralizzato

`AppError` + `asyncHandler` + un solo middleware `errorHandler` che cattura tutto e risponde con JSON uniforme.

## Esecuzione

```bash
npm install
npm run dev
```

## Endpoint disponibili

| Metodo | Path | Cosa fa | Status atteso |
|---|---|---|---|
| `GET`  | `/users/1` | Utente esistente | 200 |
| `GET`  | `/users/999` | Utente inesistente | 404 |
| `POST` | `/users` (con name) | Crea | 201 |
| `POST` | `/users` (senza name) | Input mancante | 400 |
| `GET`  | `/boom` | Promise rifiutata | 500 |
| `GET`  | `/throw` | Eccezione lanciata | 418 |
| `*`    | qualsiasi altra | Catch-all | 404 |

## Test con curl

```bash
# Caso 200
curl http://localhost:3000/users/1

# Caso 404 con messaggio uniforme
curl -i http://localhost:3000/users/999
# HTTP/1.1 404 Not Found
# {"errore":"Utente non trovato"}

# Caso 400
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" -d '{}'
# {"errore":"Il campo name e obbligatorio"}

# Caso 500 (promise rifiutata, catturata da asyncHandler)
curl -i http://localhost:3000/boom
# HTTP/1.1 500 Internal Server Error
# {"errore":"Qualcosa e esploso"}

# Caso 418 (eccezione lanciata in async)
curl -i http://localhost:3000/throw
# HTTP/1.1 418 I'm a teapot
# {"errore":"Errore di test"}
```

## Punti chiave

- **`AppError`** estende `Error` e aggiunge `statusCode`. Permette di costruire errori in una riga: `new AppError('Non trovato', 404)`.
- **`asyncHandler`** wrappa un controller async e cattura le promise rifiutate, passandole all'`errorHandler` via `next(err)`. Senza, dovresti scrivere `try/catch` in ogni controller.
- **`errorHandler`** ha la firma `(err, req, res, next)` (4 parametri): Express lo riconosce dalla firma e lo invoca solo quando qualche middleware fa `next(err)` o quando una promise rifiuta dentro un `asyncHandler`.
- **L'ordine in `app.js`**: prima i parser e i middleware, poi le route, poi il catch-all 404, poi `errorHandler` ultimissimo.

## Punto da fissare

Una sola scrittura di risposta JSON in tutto il server (`{ errore: ... }`).
Un solo formato di errore per tutto il client. Niente più "ogni controller fa di testa sua".

## Per sperimentare

- Estendi `AppError` in `ValidationError extends AppError` con `statusCode = 400` di default. Usala nella POST.
- Aggiungi un campo `code` al payload di risposta (es. `USER_NOT_FOUND`, `VALIDATION_ERROR`). Cresce di valore enorme quando il client deve mappare errori a messaggi tradotti.
