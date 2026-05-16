// =====================================================
// Finto "database" in memoria
// =====================================================
// Tutta la conoscenza di "come sono fatti i dati" resta qui dentro.
// Nel Giorno 2 sostituiremo questo file con un repository basato
// su SQLite, senza dover toccare nessuna route.
// È un'anteprima del repository pattern.

let users = [
  { id: 1, name: 'Mario Rossi',   email: 'mario@example.com' },
  { id: 2, name: 'Lucia Bianchi', email: 'lucia@example.com' }
];

let nextId = 3;

export function findAll() {
  return users;
}

export function findById(id) {
  return users.find(u => u.id === Number(id));
}

export function create({ name, email }) {
  const user = { id: nextId++, name, email };
  users.push(user);
  return user;
}

export function update(id, data) {
  const user = findById(id);
  if (!user) return null;
  // sovrascrivo i campi presenti in data, lascio gli altri intatti
  Object.assign(user, data);
  return user;
}

export function remove(id) {
  const idx = users.findIndex(u => u.id === Number(id));
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

export function search(nome) {
  const needle = (nome ?? '').toLowerCase();
  return users.filter(u => u.name.toLowerCase().includes(needle));
}
