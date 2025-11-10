# ✅ Quick Start - Brume v2.1

## 🚀 Installation en 30 secondes

```bash
# 1. Cloner
git clone https://github.com/Stilmant/Brume.git
cd Brume

# 2. Installer
npm install

# 3. Lancer
npm start
```


**C'est tout !** Ouvrez http://localhost:3000

---

## 🟢 Responsive & Mobile

L'interface Brume utilise [Pico.css](https://picocss.com/) pour un rendu élégant et responsive sur mobile (iPhone, Android) et desktop.

- 📱 `<meta name='viewport'>` dans chaque HTML
- 🎨 Pico.css chargé via CDN
- 🧪 Testé sur iPhone/Android

---

---

## 📱 URLs

- **Utilisateur** : http://localhost:3000/user.html
- **Admin** : http://localhost:3000/admin.html
- **Accueil** : http://localhost:3000 (redirige vers user.html)

---

## 🧪 Commandes utiles

```bash
npm start          # Lancer le serveur
npm test           # Tester la base de données
node demo-simple.js # Voir la démo d'initialisation DB
```

---

## 📚 Documentation

| Document | Contenu | Durée |
|----------|---------|-------|
| [README.md](README.md) | Documentation complète | 20 min |
| [GUIDE-TEST.md](GUIDE-TEST.md) | 6 scénarios de test | 10 min |
| [EXPLICATION-DB.md](EXPLICATION-DB.md) | Comment fonctionne SQLite | 15 min |
| [QUAND-DB-CREEE.md](QUAND-DB-CREEE.md) | Création de la DB expliquée | 3 min |

---

## 🎯 Fonctionnalités principales

✅ Chat en temps réel (Socket.IO)
✅ Interface utilisateur moderne
✅ Panel admin avec liste de sessions
✅ Persistance SQLite
✅ Reconnexion automatique
✅ Historique complet sauvegardé

---

## ⚠️ Important

**Projet éducatif** - Pas de sécurité admin par défaut.

Pour la production, voir : [README.md - Section Sécurité](README.md#%EF%B8%8F-notes-de-sécurité)

---

## 🆘 Problèmes ?

```bash
# Erreur de dépendances
npm install

# Base de données corrompue
rm brume.db
npm start  # Recréée automatiquement

# Port 3000 déjà utilisé
# Modifier dans server.js : httpServer.listen(3001)
```

---

## 📊 Structure minimale

```
Brume/
├── server.js          # Serveur Node.js
├── db.js              # Module SQLite
├── public/
│   ├── user.html      # Interface utilisateur
│   ├── admin.html     # Interface admin
│   ├── scripts/       # Logique client
│   └── styles/        # CSS
└── package.json       # Dépendances
```

---

**Version** : 2.1 (avec persistance + audit)
**Dernière mise à jour** : 9 novembre 2025
