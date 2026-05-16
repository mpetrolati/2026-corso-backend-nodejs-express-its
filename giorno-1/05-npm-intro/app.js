// =====================================================
// Esempio 05 — Primo uso di npm
// =====================================================
// Prima di eseguire questo script, esegui:
//   npm install
//
// Questo legge le dipendenze dal package.json e le installa
// nella cartella node_modules.
//
// Poi:
//   node app.js
//   oppure
//   npm start

import dayjs from 'dayjs';

const oggi = dayjs();
console.log('Oggi è:', oggi.format('dddd D MMMM YYYY'));
console.log('Tra una settimana:', oggi.add(7, 'day').format('YYYY-MM-DD'));
console.log('Ora attuale:', oggi.format('HH:mm:ss'));
