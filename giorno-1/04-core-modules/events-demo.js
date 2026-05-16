// =====================================================
// events — EventEmitter, pattern fondamentale di Node
// =====================================================
// Anche http.Server e tantissimi altri oggetti di Node ereditano
// da EventEmitter. Capirlo qui = capire come funziona tutto Node.
// Esegui con: node events-demo.js

import { EventEmitter } from 'events';

class Ordine extends EventEmitter {
  conferma() {
    console.log('Ordine confermato.');
    this.emit('confermato', { id: 123, totale: 49.90 });
  }
}

const ordine = new Ordine();

// Mi registro per ascoltare un evento
ordine.on('confermato', (dati) => {
  console.log('Email inviata al cliente per ordine #', dati.id);
});

ordine.on('confermato', (dati) => {
  console.log('Aggiornamento magazzino per ordine #', dati.id);
});

// Quando chiamo conferma(), tutti i listener si attivano
ordine.conferma();

// Lezione: questo è esattamente il pattern che useremo con http,
// dove req.on('data', ...) e req.on('end', ...) sono listener su EventEmitter.
