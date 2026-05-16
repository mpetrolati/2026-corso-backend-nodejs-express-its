# 02 — dotenv + config/env.js con fail-fast

Setup standard per gestire la configurazione di un'app Node. Tutto in un file `.env` non committato, letto via `dotenv`, centralizzato in `config/env.js` con crash all'avvio se manca una variabile obbligatoria.

## Esecuzione

```bash
# 1) Crea il tuo .env dal template
cp .env.example .env

# 2) Apri .env e personalizza i valori se vuoi

# 3) Installa e lancia
npm install
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000) e vedrai un JSON con la configurazione (senza il `JWT_SECRET` vero — solo la sua lunghezza).

## Prova il fail-fast

Cancella temporaneamente la riga `JWT_SECRET=...` dal `.env` e rilancia. Vedrai:

```
[config] Variabile d'ambiente mancante: JWT_SECRET
Crea un file .env (vedi .env.example) o setta la variabile a livello di sistema.
```

E il processo si chiude con `exit(1)`. Esattamente quello che vogliamo: **meglio crashare al boot con un messaggio chiaro, che andare in produzione e ricevere errori misteriosi alla prima richiesta**.

## Punti chiave

- **`import 'dotenv/config'`** (in cima al file) carica il `.env` dentro `process.env`. La sintassi `import '<pacchetto>/config'` esegue il side-effect del modulo senza importare nulla esplicitamente — è la forma raccomandata in ESM.
- **`required(name)`** è un piccolo helper per leggere variabili obbligatorie con fail-fast.
- **Le variabili opzionali** hanno un default (es. `PORT || '3000'`). Aiuta a far girare l'app anche senza `.env` per quei valori non critici.
- **`config/env.js` è il PUNTO UNICO** dove `process.env` viene letto. Tutti gli altri file importano da qui. Vantaggio: se cambi nome a una variabile o aggiungi un default, modifichi un solo file.
- **In produzione**, il `.env` non esiste. Le variabili arrivano da Docker, Render, Heroku, ecc. `dotenv` non fa nulla se il file non c'è, è transparente.

## Trappola: `.env` committato per sbaglio

Se l'hai già committato:

1. **Rigenera tutti i secret** che c'erano dentro (la cronologia Git li conserva).
2. Aggiungilo a `.gitignore`.
3. `git rm --cached .env` (toglie il file dal tracking, lo lascia sul disco).
4. Commit.

Lo storico Git conserva comunque le vecchie versioni. Per rimuoverle del tutto serve `git filter-repo` (avanzato).

## Per sperimentare

- Aggiungi una validazione: se `NODE_ENV=production`, allora `JWT_SECRET` deve essere lungo almeno 32 caratteri. Falla nel `config/env.js`.
- Aggiungi un campo `corsOrigin` letto da `CORS_ORIGIN` con default `*`. (lo useremo quando colleghermo un frontend).
- Logga in formato JSON la configurazione al boot: utile per pipeline di log che parsano JSON.
