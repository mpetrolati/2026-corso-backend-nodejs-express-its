# Corso Node.js + Express + JWT — Codice Giorno 2, Parte 2

Esempi della seconda parte del Giorno 2, dedicata a validazione input, gestione segreti con `dotenv`, hashing password con `bcrypt`, service layer e l'endpoint completo `POST /api/auth/register`.

## Indice degli esempi

| Cartella | Argomento | Slide |
|---|---|---|
| `01-express-validator/` | Validatori a catena, custom validator (password complessa), middleware `validate` | Slide 6 |
| `02-dotenv-config/` | `.env`, `.env.example`, `config/env.js` con **fail-fast** | Slide 10 |
| `03-bcrypt-playground/` | Hash 3 volte la stessa password → hash diversi, ma `compare` sempre `true` | Slide 14 |
| `04-auth-service-register/` | Il service `register` con check duplicato + hash + create + safeUser | Slide 17 |
| `05-register-endpoint-completo/` | L'endpoint **`POST /api/auth/register`** completo, pronto da testare con Postman | Slide 21 |

## Prerequisiti

- Node.js 20+ (LTS)
- Un terminale + un editor (VS Code consigliato)
- Postman o l'estensione REST Client di VS Code
- (Opzionale) **DB Browser for SQLite** per ispezionare il file `app.db`: [sqlitebrowser.org](https://sqlitebrowser.org)

## Come usare gli esempi

Ogni cartella è un mini-progetto autonomo:

```bash
cd 05-register-endpoint-completo
cp .env.example .env       # crea il tuo .env da quello di esempio
npm install
npm run dev
```

L'esempio **05** è il pezzo forte: integra tutti i mattoncini della giornata in un endpoint funzionante e testabile.

## Trappola Windows su bcrypt

`bcrypt` è scritto in C++ e viene compilato durante `npm install`. Se su Windows fallisce:

1. Installa **Visual Studio Build Tools** (gratuito).
2. Riavvia il terminale.
3. Riprova `npm install`.

In alternativa, sostituisci `bcrypt` con `bcryptjs` (puro JS, più lento ma niente compilazione). L'API è identica al 95% — basta cambiare l'import.

## Trappola .env

`.env` contiene segreti reali e **non va MAI committato su Git**. Ogni mini-progetto ha già `.env` nel `.gitignore`. Per condividere la "forma" del file con i colleghi, esiste `.env.example` (con chiavi ma senza valori veri), questo sì committato.

## Convenzioni del corso

- **ES Modules** ovunque (`"type": "module"`).
- L'estensione `.js` negli import è obbligatoria.
- Porta **3000** in tutti gli esempi.
- Tutti i mini-progetti che usano un DB scrivono in `./data/app.db`.
- Commenti in italiano.

## Per chi vuole sperimentare

- **01-express-validator**: aggiungi un validatore per il campo `name` che rifiuta valori che contengono cifre.
- **02-dotenv-config**: aggiungi un check su `NODE_ENV`: se è `production`, `JWT_SECRET` deve essere lungo almeno 32 caratteri.
- **03-bcrypt-playground**: misura quanto ci mette `bcrypt.hash` con `rounds=4`, `10`, `12`, `14`. Capirai perché la scelta dei rounds è un compromesso.
- **04-auth-service-register**: aggiungi un metodo `getProfile(id)` al service che togliere `password_hash` prima di ritornare.
- **05-register-endpoint-completo**: aggiungi un endpoint `GET /api/users/stats` che ritorna `{ totale: N }`. Non richiede ancora autenticazione: domani lo proteggeremo con JWT.
