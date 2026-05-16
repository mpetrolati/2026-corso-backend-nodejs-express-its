# 01 — Validazione con express-validator

`authValidators.js` con le regole + `validate.js` come middleware unico per le risposte 400.

## Esecuzione

```bash
npm install
npm run dev
```

## Endpoint disponibili

| Metodo | Path | Validazione |
|---|---|---|
| `GET`  | `/` | nessuna |
| `POST` | `/register` | email + password complessa + name opzionale + role opzionale |
| `POST` | `/login` | email + password presente |
| `POST` | `/echo` | nessuna (per confronto) |

## Test con curl

### Happy path su `/register`

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123","name":"Mario"}'
```

Risposta 200 con il body validato e sanitizzato.

### Email mal formata

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"non-email","password":"Password123"}'
```

```
HTTP/1.1 400 Bad Request
{
  "errore": "Validazione fallita",
  "dettagli": [
    { "campo": "email", "messaggio": "Email non valida" }
  ]
}
```

### Password troppo corta (e errori multipli)

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"x@example.com","password":"abc"}'
```

```
HTTP/1.1 400 Bad Request
{
  "errore": "Validazione fallita",
  "dettagli": [
    { "campo": "password", "messaggio": "Password di almeno 8 caratteri" }
  ]
}
```

### Password senza maiuscola (custom validator)

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"x@example.com","password":"password123"}'
```

```
HTTP/1.1 400 Bad Request
{
  "errore": "Validazione fallita",
  "dettagli": [
    { "campo": "password", "messaggio": "Serve almeno una maiuscola" }
  ]
}
```

### Role non valido

```bash
curl -i -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"x@example.com","password":"Password123","role":"superadmin"}'
```

```
HTTP/1.1 400 Bad Request
{
  "errore": "Validazione fallita",
  "dettagli": [
    { "campo": "role", "messaggio": "role deve essere \"user\" o \"admin\"" }
  ]
}
```

## Punti chiave

- **I validatori vanno nel router come lista di middleware**: Express li esegue in sequenza prima del controller. Se uno fallisce, il valore di errore viene accumulato dentro a `req` ma la pipeline prosegue.
- **`validate` è il punto unico** dove decidi cosa fare con gli errori: nel nostro caso, 400 con elenco. Cambi il formato qui, lo cambi per tutta l'app.
- **`.normalizeEmail()`** è un **sanitizer**: modifica il valore (`MARIO@example.com` → `mario@example.com`). Il controller riceve il valore già pulito.
- **`.custom(fn)`** per regole non coperte dai validatori built-in: lancia `Error` se non va, ritorna `true` se va.

## Per sperimentare

- Aggiungi un validatore per il campo `name` che rifiuta valori che contengono cifre.
- Spezza il custom validator della password in funzioni separate: `containsUppercase()`, `containsNumber()`.
- Estendi `loginValidator` con un controllo sulla lunghezza minima della password.
