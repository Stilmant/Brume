---
# 📅 Quand et comment la base de données est-elle créée ?

## Réponse synthétique

**La base SQLite (`brume.db`) est créée automatiquement dès le démarrage du serveur, lors de l'import de `db.js`.**

Vous n'avez rien à faire : tout est automatique !

---

## Schéma visuel

```
┌──────────────┐
│ node server.js│
└───────┬──────┘
  │
  ▼
┌─────────────────────────────┐
│ import { ... } from db.js   │
└───────┬────────────────────┘
  │
  ▼
┌─────────────────────────────┐
│ new Database('brume.db')   │
│ db.exec(CREATE TABLE ...)  │
└───────┬────────────────────┘
  │
  ▼
┌─────────────────────────────┐
│ Serveur prêt                │
└───────┬────────────────────┘
  │
  ▼
┌─────────────────────────────┐
│ Premier utilisateur         │
└─────────────────────────────┘
```

---

## Analogie

"Démarrer le serveur, c'est comme ouvrir un restaurant : la cuisine (base) est prête avant l'arrivée des clients (utilisateurs)."

---

## Pour plus de détails

Voir [EXPLICATION-DB.md](EXPLICATION-DB.md) pour la version complète (FAQ, explications, tests pratiques).
---
