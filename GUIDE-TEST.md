# 🚀 Guide de test : Persistance et Reconnexion

## 🎯 Objectif
Tester les nouvelles fonctionnalités de persistance SQLite et reconnexion automatique.

---

## ✅ Test 1 : Persistance des données

### Étape 1 : Démarrer le serveur
```bash
node server.js
```

### Étape 2 : Ouvrir l'interface utilisateur
- Navigateur 1 : http://localhost:3000/user.html
- Notez l'ID de session (ex: `abc12def`)

### Étape 3 : Envoyer des messages
- Envoyez quelques messages comme "Bonjour Brume !"

### Étape 4 : Ouvrir l'interface admin
- Navigateur 2 (ou nouvel onglet) : http://localhost:3000/admin.html
- Vérifiez que la session apparaît dans la liste
- Cliquez sur la session pour voir les messages
- Répondez avec quelque chose comme "Bonjour ! Comment puis-je vous aider ?"

### Étape 5 : Arrêter le serveur
- Dans le terminal : `Ctrl+C`

### Étape 6 : Redémarrer le serveur
```bash
node server.js
```

### Étape 7 : Vérifier la persistance
- Rechargez l'interface admin
- ✅ **La session doit toujours être visible**
- ✅ **Les messages doivent être conservés**
- Cliquez sur la session pour voir l'historique complet

**Résultat attendu** : Tous les messages sont toujours là après le redémarrage.

---

## ✅ Test 2 : Reconnexion automatique

### Étape 1 : Session initiale
- Ouvrez http://localhost:3000/user.html
- Notez l'ID de session (ex: `xyz789ab`)
- Envoyez quelques messages

### Étape 2 : Fermer l'onglet
- Fermez complètement l'onglet du navigateur
- **NE PAS** effacer les données du navigateur

### Étape 3 : Rouvrir l'interface
- Ouvrez de nouveau http://localhost:3000/user.html
- ✅ **L'ID de session doit être le MÊME**
- ✅ **Le badge "(reconnecté)" doit apparaître**
- ✅ **L'historique complet doit être restauré**

### Étape 4 : Continuer la conversation
- Envoyez un nouveau message
- Il doit s'ajouter à l'historique existant

**Résultat attendu** : La conversation reprend là où elle s'était arrêtée.

---

## ✅ Test 3 : Nouvelle session (autre navigateur)

### Étape 1 : Ouvrir dans un autre navigateur
- Si vous étiez dans Chrome, ouvrez Firefox (ou vice-versa)
- Allez sur http://localhost:3000/user.html

### Étape 2 : Vérifier la nouvelle session
- ✅ **Un NOUVEL ID de session doit être généré**
- ✅ **L'historique doit être vide**
- ✅ **Pas de badge "(reconnecté)"**

**Résultat attendu** : Chaque navigateur a sa propre session (localStorage est local).

---

## ✅ Test 4 : Mode navigation privée

### Étape 1 : Fenêtre privée
- Ouvrez une fenêtre de navigation privée
- Allez sur http://localhost:3000/user.html
- Envoyez un message

### Étape 2 : Fermer et rouvrir
- Fermez la fenêtre privée
- Ouvrez une NOUVELLE fenêtre privée
- Retournez sur http://localhost:3000/user.html

**Résultat attendu** :
- ✅ **Nouveau ID de session** (localStorage n'est pas partagé entre fenêtres privées)
- ✅ **Historique vide**

---

## ✅ Test 5 : Multiple sessions simultanées

### Étape 1 : Ouvrir plusieurs onglets
- Onglet 1 : http://localhost:3000/user.html (Session A)
- Onglet 2 : http://localhost:3000/user.html (Session A - même ID)
- Onglet 3 (navigation privée) : http://localhost:3000/user.html (Session B)

### Étape 2 : Interface admin
- Ouvrez http://localhost:3000/admin.html
- ✅ **2 sessions doivent apparaître** (A et B)

### Étape 3 : Envoyer des messages
- Envoyez un message depuis l'onglet 1
- ✅ Le message doit apparaître dans l'onglet 2 (même session)
- ✅ Le message ne doit PAS apparaître dans l'onglet 3 (autre session)

**Résultat attendu** : Les sessions sont bien isolées.

---

## 🔍 Test 6 : Inspection de la base de données

### Option 1 : Script de test
```bash
node test-db.js
```

### Option 2 : SQLite CLI
```bash
# Installation (si nécessaire)
# Windows : https://www.sqlite.org/download.html
# macOS : brew install sqlite
# Linux : apt-get install sqlite3

# Ouvrir la base
sqlite3 brume.db

# Commandes SQL
.tables                              # Liste des tables
SELECT * FROM sessions;              # Voir toutes les sessions
SELECT * FROM messages;              # Voir tous les messages
SELECT COUNT(*) FROM sessions;       # Nombre de sessions
SELECT COUNT(*) FROM messages;       # Nombre de messages

# Quitter
.quit
```

---

## 🧪 Résultat des tests

### ✅ Tests réussis si :
1. Les données persistent après redémarrage du serveur
2. Les utilisateurs se reconnectent automatiquement avec leur ID
3. L'historique est restauré correctement
4. Chaque navigateur/fenêtre privée a sa propre session
5. Les sessions simultanées sont isolées
6. La base de données contient toutes les données

### ❌ En cas de problème :
- Vérifier que `better-sqlite3` est installé : `npm list better-sqlite3`
- Vérifier que le fichier `brume.db` existe
- Vérifier la console du navigateur (F12) pour les erreurs
- Vérifier les logs du serveur dans le terminal

---

## 🎨 Indicateurs visuels

### Interface utilisateur
- **Nouvelle session** : `Session: abc12def`
- **Reconnexion** : `Session: abc12def (reconnecté)`

### Interface admin
- Badge **NEW** sur les sessions non lues
- Sessions triées par dernière activité

---

## 💡 Astuces de débogage

### Effacer l'ID de session (pour forcer une nouvelle session)
```javascript
// Dans la console du navigateur (F12)
localStorage.removeItem('brume_session_id');
location.reload();
```

### Voir l'ID stocké
```javascript
// Console du navigateur
console.log(localStorage.getItem('brume_session_id'));
```

### Effacer toute la base de données (attention !)
```bash
# Windows PowerShell
rm brume.db

# macOS/Linux
rm brume.db

# Puis redémarrer le serveur
node server.js
```

---

## 📊 Cas d'usage réels

### Scenario 1 : Support client
1. Client ouvre une session, pose une question
2. Ferme son navigateur
3. Revient 2 heures plus tard
4. ✅ Retrouve sa conversation et peut continuer

### Scenario 2 : Admin multi-tâches
1. Admin gère plusieurs sessions
2. Serveur redémarre (mise à jour)
3. ✅ Toutes les conversations sont conservées
4. ✅ Admin retrouve toutes les sessions actives

### Scenario 3 : Analyse historique
1. Entreprise veut analyser les conversations
2. ✅ Export de la base SQLite
3. ✅ Analyse avec SQL ou Python
4. ✅ Statistiques et insights

---

**Bonne chance avec vos tests ! 🚀**
