# 📚 Index de la Documentation Brume v2.0

## 🎯 Documents par niveau de détail

### 🟢 Débutant - Comprendre rapidement

1. **[QUAND-DB-CREEE.md](QUAND-DB-CREEE.md)** ⭐ **COMMENCEZ ICI**
   - Réponse rapide et visuelle
   - Diagramme de flux
   - FAQ express
   - **Durée de lecture** : 3 minutes

2. **[GUIDE-TEST.md](GUIDE-TEST.md)**
   - 6 scénarios de test pas à pas
   - Résultats attendus
   - Dépannage
   - **Durée de lecture** : 10 minutes

### 🟡 Intermédiaire - Comprendre en profondeur

3. **[EXPLICATION-DB.md](EXPLICATION-DB.md)**
   - Explication détaillée avec analogies
   - Expériences pratiques
   - Code annoté ligne par ligne
   - Anatomie de brume.db
   - **Durée de lecture** : 15 minutes

4. **[EXPLICATION-DB.md](EXPLICATION-DB.md)**
     - Explication détaillée avec analogies
     - Structure de la base de données
     - FAQ, expériences pratiques
     - **Durée de lecture** : 15 minutes

### 🔴 Avancé - Documentation de référence

5. **[README.md](README.md)** (sections techniques)
   - Architecture complète
   - Structure du projet
   - Configuration
   - Documentation des fichiers
   - **Référence complète**

6. **Code source**
   - `db.js` : Module de base de données
   - `server.js` : Serveur avec persistance
   - `public/scripts/user.js` : Reconnexion client

---

## 🎓 Parcours d'apprentissage recommandé

### Pour comprendre "Quand la DB est créée ?"

```
QUAND-DB-CREEE.md (3 min)
     ↓
demo-simple.js (exécuter le script)
     ↓
EXPLICATION-DB.md (15 min)
     ↓
Code : db.js (lignes 1-28)
```

### Pour tester le système

```
GUIDE-TEST.md (lire les tests)
     ↓
Test 1 : Persistance
     ↓
Test 2 : Reconnexion
     ↓
Test 6 : Inspection de la DB
```

### Pour modifier le code

```
EXPLICATION-DB.md
     ↓
Code : db.js (toutes les fonctions)
     ↓
Code : server.js (intégration)
     ↓
Code : user.js (reconnexion client)
```

---

## 📂 Documents par thème

### 🗄️ Base de données SQLite

- **QUAND-DB-CREEE.md** : Quand et comment elle est créée
- **EXPLICATION-DB.md** : Fonctionnement détaillé
- **db.js** : Code source du module
- **test-db.js** : Script de test unitaire

### 🔄 Reconnexion automatique

- **public/scripts/user.js** : Implémentation client
- **server.js** : Gestion côté serveur
- **GUIDE-TEST.md** : Test 2

### 🧪 Tests et démonstrations

- **test-db.js** : Test de la base de données
- **demo-simple.js** : Démonstration de l'ordre d'exécution
- **demo-ordre-execution.js** : Démonstration commentée
- **db-avec-logs.js** : Version du module avec logs
- **GUIDE-TEST.md** : 6 scénarios complets

### 🏗️ Architecture

- **README.md** : Vue d'ensemble
- Structure de la base : Voir EXPLICATION-DB.md

---

## 🔍 Recherche par question

### "Comment fonctionne la persistance ?"
→ **EXPLICATION-DB.md**

### "Quand la base de données est-elle créée ?"
→ **QUAND-DB-CREEE.md** + exécuter **demo-simple.js**

### "Comment tester la reconnexion ?"
→ **GUIDE-TEST.md** (Test 2)

### "Quels fichiers ont été modifiés ?"
→ Voir l'historique git ou le README.md

### "Comment voir les données dans la base ?"
→ **GUIDE-TEST.md** (Test 6) + **EXPLICATION-DB.md** (Expérience 2)

### "Pourquoi utiliser SQLite ?"
→ **README.md** (section "Persistance des données")

### "Comment fonctionne localStorage ?"
→ Voir README.md (section reconnexion) ou public/scripts/user.js

### "La base est-elle recréée à chaque démarrage ?"
→ **QUAND-DB-CREEE.md** (FAQ Q3 et Q4)

---

## 📊 Fichiers par ordre de taille

### 📄 Petits (lecture rapide)
- **QUAND-DB-CREEE.md** (~200 lignes)
- **demo-simple.js** (~30 lignes)
- **test-db.js** (~40 lignes)

### 📃 Moyens (lecture normale)
- **EXPLICATION-DB.md** (~400 lignes)
- **GUIDE-TEST.md** (~350 lignes)

### 📖 Grands (référence)
- **README.md** (~400+ lignes)
- **db.js** (~140 lignes)
- **server.js** (~80 lignes)

---

## 🎯 Documents par objectif

### Apprendre
1. QUAND-DB-CREEE.md
2. EXPLICATION-DB.md
3. Exécuter demo-simple.js

### Tester
1. GUIDE-TEST.md
2. Exécuter test-db.js
3. Suivre les 6 tests

### Développer
1. EXPLICATION-DB.md
2. Code : db.js
3. Code : server.js

### Dépanner
1. GUIDE-TEST.md (section "En cas de problème")
2. EXPLICATION-DB.md (section "Astuces de débogage")
3. Console du navigateur (F12)

---

## 🚀 Démarrages rapides

### Je veux juste comprendre quand la DB est créée
```
Lisez : QUAND-DB-CREEE.md
Temps : 3 minutes
```

### Je veux tout comprendre en détail
```
1. QUAND-DB-CREEE.md (3 min)
2. EXPLICATION-DB.md (15 min)
3. Exécuter demo-simple.js
Total : ~20 minutes
```

### Je veux tester le système
```
1. GUIDE-TEST.md (5 min de lecture)
2. Suivre Test 1 (5 min)
3. Suivre Test 2 (5 min)
Total : ~15 minutes
```

### Je veux modifier le code
```
1. EXPLICATION-DB.md (structure et flux)
2. Lire db.js avec les commentaires
3. Lire server.js avec les changements
Total : ~30 minutes
```

---

## 💡 Scripts pratiques

| Script | Objectif | Durée |
|--------|----------|-------|
| `test-db.js` | Test unitaire de la DB | 1 sec |
| `demo-simple.js` | Voir l'ordre d'exécution | 1 sec |
| `demo-ordre-execution.js` | Démonstration commentée | 1 sec |
| `node server.js` | Lancer l'application | Infini |

---

## 📚 Documentation externe

### SQLite
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [better-sqlite3 API](https://github.com/WiseLibs/better-sqlite3/wiki/API)

### Socket.IO
- [Socket.IO Documentation](https://socket.io/docs/v4/)

### Node.js
- [Node.js ES Modules](https://nodejs.org/api/esm.html)
- [Node.js Import](https://nodejs.org/api/esm.html#import-specifiers)

---

## 🆘 Obtenir de l'aide

### Par type de problème

**La base de données n'est pas créée**
→ EXPLICATION-DB.md + vérifier que better-sqlite3 est installé

**La reconnexion ne fonctionne pas**
→ GUIDE-TEST.md (Test 2) + vérifier localStorage dans la console

**Erreur au démarrage du serveur**
→ Vérifier les dépendances : `npm install`

**Données perdues après redémarrage**
→ Vérifier que brume.db existe : `ls brume.db`

---

**Dernière mise à jour** : 9 novembre 2025
**Version** : Brume v2.0 avec persistance SQLite
