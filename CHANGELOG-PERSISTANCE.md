# 📋 Changements : Persistance et Reconnexion

## Résumé des fonctionnalités ajoutées

✅ **Persistance des données avec SQLite**
✅ **Reconnexion automatique des utilisateurs**

---

## 📁 Fichiers modifiés

### 1. **package.json**
- ➕ Ajout de la dépendance `better-sqlite3`

### 2. **db.js** (NOUVEAU)
Module de gestion de la base de données SQLite avec :
- Tables `sessions` et `messages`
- Fonctions CRUD complètes
- Gestion automatique des timestamps
- Fonction de nettoyage des sessions anciennes

**Fonctions exportées :**
- `getOrCreateSession(id)` - Récupère ou crée une session
- `addMessage(sessionId, from, text)` - Ajoute un message
- `setUnread(sessionId, unread)` - Marque comme lu/non lu
- `getAllSessions()` - Liste toutes les sessions (pour admin)
- `sessionExists(id)` - Vérifie l'existence d'une session
- `cleanOldSessions(days)` - Supprime les sessions inactives

### 3. **server.js**
**Modifications principales :**
- Remplacement de la `Map` en mémoire par les appels à `db.js`
- Support de la reconnexion avec `sessionId` dans la query
- Restauration de l'historique lors de la reconnexion
- Événement `restore_history` pour envoyer l'historique au client

**Nouveau flux utilisateur :**
```javascript
// Si l'utilisateur se reconnecte avec un ID existant
if (existingId && sessionExists(existingId)) {
  socket.emit("welcome", { id, reconnected: true });
  socket.emit("restore_history", { messages: session.messages });
}
```

### 4. **public/scripts/user.js**
**Modifications principales :**
- Récupération de l'ID depuis `localStorage` au chargement
- Envoi de l'ID dans la query de connexion Socket.IO
- Stockage de l'ID dans `localStorage` après `welcome`
- Gestion de l'événement `restore_history` pour afficher l'historique
- Indicateur visuel "(reconnecté)" dans l'interface

**Flux de reconnexion :**
1. Au chargement : `localStorage.getItem('brume_session_id')`
2. Connexion : Envoi de l'ID dans la query
3. Réception : `welcome` avec `reconnected: true`
4. Restauration : Affichage de tous les messages précédents

### 5. **.gitignore**
- ➕ Ajout de `brume.db`, `brume.db-shm`, `brume.db-wal`

### 6. **README.md**
- ✅ Mise à jour des fonctionnalités accomplies
- 📚 Documentation de la persistance SQLite
- 📚 Documentation de la reconnexion automatique
- 🔧 Ajout de Better-SQLite3 dans le tableau des technologies

---

## 🔄 Comment ça fonctionne ?

### Persistance des données

1. **Première connexion utilisateur**
   - Génération d'un ID unique (UUID tronqué à 8 caractères)
   - Création de la session dans SQLite
   - Envoi de l'ID au client

2. **Envoi de message**
   - Message stocké dans la table `messages`
   - Session marquée comme "non lue" pour l'admin
   - Mise à jour du timestamp `last_activity`

3. **Réponse admin**
   - Message stocké avec `from_role = 'admin'`
   - Envoi en temps réel via Socket.IO
   - Historique disponible même après redémarrage

### Reconnexion automatique

1. **Stockage local**
   ```javascript
   localStorage.setItem('brume_session_id', id);
   ```

2. **Reconnexion**
   ```javascript
   const savedSessionId = localStorage.getItem('brume_session_id');
   const socket = io({ query: { sessionId: savedSessionId } });
   ```

3. **Serveur**
   - Vérifie si l'ID existe dans la base
   - Restaure l'historique complet
   - Envoie un indicateur de reconnexion

4. **Client**
   - Affiche "(reconnecté)" dans l'interface
   - Restaure tous les messages précédents
   - L'utilisateur retrouve sa conversation

---

## 🧪 Tests

**Script de test** : `test-db.js`

Pour tester la persistance :
```bash
node test-db.js
```

Vérifie :
- ✅ Création de session
- ✅ Ajout de messages
- ✅ Récupération avec messages
- ✅ Vérification d'existence
- ✅ Liste de toutes les sessions

---

## 📊 Structure de la base de données

### Table `sessions`
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | TEXT | ID unique (PRIMARY KEY) |
| `created_at` | INTEGER | Timestamp de création |
| `last_activity` | INTEGER | Timestamp dernière activité |
| `unread` | INTEGER | 0 = lu, 1 = non lu |

### Table `messages`
| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INTEGER | ID auto-incrémenté (PRIMARY KEY) |
| `session_id` | TEXT | Référence à la session |
| `from_role` | TEXT | 'user' ou 'admin' |
| `text` | TEXT | Contenu du message |
| `timestamp` | INTEGER | Timestamp du message |

**Index** : Sur `session_id` et `timestamp` pour les performances.

---

## 🎯 Avantages de cette implémentation

### Persistance SQLite
- ✅ Pas de serveur externe requis
- ✅ Fichier unique facile à sauvegarder
- ✅ Excellentes performances (mode WAL activé)
- ✅ Support de milliers de sessions
- ✅ Requêtes SQL efficaces avec index

### Reconnexion automatique
- ✅ Expérience utilisateur fluide
- ✅ Pas besoin de se réidentifier
- ✅ Historique toujours disponible
- ✅ Fonctionne même après fermeture du navigateur
- ✅ Compatible avec tous les navigateurs modernes

---

## 💡 Notes importantes

1. **localStorage** : Les données sont locales au navigateur. Si l'utilisateur change de navigateur ou efface les données, une nouvelle session sera créée.

2. **Base de données** : Le fichier `brume.db` doit être sauvegardé régulièrement. Il contient toutes les conversations.

3. **Performance** : SQLite gère facilement des dizaines de milliers de messages. Pour des charges plus importantes, envisager PostgreSQL.

4. **Sécurité** : Pour la production, ajouter l'authentification admin et le chiffrement des données sensibles.

---

**Date de mise en œuvre** : 9 novembre 2025
**Version** : 2.0 (avec persistance)
