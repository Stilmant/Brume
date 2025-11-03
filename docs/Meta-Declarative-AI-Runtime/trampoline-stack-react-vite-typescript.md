# Tremplin recommandé vers la cible SPA

## Objectif
Préparer une interface React moderne qui respecte la future génération depuis des descripteurs JSON, tout en restant facile à comprendre et à maintenir.

## Pile
- **React 18** pour la composition d’interface par composants.
- **Vite** pour le dev server rapide et le build.
- **TypeScript** pour la sécurité de types.
- **React Router** pour la navigation multi écrans.
- **socket.io-client** pour le temps réel.
- **Zustand** pour un store global minimal et prévisible.
- **Pico.css** pour des styles responsives sans classes complexes.

## Arbo React à viser
```
frontend/
  src/
    main.tsx
    app.tsx
    routes/
      index.tsx
      chat.tsx
    store/
      useAppStore.ts
    sockets/
      socket.ts
    components/
      Card.tsx
      CardList.tsx
      Form.tsx
      Button.tsx
    registry/
      blocks.ts
      actions.ts
    i18n/
      index.ts
  index.html
  vite.config.ts
```

## Règles de génération minimales
- **Pages** vers `routes/` et config du Router.
- **Blocks** vers JSX via `registry/blocks.ts`.
- **Actions** fonctions pures dans `registry/actions.ts` mappées depuis le JSON.
- **State** accès contrôlé via `useAppStore` et setters nommés.
- **Sockets** handlers centralisés dans `sockets/socket.ts` qui dispatchent vers actions.

## Pourquoi cette structure
- Prévisible pour une IA qui génère du code.
- Facile à tester et à étendre.
- Proche des standards actuels, sans dépendances lourdes.
