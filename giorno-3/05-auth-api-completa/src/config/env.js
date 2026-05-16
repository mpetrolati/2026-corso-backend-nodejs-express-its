import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`[config] Variabile d'ambiente mancante: ${name}`);
    process.exit(1);
  }
  return value;
}

export const env = {
  port:          parseInt(process.env.PORT || '3000', 10),
  nodeEnv:       process.env.NODE_ENV || 'development',
  dbPath:        process.env.DB_PATH || './data/app.db',
  jwtSecret:     required('JWT_SECRET'),
  jwtExpiresIn:  process.env.JWT_EXPIRES_IN || '1h',
  bcryptRounds:  parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
};
