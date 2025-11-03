# Les fondations techniques définies

## Objectif
Disposer d’un socle stable pour créer des applications temps réel en décrivant l’interface et la logique en JSON. Le back reste Node.js 20+, Express et Socket.IO. Le front peut être interprété par une cible légère Alpine ou compilé vers une SPA React avec Vite et TypeScript.

## Couches et rôles
- **Back**: sert les descripteurs, gère les événements Socket.IO, expose les APIs si besoin.
- **Descripteurs JSON**: définissent pages, blocs, formulaires, cartes de contenu, règles d’événements, textes.
- **Cible Front**:
  - A. Alpine plus vanilla JS avec Pico.css pour un rendu responsive immédiat.
  - B. React 18 avec Vite et TypeScript pour une application modulaire et testable.
- **i18n**: dictionnaires par langue, clé simple `@i18n.*`.

## Fichiers déclaratifs
- `pages.json` routes et composition d’écran
- `schema.json` schémas JSON Schema et UI schema optionnel
- `cards.json` cartes de contenu style Adaptive Cards
- `machine.json` règles événementielles style statechart
- `i18n.json` textes multilingues

## Modèle d’état
Un objet simple, modifié uniquement via des actions déclaratives:
- `state.set`, `state.push`, `state.patch`
- actions de navigation, sockets, notifications

## Flux type Chat
1. Le client rend la page `chat` depuis `pages.json`.
2. L’utilisateur envoie un message. Action `socket.emit`.
3. Le serveur émet `message:new`.
4. Une règle de `machine.json` applique `state.push` vers `messages`.
5. La liste se met à jour.

## Responsivité
- Pico.css pour un style mobile first.
- Media queries personnalisées pour un mode desktop plus riche.
- Pas de dépendance à un design system lourd.

## Évolution prévue
- Générateur React depuis les mêmes descripteurs.
- Actions HTTP et plugins de blocs.
- Cible mobile à terme avec un sous ensemble commun.

## Pourquoi cette base
- Standards réutilisables
- Lecture simple pour humains et IA
- Séparation entre sémantique (JSON) et interprétation (cible front)
