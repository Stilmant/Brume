db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS...`);
brume.db (fichier binaire SQLite)
│
├─ Métadonnées
│  ├─ Version SQLite
│  ├─ Taille de page (4096 bytes)
│  └─ Encodage (UTF-8)
│
├─ Tables
│  ├─ sessions
│  │  ├─ Colonnes : id, created_at, last_activity, unread
│  │  └─ Données : [ligne 1], [ligne 2], ...
│  │
│  └─ messages
│     ├─ Colonnes : id, session_id, from_role, text, timestamp
│     └─ Données : [ligne 1], [ligne 2], ...
│
└─ Index
   ├─ idx_messages_session (accélère les recherches)
   └─ idx_messages_timestamp (tri chronologique)
brume.db          ← Base principale
brume.db-shm      ← Shared memory (cache)
brume.db-wal      ← Write-Ahead Log (transactions)
---
# 💡 Création et fonctionnement de la base de données SQLite

## Résumé rapide

**La base de données et ses tables sont créées automatiquement lors du premier `import` de `db.js`, avant même que le serveur ne commence à écouter les connexions.**

---

## Détail du processus

1. **Démarrage du serveur** :
   - `node server.js`
2. **Import de db.js** :
   - `import { getOrCreateSession, ... } from "./db.js";`
   - À ce moment, Node.js exécute tout le code racine de `db.js` :
     - Crée le fichier `brume.db` si absent
     - Configure le mode WAL
     - Crée les tables et index si besoin
3. **Serveur prêt** :
   - Le serveur affiche `Server on port 3000`
   - La base est prête à recevoir des connexions
4. **Premier utilisateur** :
   - Ouvre `/user.html`, Socket.IO se connecte
   - Le serveur appelle `getOrCreateSession(id)`
   - La session et les messages sont créés/stockés

---

## FAQ rapide

- **Q : Que se passe-t-il si brume.db existe déjà ?**
  - Il est simplement ouvert, les données sont conservées.
- **Q : Les tables sont-elles créées à chaque redémarrage ?**
  - La commande est exécutée, mais ne fait rien si elles existent déjà (idempotent).
- **Q : Pourquoi utiliser IF NOT EXISTS ?**
  - Pour éviter les erreurs si la table existe déjà.

---

## Pour aller plus loin

Pour une explication détaillée, voir le fichier [QUAND-DB-CREEE.md](QUAND-DB-CREEE.md) (version synthétique, schéma visuel, analogie).

---
