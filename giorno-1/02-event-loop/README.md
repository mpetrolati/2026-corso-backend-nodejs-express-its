# 02 — Event Loop in azione

Esempio classico per mostrare l'ordine di esecuzione di:

- codice sincrono
- `process.nextTick`
- `Promise.then`
- `setTimeout(fn, 0)`
- `setImmediate`

## Esecuzione

```bash
node event-loop-demo.js
```

## Esercizio in aula

Prima di eseguire lo script, far indovinare alla classe l'ordine di output. Discuterne dopo.
