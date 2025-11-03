# Squelette de référence simple

## Arborescence
```
/server
  index.mjs
  socket.mjs

/public
  index.html
  app.css
  js/
    alpine.min.js   (optionnel)
    pico.min.css    (via CDN ou local)

/descriptors
  pages.json
  schema.json
  cards.json
  machine.json
  i18n.json
```

## Règles de base
- Le serveur Express sert `/public` et expose `/descriptors/:name`.
- Le client charge les descripteurs au démarrage.
- Le client gère un store simple `{ messages: [], form: { body: "" }, user: null }`.
- Les actions sont centralisées et adressables par nom.
- Les événements Socket.IO sont re-mappés vers des actions via `machine.json`.

## Bonnes pratiques
- Aucune logique framework dans les JSON.
- Noms courts et cohérents pour `type`, `bind`, `action`.
- Préférer des blocs simples: `cardList`, `form`, `button`, `h1`.
- Ajouter l’i18n uniquement par référence `@i18n.key`.

## Exemple minimal de pages.json
```json
{
  "app": { "title": "Demo", "routes": [{ "path": "/", "page": "home" }] },
  "pages": {
    "home": {
      "layout": "center",
      "blocks": [
        { "type": "h1", "text": "@i18n.welcome" },
        { "type": "button", "text": "@i18n.go_chat", "action": { "type": "navigate", "to": "/chat" } }
      ]
    }
  }
}
```
