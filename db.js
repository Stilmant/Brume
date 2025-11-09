// db.js - Module de gestion de la base de données SQLite
import Database from 'better-sqlite3';

const db = new Database('brume.db');

// Activation du mode WAL pour de meilleures performances
db.pragma('journal_mode = WAL');

// Initialisation des tables
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

/**
 * Crée ou récupère une session
 * @param {string} id - Identifiant de la session
 * @returns {Object} Session avec ses messages
 */
export function getOrCreateSession(id) {
  const now = Date.now();

  // Vérifier si la session existe
  const existing = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);

  if (!existing) {
    // Créer la session
    db.prepare('INSERT INTO sessions (id, created_at, last_activity, unread) VALUES (?, ?, ?, 0)')
      .run(id, now, now);
  } else {
    // Mettre à jour la dernière activité
    db.prepare('UPDATE sessions SET last_activity = ? WHERE id = ?')
      .run(now, id);
  }

  // Récupérer les messages
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

/**
 * Ajoute un message à une session
 * @param {string} sessionId - ID de la session
 * @param {string} from - Rôle ('user' ou 'admin')
 * @param {string} text - Contenu du message
 */
export function addMessage(sessionId, from, text) {
  const now = Date.now();

  db.prepare('INSERT INTO messages (session_id, from_role, text, timestamp) VALUES (?, ?, ?, ?)')
    .run(sessionId, from, text, now);

  db.prepare('UPDATE sessions SET last_activity = ? WHERE id = ?')
    .run(now, sessionId);
}

/**
 * Marque une session comme lue ou non lue
 * @param {string} sessionId - ID de la session
 * @param {boolean} unread - État non lu
 */
export function setUnread(sessionId, unread) {
  db.prepare('UPDATE sessions SET unread = ? WHERE id = ?')
    .run(unread ? 1 : 0, sessionId);
}

/**
 * Récupère toutes les sessions pour l'admin
 * @returns {Array} Liste des sessions avec statistiques
 */
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

/**
 * Vérifie si une session existe
 * @param {string} id - ID de la session
 * @returns {boolean}
 */
export function sessionExists(id) {
  const result = db.prepare('SELECT 1 FROM sessions WHERE id = ? LIMIT 1').get(id);
  return !!result;
}

/**
 * Supprime les sessions inactives depuis plus de X jours
 * @param {number} days - Nombre de jours d'inactivité
 */
export function cleanOldSessions(days = 30) {
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  const result = db.prepare('DELETE FROM sessions WHERE last_activity < ?').run(cutoff);
  return result.changes;
}

export default db;
