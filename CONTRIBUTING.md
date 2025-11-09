# 🤝 Guide de Contribution - Brume

Merci de votre intérêt pour contribuer à Brume ! Ce document vous guidera à travers le processus.

---

## 🎯 Types de Contributions

Nous accueillons plusieurs types de contributions :

- 🐛 **Bug reports** : Signaler des bugs
- ✨ **Features** : Proposer de nouvelles fonctionnalités
- 📝 **Documentation** : Améliorer la documentation
- 🎨 **Design** : Améliorer l'interface utilisateur
- 🔒 **Sécurité** : Améliorer la sécurité
- 🧪 **Tests** : Ajouter des tests automatisés
- 🌍 **Traductions** : Internationaliser l'application

---

## 🚀 Commencer

### 1. Fork le projet

Cliquez sur le bouton "Fork" en haut à droite sur GitHub.

### 2. Cloner votre fork

```bash
git clone https://github.com/VOTRE-USERNAME/Brume.git
cd Brume
```

### 3. Créer une branche

```bash
git checkout -b feature/ma-super-fonctionnalite
# ou
git checkout -b fix/correction-bug
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Lancer le serveur

```bash
npm start
```

---

## 📝 Standards de Code

### Style JavaScript

- ✅ Utiliser ES6+ (import/export, const/let, arrow functions)
- ✅ 2 espaces pour l'indentation
- ✅ Point-virgule à la fin des instructions
- ✅ Noms de variables en camelCase
- ✅ Commentaires en français pour cohérence avec le projet

**Exemple** :
```javascript
// Bonne pratique
const sessionId = socket.handshake.query.sessionId;
if (sessionId && sessionExists(sessionId)) {
  // Traitement...
}

// Éviter
var session_id = socket.handshake.query.sessionId
if(session_id&&sessionExists(session_id)){
  // Traitement...
}
```

### Style HTML/CSS

- ✅ Indentation 2 espaces
- ✅ Classes en kebab-case (`message-content`, `chat-area`)
- ✅ IDs en camelCase (`sessionId`, `chatArea`)
- ✅ CSS organisé par composant

---

## 🧪 Tests

Avant de soumettre une PR, assurez-vous que :

```bash
# Tests manuels passent
npm test

# Le serveur démarre sans erreur
npm start

# Les deux interfaces sont accessibles
# - http://localhost:3000/user.html
# - http://localhost:3000/admin.html
```

---

## 📦 Commit

### Format des messages

Utilisez des messages de commit clairs et descriptifs :

```
type(scope): Description courte

Description plus longue si nécessaire.
```

**Types** :
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation uniquement
- `style`: Formatage, style
- `refactor`: Refactoring sans changement de fonctionnalité
- `test`: Ajout de tests
- `chore`: Maintenance, config

**Exemples** :
```bash
git commit -m "feat(auth): Ajout authentification admin avec JWT"
git commit -m "fix(db): Correction fuite mémoire dans getAllSessions"
git commit -m "docs(readme): Mise à jour section installation"
```

---

## 📤 Pull Request

### 1. Pousser votre branche

```bash
git push origin feature/ma-super-fonctionnalite
```

### 2. Créer la Pull Request

Allez sur GitHub et cliquez sur "New Pull Request".

### 3. Remplir le template

**Titre** : Clair et descriptif
```
Ajout de l'authentification admin avec JWT
```

**Description** :
```markdown
## 🎯 Objectif
Ajouter une authentification sécurisée pour l'interface admin.

## 🔧 Modifications
- Ajout du middleware d'authentification JWT
- Nouvelle route `/api/login`
- Protection de `/admin.html`
- Tests unitaires ajoutés

## ✅ Tests effectués
- [x] Connexion avec credentials valides
- [x] Rejet avec credentials invalides
- [x] Token expiré géré correctement
- [x] Interface admin protégée

## 📸 Screenshots
(Si applicable)

## 📝 Notes
Nécessite `npm install jsonwebtoken`
```

### 4. Checklist avant soumission

- [ ] Le code compile sans erreur
- [ ] Les tests passent (`npm test`)
- [ ] La documentation est à jour
- [ ] Les commits sont propres et descriptifs
- [ ] Pas de fichiers générés (node_modules, brume.db)
- [ ] Le code respecte les standards du projet

---

## 🎯 Domaines Prioritaires

Voici les domaines où nous avons particulièrement besoin d'aide :

### 🔒 Sécurité (HIGH PRIORITY)
- [ ] Authentification admin (JWT, OAuth, Basic Auth)
- [ ] Rate limiting
- [ ] Validation des entrées
- [ ] Protection CSRF
- [ ] Sanitization HTML

### 🧪 Tests (HIGH PRIORITY)
- [ ] Tests unitaires (Jest/Mocha)
- [ ] Tests d'intégration
- [ ] Tests E2E (Playwright/Cypress)
- [ ] CI/CD (GitHub Actions)

### 📊 Features
- [ ] Multi-admin avec attribution
- [ ] Statistiques et analytics
- [ ] Export conversations (JSON, CSV)
- [ ] Recherche dans l'historique
- [ ] Filtres avancés

### 🎨 UI/UX
- [ ] Thèmes personnalisables
- [ ] Mode clair/sombre
- [ ] Animations améliorées
- [ ] Accessibilité (ARIA labels)
- [ ] Responsive mobile

### 🌍 Internationalisation
- [ ] Système i18n
- [ ] Traduction anglaise
- [ ] Traduction espagnole
- [ ] Autres langues

---

## 🐛 Signaler un Bug

### Template de Bug Report

```markdown
## 🐛 Description du bug
Description claire et concise du bug.

## 🔄 Étapes pour reproduire
1. Aller sur '...'
2. Cliquer sur '....'
3. Faire défiler jusqu'à '....'
4. Voir l'erreur

## ✅ Comportement attendu
Description de ce qui devrait se passer.

## ❌ Comportement actuel
Description de ce qui se passe réellement.

## 📸 Screenshots
Si applicable, ajouter des captures d'écran.

## 🖥️ Environnement
- OS: [e.g., Windows 11, macOS 14, Ubuntu 22.04]
- Navigateur: [e.g., Chrome 120, Firefox 121]
- Node.js: [e.g., 20.10.0]
- Version Brume: [e.g., 2.1.0]

## 📝 Informations additionnelles
Contexte additionnel sur le problème.

## 🔍 Logs
```
Coller ici les logs d'erreur
```
```

---

## 💡 Proposer une Feature

### Template de Feature Request

```markdown
## 🎯 Problème à résoudre
Décrivez le problème que cette feature résoudrait.

## 💡 Solution proposée
Décrivez votre solution idéale.

## 🔄 Alternatives considérées
Autres solutions envisagées.

## 📊 Impact
- **Utilisateurs affectés** : [Tous, Admin seulement, etc.]
- **Complexité estimée** : [Faible, Moyenne, Élevée]
- **Breaking changes** : [Oui/Non]

## 🎨 Mockups / Exemples
Si applicable, ajouter des mockups ou exemples de code.
```

---

## 📚 Documentation

### Améliorer la documentation

La documentation est aussi importante que le code !

**Où contribuer** :
- README.md - Documentation principale
- GUIDE-TEST.md - Scénarios de test
- EXPLICATION-DB.md - Explications techniques
- Autres fichiers .md dans le projet

**Standards** :
- ✅ Français correct et clair
- ✅ Exemples de code fonctionnels
- ✅ Captures d'écran si pertinent
- ✅ Liens entre documents
- ✅ Émojis pour la lisibilité 📚

---

## 🏅 Reconnaissance

Tous les contributeurs seront ajoutés au fichier CONTRIBUTORS.md avec :
- Nom / Pseudo
- Contributions principales
- Lien GitHub (optionnel)

---

## 📞 Questions ?

- 💬 **GitHub Discussions** : Pour les questions générales
- 🐛 **GitHub Issues** : Pour les bugs et features
- 📧 **Email** : (À définir si nécessaire)

---

## 📜 Licence

En contribuant, vous acceptez que vos contributions soient sous licence ISC, comme le reste du projet.

---

**Merci de contribuer à Brume ! 🎉**

Chaque contribution, petite ou grande, est appréciée et aide à améliorer le projet pour tous.
