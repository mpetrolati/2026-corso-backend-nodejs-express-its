// =====================================================
// Esempio 01 — Entry point del server
// =====================================================
// Importa l'app configurata in app.js e fa partire il listener
// sulla porta indicata. La separazione app.js / server.js è la
// convenzione che useremo per tutto il corso.

import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
