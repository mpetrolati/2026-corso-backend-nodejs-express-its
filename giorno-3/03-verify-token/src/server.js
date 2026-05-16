import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
  console.log('Prova:');
  console.log('  1) curl -X POST /token  (per ricevere un token finto)');
  console.log('  2) curl /protected -H "Authorization: Bearer <token>"');
});
