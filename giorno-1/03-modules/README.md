# 03 — Moduli (ES Modules)

Esempio di esportazione e importazione di moduli usando lo standard **ES Modules** (la sintassi che useremo in tutto il corso).

## Punti chiave

- `"type": "module"` nel `package.json` per abilitare ESM
- `.js` obbligatorio negli import relativi (es. `./math.js`)
- Differenza tra **named export** (`export function`) e **default export** (`export default`)
- Boilerplate per ricostruire `__filename` e `__dirname` (non esistono nativamente in ESM)

## Esecuzione

```bash
node app.js
# oppure
npm start
```
