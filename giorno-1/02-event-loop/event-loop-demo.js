// =====================================================
// Esempio 02 — Event Loop in azione
// =====================================================
// Esegui con: node event-loop-demo.js
//
// PRIMA di lanciare lo script, prova a indovinare l'ordine
// in cui usciranno i console.log. Poi lancialo e confronta!

console.log('1 — Sincrono: prima riga');

setTimeout(() => {
  console.log('2 — setTimeout 0ms (fase: timers)');
}, 0);

setImmediate(() => {
  console.log('3 — setImmediate (fase: check)');
});

process.nextTick(() => {
  console.log('4 — process.nextTick (microtask, priorità massima)');
});

Promise.resolve().then(() => {
  console.log('5 — Promise.then (microtask)');
});

console.log('6 — Sincrono: ultima riga');

// Output atteso (l'ordine 2/3 può variare):
// 1 — Sincrono: prima riga
// 6 — Sincrono: ultima riga
// 4 — process.nextTick
// 5 — Promise.then
// 2 — setTimeout
// 3 — setImmediate
//
// Lezione: il codice sincrono viene SEMPRE eseguito prima,
// poi le microtask (nextTick, Promise), infine le macrotask (timers, immediate).
