# Sommaire commun — Projet Meta‑Declarative AI Runtime

## Introduction
Ce dépôt explore une nouvelle approche du développement d’applications : la **programmation méta‑déclarative**.  
Plutôt que d’écrire du code impératif, l’application est décrite comme un ensemble de **descripteurs JSON** (pages, formulaires, règles, contenu, texte).  
Ces fichiers représentent la **sémantique** de l’application : ce qu’elle doit afficher et comment elle doit réagir, sans imposer de technologie front‑end ou mobile spécifique.

Le projet Brume sert de base à cette expérimentation.  
Les documents ci‑dessous structurent les fondations techniques, les choix d’outils, et la trajectoire vers une pile moderne (React + Vite + TypeScript) pouvant être ultérieurement étendue vers d’autres cibles (Alpine/vanilla, mobile, etc.).

---

## Structure documentaire

### 1. Design Doc v0.1 — Declarative App Runtime
**Fichier :** `design-doc-v0.1-declarative-app-runtime.md`  
Décrit le concept formalisé, la philosophie et l’architecture complète (back‑end, front‑end, couches déclaratives, comportements, actions et flux).  
C’est la référence technique principale.

### 2. Les fondations techniques définies
**Fichier :** `fondations-techniques-definies.md`  
Présente les briques essentielles (Node.js, Express, Socket.IO, JSON Schema, Adaptive Cards, statecharts), la structure des fichiers et la logique de fonctionnement temps réel.

### 3. Squelette de référence simple
**Fichier :** `squelette-reference-simple.md`  
Un aperçu minimal de l’arborescence projet et des conventions de base pour les descripteurs JSON.  
Utile comme modèle pour amorcer un nouveau projet.

### 4. Meta‑Declarative AI Runtime — Concept
**Fichier :** `meta-declarative-ai-runtime-concept.md`  
Document de positionnement conceptuel : le projet comme preuve de concept d’un **langage d’intentions** interprétable et modifiable par des IA.  
Il replace le travail dans le contexte du développement « AI‑native ».

### 5. Tremplin technique vers la cible SPA
**Fichier :** `trampoline-stack-react-vite-typescript.md`  
Guide de transition vers une pile moderne React 18 + Vite + TypeScript + Router + socket.io‑client + Zustand + Pico.css.  
Il définit la structure recommandée pour préparer la génération automatique d’interface.

---

## Schéma logique

```
[ Descripteurs JSON ]
     |  (pages, schema, cards, machine, i18n)
     v
[ Générateur / Compilateur ]
     |--> Cible A : React + Vite + TS  → application SPA
     |--> Cible B : Alpine/Vanilla JS  → application légère responsive
     |
     v
[ Serveur Node.js + Express + Socket.IO ]
     ↕
[ Exécution en temps réel / Mises à jour UI ]
```

Le cœur du système reste indépendant du framework utilisé :  
la **sémantique** est décrite dans les fichiers JSON, et chaque **cible** n’est qu’une interprétation différente.

---

## Feuille de route synthétique

- [x] Formalisation du modèle déclaratif (Design Doc v0.1)
- [x] Définition des fondations techniques
- [x] Rédaction du squelette de référence
- [x] Choix de la pile React/Vite/TypeScript pour la première génération
- [ ] Implémentation du générateur React depuis les descripteurs
- [ ] Ajout d’une cible Alpine/vanilla
- [ ] Définition du format IR (Intermediate Representation) interne
- [ ] Première démo IA modifiant dynamiquement les descripteurs
- [ ] Export mobile (React Native) à partir du même modèle

---

## Vision d’ensemble

Le **Meta‑Declarative AI Runtime** propose une approche où :
- Les applications sont des données, non du code.
- Les frameworks sont des interprètes interchangeables.
- L’IA devient le principal agent de transformation et d’évolution du logiciel.

Ce dépôt constitue la première base cohérente de cette vision.

