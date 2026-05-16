import app from './app.js';
import { env } from './config/env.js';

app.listen(env.port, () => {
  console.log(`Server in ascolto su http://localhost:${env.port}`);
  console.log('Prova: POST /api/auth/register con body { email, password, name? }');
});
