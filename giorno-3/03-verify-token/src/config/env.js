import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) { console.error(`Manca env: ${name}`); process.exit(1); }
  return value;
}

export const env = {
  jwtSecret:     required('JWT_SECRET'),
  jwtExpiresIn:  process.env.JWT_EXPIRES_IN || '5m',
};
