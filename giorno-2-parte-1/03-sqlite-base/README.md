# 03 — Primi passi con sqlite3 + sqlite

Script standalone (non un server) per prendere confidenza con `db.get/.all/.run` con async/await prima di portarli dentro l'app Express.

Usiamo il driver `sqlite3` (binari precompilati: niente Visual Studio Build Tools su Windows) con il piccolo wrapper `sqlite` che ci dà un'API a Promise.

## Esecuzione

```bash
npm install
npm start
# oppure: node playground.js
```

Lo script:
1. Crea il file `data/app.db`.
2. Crea la tabella `products`.
3. Inserisce 3 prodotti.
4. Legge un singolo prodotto (`db.get`).
5. Legge tutti i prodotti (`db.all`).
6. Filtra per prezzo.
7. Aggiorna un prezzo.
8. Cancella un prodotto.
9. Mostra perché le query parametrizzate proteggono da SQL injection.

## Output atteso

```
=== INSERT ===
Inserito id: 1 righe affette: 1
Inserito id: 2
Inserito id: 3

=== SELECT singolo ===
{ id: 1, name: 'Tastiera', price: 49.9 }

=== SELECT multiplo ===
[
  { id: 1, name: 'Tastiera', price: 49.9 },
  { id: 2, name: 'Mouse', price: 19.5 },
  { id: 3, name: 'Cuffie', price: 89 }
]

...
```

## Punti chiave

- `open({ filename, driver: sqlite3.Database })` apre la connessione e ritorna una Promise: ci serve `await`.
- `db.get(...)` ritorna **una** riga (oggetto) o `undefined`.
- `db.all(...)` ritorna **tutte** le righe come array.
- `db.run(...)` esegue INSERT/UPDATE/DELETE e ritorna `{ lastID, changes }`. (Attenzione al nome `lastID`: in `better-sqlite3` si chiamava `lastInsertRowid`, è la differenza tipica da ricordare.)
- I parametri vanno **sempre** passati come argomenti aggiuntivi a `.get/.all/.run`, **mai** concatenati nella query: protezione anti SQL injection.
- Tutte le operazioni sono **async**: il codice del repository diventa async e chi lo chiama deve mettere `await`.

## Perché sqlite3 + sqlite (e non better-sqlite3)

`better-sqlite3` è veloce e ha un'API sincrona pulita, ma è scritto in C++ e va compilato durante `npm install`. Su Windows questo significa scaricare i "Visual Studio Build Tools" prima di poter installare. Per evitare il problema agli studenti su Windows, in questo corso usiamo:

- **`sqlite3`** — driver con binari precompilati per Windows/macOS/Linux. `npm install` funziona al primo colpo.
- **`sqlite`** — piccolo wrapper a Promise sopra `sqlite3`. Trasforma l'API a callback in async/await pulito.

Risultato: il codice resta quasi identico a quello che avremmo scritto con `better-sqlite3`, ma con `await` davanti alle operazioni del DB.

## Apri il file con DB Browser for SQLite

[sqlitebrowser.org](https://sqlitebrowser.org) — apri `data/app.db` e ispeziona la tabella `products` in interfaccia grafica. Utilissimo durante il debug per capire se la tua query ha fatto quello che pensi.

## Per sperimentare

- Aggiungi una funzione `count()` che ritorna il numero totale di righe.
- Aggiungi una transazione: inserisci 100 prodotti in una sola transazione con `db.exec('BEGIN')` / `db.exec('COMMIT')` e cronometra il tempo. Confronta con 100 INSERT separate.
- Crea una seconda tabella `categories` e una colonna `category_id` in `products`. Fai una JOIN.
