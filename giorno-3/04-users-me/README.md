# 04 — Route protette: GET, PUT, DELETE /api/users/me

Estende il login del capitolo 2 con le tre route protette del profilo utente. Mostra come `req.user` (popolato da `verifyToken`) si usa nei controller, e come il service filtra i campi pubblici (anti parameter pollution).

## Esecuzione

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoint

| Metodo | Path | Protetto? | Cosa fa |
|---|---|---|---|
| `POST`   | `/api/auth/register` | No | Crea utente |
| `POST`   | `/api/auth/login` | No | Verifica credenziali, ritorna JWT |
| `GET`    | `/api/users/me` | **Sì** | Profilo dell'utente loggato |
| `PUT`    | `/api/users/me` | **Sì** | Aggiorna name e/o password |
| `DELETE` | `/api/users/me` | **Sì** | Cancella l'account |

## Sequenza di test

```bash
# 1) Registrazione
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123","name":"Mario"}'

# 2) Login e salva il token
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123"}' | jq -r .token)
echo "Token: $TOKEN"

# 3) Leggi il profilo
curl http://localhost:3000/api/users/me -H "Authorization: Bearer $TOKEN"

# 4) Aggiorna il nome
curl -X PUT http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mario Junior"}'

# 5) Prova a cambiare role (verrà IGNORATO dal service)
curl -X PUT http://localhost:3000/api/users/me \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}'
# Il role resta "user"!

# 6) Senza token → 401
curl -i http://localhost:3000/api/users/me
# { "errore": "Token mancante" }

# 7) Cancella l'account
curl -X DELETE http://localhost:3000/api/users/me -H "Authorization: Bearer $TOKEN"
# 204 No Content

# 8) Ora il profilo non esiste più
curl -i http://localhost:3000/api/users/me -H "Authorization: Bearer $TOKEN"
# 404 Utente non trovato
```

## Punti chiave

- **`router.use(verifyToken)`**: tutte le route del router sono protette con una sola riga.
- **`req.user.userId`** arriva direttamente dal payload del JWT. Il controller lo usa senza dover fare lookup nel DB.
- **Il service filtra esplicitamente i campi**: solo `name` e `password` sono modificabili. `role` e `email` vengono ignorati anche se presenti nel body (difesa anti parameter pollution).
- **La password viene rihashata** nel service se aggiornata. Mai memorizzata in chiaro.
- **DELETE → 204 No Content**: status code REST corretto per "fatto, niente da dire".

## Per sperimentare

- Aggiungi un endpoint `GET /api/users` (lista di tutti gli utenti) protetto da `verifyToken` + un middleware `requireRole('admin')` che leggi `req.user.role` e ritorni 403 se non admin.
- Aggiungi un campo `bio` allo schema e supportalo in `updateProfile`.
- Logga in `userService.deleteAccount` la cancellazione (con `req.user.userId`) per audit.
