# Brume - Fausse Intelligence Artificielle

## Description
Brume est une application web interactive qui simule une intelligence artificielle. Elle permet aux utilisateurs anonymes de poser des questions et de recevoir des réponses en temps réel. Les administrateurs peuvent gérer les sessions utilisateur et répondre directement aux questions via une interface dédiée.

Ce projet est conçu pour être simple et éducatif, idéal pour apprendre les bases du développement web avec Node.js, Express, et Socket.IO.

---

## Fonctionnalités

### Côté Utilisateur
- Interface de chat moderne et intuitive.
- Animation simulant une réflexion de l'IA.
- Envoi de questions anonymes.

### Côté Administrateur
- Liste des utilisateurs connectés.
- Notifications lorsqu'un utilisateur pose une question.
- Interface de chat pour répondre aux utilisateurs.

---

## Architecture

### Technologies Utilisées
- **Node.js** : Serveur backend.
- **Express** : Framework pour gérer les routes et servir les fichiers statiques.
- **Socket.IO** : Gestion des interactions en temps réel entre utilisateurs et administrateurs.
- **HTML/CSS** : Interfaces utilisateur et administrateur.

### Structure du Projet
```
/
|-- public/
|   |-- user.html       # Interface utilisateur
|   |-- admin.html      # Interface administrateur
|-- server.js           # Serveur Node.js
|-- package.json        # Dépendances et configuration
```

---

## Installation et Lancement

### Prérequis
- Node.js installé sur votre machine.

### Étapes
1. Clonez ce dépôt :
   ```bash
   git clone <url-du-repo>
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Lancez le serveur :
   ```bash
   node server.js
   ```
4. Ouvrez un navigateur et accédez à :
   - `http://localhost:3000/user.html` pour l'interface utilisateur.
   - `http://localhost:3000/admin.html` pour l'interface administrateur.

---

## Explication du Code

### `server.js`
- Configure un serveur Express pour servir les fichiers statiques.
- Utilise Socket.IO pour gérer les événements en temps réel.
- Stocke les sessions utilisateur en mémoire.

### `public/user.html`
- Interface utilisateur avec un champ pour poser des questions.
- Affiche les réponses de l'IA avec une animation de réflexion.

### `public/admin.html`
- Liste les utilisateurs connectés.
- Permet aux administrateurs de répondre aux questions.

---

## Améliorations Futures
- Ajouter une base de données (SQLite) pour stocker les sessions.
- Permettre aux utilisateurs de se reconnecter à leur session.
- Ajouter des fonctionnalités de modération pour les administrateurs.

---

## Auteur
Ce projet a été créé pour apprendre et enseigner les bases du développement web avec Node.js. Profitez-en pour explorer, expérimenter et vous amuser !