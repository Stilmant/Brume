# 💡 Comment fonctionne la base de données - Expliqué simplement

## 🎬 Chronologie : De zéro à la première donnée

### Étape 1️⃣ : Démarrage du serveur

Vous tapez :
```bash
node server.js
```

### Étape 2️⃣ : Import du module db.js

La première ligne de `server.js` qui importe la base de données :
```javascript
import { getOrCreateSession, ... } from "./db.js";
```

**À ce moment précis**, Node.js exécute TOUT le code au niveau racine de `db.js` :

```javascript
// db.js - Ce code s'exécute IMMÉDIATEMENT à l'import

import Database from 'better-sqlite3';

// 🔥 ICI : Le fichier brume.db est créé (s'il n'existe pas)
const db = new Database('brume.db');

// 🔥 ICI : Configuration de la base
db.pragma('journal_mode = WAL');

// 🔥 ICI : Création des tables (si elles n'existent pas)
db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (...);
  CREATE TABLE IF NOT EXISTS messages (...);
  CREATE INDEX IF NOT EXISTS idx_messages_session ...;
  CREATE INDEX IF NOT EXISTS idx_messages_timestamp ...;
`);
```

### Étape 3️⃣ : Base de données prête !

Le serveur affiche :
```
Server on port 3000
```

À ce stade :
- ✅ Le fichier `brume.db` existe (28 KB au minimum)
- ✅ Les tables `sessions` et `messages` existent
- ✅ Les index sont créés
- ✅ Le serveur est prêt à recevoir des connexions

### Étape 4️⃣ : Premier utilisateur se connecte

1. Utilisateur ouvre http://localhost:3000/user.html
2. Socket.IO se connecte au serveur
3. Le serveur appelle `getOrCreateSession(id)`
4. La fonction insère la première ligne dans `sessions`
5. L'utilisateur envoie un message
6. La fonction `addMessage()` insère dans `messages`

---

## 🔍 Visualisation du processus

```
┌─────────────────────────────────────────────────────────┐
│  DÉMARRAGE : node server.js                            │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  IMPORT : import { ... } from "./db.js"                 │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  EXÉCUTION DE db.js (code au niveau racine)            │
│                                                         │
│  1. new Database('brume.db')                           │
│     → Crée brume.db si absent                          │
│     → Ouvre la connexion si existant                    │
│                                                         │
│  2. db.pragma('journal_mode = WAL')                    │
│     → Configure le mode haute performance              │
│                                                         │
│  3. db.exec(`CREATE TABLE IF NOT EXISTS ...`)          │
│     → Crée sessions (si pas déjà là)                   │
│     → Crée messages (si pas déjà là)                   │
│     → Crée index (si pas déjà là)                      │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  SERVEUR PRÊT : Listening on port 3000                 │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  UTILISATEUR SE CONNECTE                                │
│                                                         │
│  → getOrCreateSession('abc123')                        │
│  → Première insertion dans `sessions`                   │
│  → addMessage('abc123', 'user', 'Bonjour')             │
│  → Première insertion dans `messages`                   │
└─────────────────────────────────────────────────────────┘
```

---

## 🤔 Questions fréquentes

### Q1 : Que se passe-t-il si `brume.db` existe déjà ?

**Réponse** :
- `new Database('brume.db')` ouvre simplement la base existante
- `CREATE TABLE IF NOT EXISTS` ne fait rien (les tables existent déjà)
- Les données précédentes sont conservées
- C'est comme ça que la persistance fonctionne !

### Q2 : Quand exactement le fichier est-il créé ?

**Réponse** : À la ligne `const db = new Database('brume.db');`

Si vous faites :
```bash
ls brume.db    # Fichier n'existe pas
node server.js # Démarrage du serveur
# (le serveur importe db.js)
ls brume.db    # ✅ Fichier existe maintenant !
```

### Q3 : Pourquoi utiliser `IF NOT EXISTS` ?

**Réponse** : Pour éviter les erreurs au redémarrage !

Sans `IF NOT EXISTS` :
```sql
CREATE TABLE sessions (...);  -- ❌ Erreur : "table already exists"
```

Avec `IF NOT EXISTS` :
```sql
CREATE TABLE IF NOT EXISTS sessions (...);  -- ✅ Aucun problème
```

### Q4 : Les tables sont-elles créées à chaque redémarrage ?

**Réponse** : La **commande** est exécutée, mais elle ne fait rien si les tables existent.

```javascript
// Premier démarrage
db.exec(`CREATE TABLE IF NOT EXISTS sessions`);
// → Table créée ✅

// Redémarrages suivants
db.exec(`CREATE TABLE IF NOT EXISTS sessions`);
// → Rien ne se passe (table existe déjà) ✅
```

C'est **idempotent** : peu importe combien de fois vous l'exécutez, le résultat est le même.

---

## 🧪 Test pratique pour comprendre

### Expérience 1 : Voir la création

```bash
# 1. Supprimer la base (si elle existe)
rm brume.db

# 2. Vérifier qu'elle n'existe pas
ls brume.db
# Résultat : Fichier non trouvé

# 3. Démarrer le serveur
node server.js
# Dans un autre terminal...

# 4. Vérifier immédiatement
ls brume.db
# Résultat : brume.db existe ! (28 KB)
```

### Expérience 2 : Vérifier les tables

```bash
# Installer SQLite CLI (si nécessaire)
# Windows : https://www.sqlite.org/download.html

# Ouvrir la base
sqlite3 brume.db

# Lister les tables
.tables
# Résultat : sessions  messages

# Voir la structure
.schema sessions
# Résultat : CREATE TABLE sessions (id TEXT PRIMARY KEY, ...)

# Quitter
.quit
```

### Expérience 3 : Ordre d'exécution

Ajoutez temporairement des logs dans `db.js` :

```javascript
console.log("🔵 db.js : Début d'exécution");

const db = new Database('brume.db');
console.log("🟢 Base de données créée/ouverte");

db.pragma('journal_mode = WAL');
console.log("🟡 Mode WAL activé");

db.exec(`CREATE TABLE IF NOT EXISTS...`);
console.log("🟠 Tables créées/vérifiées");

console.log("🔴 db.js : Fin d'exécution");
```

Démarrez le serveur :
```bash
node server.js
```

Résultat dans le terminal :
```
🔵 db.js : Début d'exécution
🟢 Base de données créée/ouverte
🟡 Mode WAL activé
🟠 Tables créées/vérifiées
🔴 db.js : Fin d'exécution
Server on port 3000  ← Après tout ça
```

---

## 📊 Anatomie du fichier brume.db

### Structure interne

```
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
```

### Fichiers associés (mode WAL)

Quand le serveur tourne, vous verrez :
```
brume.db          ← Base principale
brume.db-shm      ← Shared memory (cache)
brume.db-wal      ← Write-Ahead Log (transactions)
```

Les fichiers `-shm` et `-wal` disparaissent quand le serveur s'arrête proprement.

---

## 🎯 Résumé en une phrase

**La base de données et ses tables sont créées automatiquement lors du premier `import` de `db.js`, avant même que le serveur ne commence à écouter les connexions.**

---

## 💡 Analogie du monde réel

Imaginez que vous ouvrez un restaurant :

1. **node server.js** = Vous arrivez le matin
2. **import db.js** = Vous entrez dans la cuisine
3. **new Database('brume.db')** = Vous allumez les lumières (la cuisine existe maintenant)
4. **CREATE TABLE IF NOT EXISTS** = Vous installez les équipements (four, frigo, plan de travail)
5. **Server listening** = Vous ouvrez les portes aux clients
6. **Premier utilisateur** = Premier client entre et commande
7. **addMessage()** = Vous notez la commande dans le carnet

La cuisine est **prête avant** l'arrivée des clients, pas pendant !

---

## 🔗 Code à lire dans l'ordre

Pour bien comprendre le flux :

1. **server.js** (ligne 6) :
   ```javascript
   import { getOrCreateSession, ... } from "./db.js";
   ```

2. **db.js** (lignes 1-28) :
   ```javascript
   const db = new Database('brume.db');  // 🔥 Création ICI
   db.exec(`CREATE TABLE...`);           // 🔥 Tables ICI
   ```

3. **server.js** (ligne 33) :
   ```javascript
   const session = getOrCreateSession(id);  // Utilisation
   ```

---

**Voilà ! J'espère que c'est plus clair maintenant. 😊**

La base de données n'est pas créée "à la demande" mais **au démarrage du serveur**, dès l'import du module.
