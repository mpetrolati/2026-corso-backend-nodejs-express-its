// =====================================================
// config/env — punto unico per leggere la configurazione
// =====================================================
// Tutto cio' che e' configurabile dall'esterno passa di qui.
// Se manca una env var obbligatoria, l'app crasha all'avvio
// con un messaggio chiaro (fail-fast).

import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[config] Variabile d'ambiente mancante: ${name}`);
    console.error('Crea un file .env (vedi .env.example) o setta la variabile a livello di sistema.');
    process.exit(1);
  }
  return value;
}

export const env = {
  port:           parseInt(process.env.PORT || '3000', 10),
  nodeEnv:        process.env.NODE_ENV || 'development',
  dbPath:         process.env.DB_PATH || './data/app.db',
  jwtSecret:      required('JWT_SECRET'),
  jwtExpiresIn:   process.env.JWT_EXPIRES_IN || '1h',
  bcryptRounds:   parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
};

// In sviluppo loggo la configurazione (non sensibile) per chiarezza
if (env.nodeEnv !== 'production') {
  console.log('[config] Avvio in', env.nodeEnv);
  console.log('[config]   PORT:', env.port);
  console.log('[config]   DB_PATH:', env.dbPath);
  console.log('[config]   BCRYPT_ROUNDS:', env.bcryptRounds);
  // NON loggo JWT_SECRET ovviamente
}
