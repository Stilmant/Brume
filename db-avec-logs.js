// db-avec-logs.js - Version avec logs pour la démonstration
import Database from 'better-sqlite3';

console.log("   🔵 db.js : Début d'exécution du module");
console.log("   │");

console.log("   ├─ 🟢 Création/ouverture de 'brume.db'...");
const db = new Database('brume.db');
console.log("   │  └─ ✅ Fichier brume.db prêt");
console.log("   │");

console.log("   ├─ 🟡 Configuration du mode WAL...");
db.pragma('journal_mode = WAL');
console.log("   │  └─ ✅ Mode haute performance activé");
console.log("   │");

console.log("   ├─ 🟠 Création des tables (si nécessaire)...");
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    last_activity INTEGER NOT NULL,
    unread INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    from_role TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id);
  CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
`);
console.log("   │  └─ ✅ Tables 'sessions' et 'messages' OK");
console.log("   │");

console.log("   └─ 🔴 db.js : Fin d'exécution (module chargé)");
console.log("");

// Fonctions (identiques à db.js)
export function getOrCreateSession(id) {
  const now = Date.now();
  const existing = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);

  if (!existing) {
    db.prepare('INSERT INTO sessions (id, created_at, last_activity, unread) VALUES (?, ?, ?, 0)')
      .run(id, now, now);
  } else {
    db.prepare('UPDATE sessions SET last_activity = ? WHERE id = ?')
      .run(now, id);
  }

  const messages = db.prepare(`
    SELECT from_role as "from", text, timestamp as ts
    FROM messages
    WHERE session_id = ?
    ORDER BY timestamp ASC
  `).all(id);

  const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);

  return {
    id,
    messages,
    unread: session.unread === 1,
    createdAt: session.created_at,
    lastActivity: session.last_activity
  };
}

export function getAllSessions() {
  const sessions = db.prepare(`
    SELECT
      s.id,
      s.unread,
      s.last_activity,
      COUNT(m.id) as message_count
    FROM sessions s
    LEFT JOIN messages m ON s.id = m.session_id
    GROUP BY s.id
    ORDER BY s.last_activity DESC
  `).all();

  return sessions.map(s => ({
    id: s.id,
    unread: s.unread === 1,
    messages: s.message_count,
    lastActivity: s.last_activity
  }));
}

export function sessionExists(id) {
  const result = db.prepare('SELECT 1 FROM sessions WHERE id = ? LIMIT 1').get(id);
  return !!result;
}

export function addMessage(sessionId, from, text) {
  const now = Date.now();
  db.prepare('INSERT INTO messages (session_id, from_role, text, timestamp) VALUES (?, ?, ?, ?)')
    .run(sessionId, from, text, now);
  db.prepare('UPDATE sessions SET last_activity = ? WHERE id = ?')
    .run(now, sessionId);
}

export function setUnread(sessionId, unread) {
  db.prepare('UPDATE sessions SET unread = ? WHERE id = ?')
    .run(unread ? 1 : 0, sessionId);
}

export default db;
