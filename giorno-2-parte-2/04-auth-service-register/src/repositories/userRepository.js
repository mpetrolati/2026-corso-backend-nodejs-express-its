import db from '../db/connection.js';

export function findByEmail(email) {
  return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
}

export function findById(id) {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

export function create({ email, passwordHash, name = null, role = 'user' }) {
  const info = db
    .prepare(`
      INSERT INTO users (email, password_hash, name, role)
      VALUES (?, ?, ?, ?)
    `)
    .run(email, passwordHash, name, role);
  return findById(info.lastInsertRowid);
}
