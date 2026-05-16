# 03 — bcrypt playground

Due script standalone per capire visivamente come funziona bcrypt:

- `playground.js` — hasha la stessa password 3 volte, mostra hash diversi ma compare sempre true.
- `benchmark.js` — misura il tempo di hash al variare dei rounds.

## Esecuzione

```bash
npm install
npm start      # playground.js
npm run bench  # benchmark.js
```

## Output di `playground.js`

```
Plaintext: "PasswordSegreta123"

Hasho la stessa password 3 volte:

hash 1: $2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
hash 2: $2b$10$8DEGCpW27avAJfeUYIHcSO9P/8mEqAUC.bz8WPaO3ZIFlPq/wTGOe
hash 3: $2b$10$WT2YcRGcDX31FBnHsiwIzeRJfPpHGm3CO5OQ4Az.0iU7VSCBzZcgu

Tre hash diversi: true
(grazie al salt casuale che bcrypt inserisce in ogni hash)

Verifico con compare (password GIUSTA):
  compare(plain, h1): true
  compare(plain, h2): true
  compare(plain, h3): true

Verifico con compare (password SBAGLIATA):
  compare('wrong', h1): false

Struttura di un hash bcrypt:
  algoritmo:    2b
  rounds:       10
  salt + hash:  N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

## Output di `benchmark.js` (su una macchina moderna)

```
rounds  |  tempo medio (3 esecuzioni)
--------|------------------------------
     4  |       5.3 ms
     8  |      45.7 ms
    10  |     180.1 ms
    12  |     725.4 ms
```

I tempi raddoppiano (più o meno) per ogni round in più: il work factor è esponenziale.

## Punti chiave

- **Ogni hash è diverso** anche per la stessa password. Il salt è dentro l'hash stesso, in chiaro.
- **`bcrypt.compare(plain, hash)`** sa estrarre il salt dall'hash e ricalcolarlo per fare il confronto. Non puoi usare `===` su due hash bcrypt.
- **Struttura di un hash**: `$algoritmo$rounds$salt+hash`. Tutto in una sola stringa, niente schema speciale nel DB.
- **Scelta dei rounds**: 10 è lo standard. In test scendi a 4 (per non rallentare la suite), in produzione puoi salire a 12 se la tua CPU regge.

## Trappola da evitare

```javascript
// SBAGLIATO
if (hash1 === hash2) { /* ... */ }

// SBAGLIATO
if (await bcrypt.hash(plain) === storedHash) { /* ... */ }

// GIUSTO
if (await bcrypt.compare(plain, storedHash)) { /* ... */ }
```

`compare` non solo confronta, ma fa anche un **constant-time comparison**, immune ad attacchi di timing. È sempre la funzione da usare per verificare le password.

## Per sperimentare

- Cambia `ROUNDS = 4` e rilancia: vedrai che il tempo crolla. Buono per i test, terribile per la sicurezza.
- Hasha la stessa password con `rounds=10` e `rounds=12`: noterai la differenza di tempo.
- Modifica un singolo carattere dell'hash salvato e prova `compare`: ritorna `false`. (Mostra la robustezza dell'algoritmo.)
- Sostituisci `bcrypt` con `bcryptjs` nel `package.json` e nell'import. Tutto il resto del codice resta identico — è un esempio di **dipendenza intercambiabile**.
