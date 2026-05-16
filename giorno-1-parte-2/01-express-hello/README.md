# 01 — Primo server Express

Il più semplice server Express possibile, con setup ESM, struttura `src/app.js` + `src/server.js`, e supporto a `nodemon` in sviluppo.

## Esecuzione

```bash
npm install
npm run dev   # con riavvio automatico (nodemon)
# oppure
npm start     # senza nodemon
```

Poi apri il browser su [http://localhost:3000](http://localhost:3000): vedrai "Hello Express!".

## Punti chiave

- `"type": "module"` nel `package.json` abilita ES Modules: niente più `require()`.
- L'estensione `.js` negli import (`'./app.js'`) è **obbligatoria** in ESM.
- `app.js` costruisce l'app e la esporta; `server.js` la importa e fa partire il listener.
- Questa separazione paga quando arrivano i test e quando devi cambiare il modo di avvio.

## Trappola tipica

Se vedi questo errore:

```
SyntaxError: Cannot use import statement outside a module
```

Significa che hai dimenticato `"type": "module"` nel `package.json`.

## Per sperimentare

- Aggiungi una seconda route, ad esempio `GET /ciao` che risponde con `"Ciao mondo!"`.
- Cambia la porta da 3000 a 4000 e verifica che il messaggio nel terminale rifletta il cambiamento.
