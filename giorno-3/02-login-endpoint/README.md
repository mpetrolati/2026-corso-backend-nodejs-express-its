# 02 — POST /api/auth/login

Estende la `POST /api/auth/register` del Giorno 2 con il nuovo endpoint di **login**: verifica credenziali con `bcrypt.compare`, genera token JWT con `jsonwebtoken`. Include il pattern anti user-enumeration.

## Esecuzione

```bash
cp .env.example .env
npm install
npm run dev
```

## Endpoint

| Metodo | Path | Cosa fa | Status |
|---|---|---|---|
| `POST` | `/api/auth/register` | Crea un utente (come Giorno 2) | 201 / 400 / 409 |
| `POST` | `/api/auth/login` | Verifica credenziali, ritorna JWT | 200 / 400 / 401 |

## Sequenza di test

```bash
# 1) Registra un utente
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123","name":"Mario"}'

# 2) Login con credenziali corrette
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"Password123"}'
# → 200 con { token, expiresIn, user }

# 3) Login con password sbagliata
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mario@example.com","password":"sbagliata"}'
# → 401 Credenziali non valide

# 4) Login con email inesistente (stesso messaggio: anti-enumeration)
curl -i -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"non-esiste@example.com","password":"qualsiasi"}'
# → 401 Credenziali non valide  (NON "Email inesistente"!)
```

## Verifica il token su jwt.io

Copia il token ricevuto dal login, vai su [jwt.io](https://jwt.io), incollalo. Vedrai:

- **Header**: `{ "alg": "HS256", "typ": "JWT" }`
- **Payload**: `{ "userId": 1, "email": "mario@example.com", "iat": ..., "exp": ... }`
- **Signature**: la firma opaca

Prova a cambiare un carattere del payload o della signature: jwt.io te lo segnala come **Invalid Signature**.

## Punti chiave

- **`generateToken` è un wrapper su `jwt.sign`** che legge secret e durata dall'env. Isolare la libreria in un file paga il giorno che vuoi cambiarla.
- **User enumeration attack**: stesso messaggio per "email inesistente" e "password sbagliata". Niente 404 vs 401 differenti.
- **`{ algorithms: ['HS256'] }` su `verify`**: white-list-are l'algoritmo è una buona pratica anti `none algorithm attack`.
- **Il payload contiene solo `userId` ed `email`**. Mai dati sensibili. Il payload è leggibile da chiunque.

## Per sperimentare

- Aggiungi `role` al payload del token. Verificalo decodificando il token su jwt.io.
- Cambia `JWT_EXPIRES_IN=10s` nel `.env` e prova a usare un token dopo 10 secondi: il prossimo capitolo (verifyToken) lo rifiuta.
- Logga il numero di tentativi di login falliti in console — anticipa il discorso del rate limiting.
