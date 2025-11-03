# Design Doc v0.1: Declarative App Runtime

## 1. Purpose and philosophy
Build a reusable toolkit for multi screen, real time web apps where UI and logic are described in simple JSON. The codebase stays small and modular. Humans and AI edit JSON descriptors, while a lightweight toolchain renders screens, binds state, and wires Socket.IO events.

Guiding principles:
- Describe what, not how. JSON drives pages, forms, cards, and reactions.
- Keep the generated code tiny and readable. No heavy SPA is required for the first target.
- Prefer standards. JSON Schema for data. Adaptive Cards subset for content. Statechart style rules for logic.
- Mobile first by default with lightweight CSS. Desktop can enable richer modes without changing descriptors.
- Make the system easy to extend, test, and document.

## 2. Architecture overview

### Backend
- Node.js 20+, Express, Socket.IO.
- Serves static files and JSON descriptors.
- Emits and listens to Socket.IO events for real time flows.

### Frontend targets
- Target A: Alpine plus vanilla JS, Pico.css for responsive defaults.
- Target B: React 18 with Vite and TypeScript for a full SPA.
- Both targets consume the same descriptors.

### Declarative layer files
- `pages.json` routes and screen composition.
- `schema.json` data definitions with JSON Schema. Optional UI schema for JSON Forms.
- `cards.json` content blocks using an Adaptive Cards subset.
- `machine.json` statechart style logic and event reactions.
- `i18n.json` key to text dictionaries.

## 3. Project layout

```
/server
  index.mjs
  socket.mjs
  config.mjs

/public
  index.html
  css/pico.min.css
  js/alpine.min.js
  js/htmx.min.js   (optional)
  runtime/
    runtime.mjs
    state.mjs
    ui.mjs
    actions.mjs
    socket.mjs
    i18n.mjs
    adapters/
      adaptiveCards.mjs
      jsonForms.mjs

/descriptors
  pages.json
  schema.json
  cards.json
  machine.json
  i18n.json
```

## 4. Declarative layer specifications

### 4.1 `pages.json`
Describes routes and the composition of each page using blocks. Each block is a content card, a generated form, or a control.

Key ideas:
- `routes` path to page mapping.
- `pages` page descriptors with `layout` and `blocks`.
- Blocks have `type`, optional `bind` to state paths, and optional `actions`.

Example:
```json
{
  "app": {
    "title": "Demo",
    "theme": "auto",
    "routes": [
      { "path": "/", "page": "home" },
      { "path": "/chat", "page": "chat" }
    ]
  },
  "pages": {
    "home": {
      "layout": "center",
      "blocks": [
        { "type": "h1", "text": "@i18n.welcome" },
        { "type": "button", "text": "@i18n.go_chat", "action": { "type": "navigate", "to": "/chat" } }
      ]
    },
    "chat": {
      "layout": "split",
      "blocks": [
        { "type": "cardList", "bind": "messages", "cardRef": "messageCard" },
        { "type": "form", "schemaRef": "messageSchema", "uiRef": "messageUi",
          "actions": [
            { "label": "@i18n.send", "type": "socket.emit", "event": "message:send", "payload": { "body": "$form.body" },
              "after": [{ "type": "state.set", "path": "form.body", "to": "" }]
            }
          ]
        }
      ]
    }
  }
}
```

### 4.2 `schema.json`
Holds JSON Schema for forms and validation. Optionally holds UI schema definitions if using JSON Forms.

Example:
```json
{
  "schemas": {
    "messageSchema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "type": "object",
      "properties": {
        "body": { "type": "string", "minLength": 1 }
      },
      "required": ["body"]
    }
  },
  "uiSchemas": {
    "messageUi": {
      "type": "VerticalLayout",
      "elements": [
        { "type": "Control", "scope": "#/properties/body", "label": "@i18n.message" }
      ]
    }
  }
}
```

### 4.3 `cards.json`
Defines content blocks using a restricted Adaptive Cards subset.

Example:
```json
{
  "cards": {
    "messageCard": {
      "type": "AdaptiveCard",
      "version": "1.5",
      "body": [
        { "type": "TextBlock", "text": "$item.author", "weight": "bolder" },
        { "type": "TextBlock", "text": "$item.body", "wrap": true, "spacing": "small" }
      ]
    }
  }
}
```

### 4.4 `machine.json`
Statechart style reactions. Each rule listens to an event and runs a sequence of actions.

Event sources:
- `socket.<eventName>` from Socket.IO.
- `ui.<id>.<event>` for user interactions if needed.

Example:
```json
{
  "rules": [
    {
      "on": "socket.message:new",
      "do": [
        { "type": "state.push", "path": "messages", "value": "$event.data" },
        { "type": "toast", "level": "info", "text": "@i18n.new_message" }
      ]
    }
  ]
}
```

### 4.5 `i18n.json`
Key based dictionaries. The runtime picks a locale and replaces `@i18n.key`.

Example:
```json
{
  "en": {
    "welcome": "Welcome",
    "go_chat": "Go to chat",
    "message": "Message",
    "send": "Send",
    "new_message": "New message received"
  },
  "fr": {
    "welcome": "Bienvenue",
    "go_chat": "Aller au chat",
    "message": "Message",
    "send": "Envoyer",
    "new_message": "Nouveau message reçu"
  }
}
```

## 5. Runtime behavior

Initialization:
1. Load `i18n.json`, select locale.
2. Load `pages.json`, `schema.json`, `cards.json`, `machine.json`.
3. Initialize client store with defaults.
4. Initialize Socket.IO client and bind rules to events.
5. Render the route from `location.pathname`.
6. Activate bindings.

State model:
```js
store = { messages: [], form: { body: "" }, user: null, ui: {} };
```
Mutations happen only through actions to keep updates predictable.

Event handling:
- Socket events map to rule sequences in `machine.json`.
- UI actions call the same dispatcher.
- The dispatcher executes atomic actions in order and triggers UI updates.

## 6. Action primitives

- `state.set` set a value at path.
- `state.push` push into an array.
- `state.patch` shallow merge object at path.
- `navigate` change route.
- `socket.emit` send an event with payload.
- `toast` transient notification.
- `form.reset` reset a form scope.

Value placeholders:
- `$item` current item in list context.
- `$form.*` values from the current form.
- `$state.*` read from store.
- `$event.*` event payload in rules.

## 7. Backend outline

```js
// index.mjs
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/descriptors/:name", (req, res) => {
  const file = path.join(__dirname, "../descriptors", req.params.name);
  res.sendFile(file);
});

io.on("connection", socket => {
  socket.on("message:send", payload => {
    const msg = { author: "User", body: payload.body, ts: Date.now() };
    io.emit("message:new", msg);
  });
});

httpServer.listen(3000, () => console.log("Listening on http://localhost:3000"));
```

## 8. Example flow: realtime chat
- `pages.json` defines a chat page with a list bound to `messages` and a form bound to `messageSchema`.
- On submit, `socket.emit` sends `message:send`.
- Server broadcasts `message:new`.
- `machine.json` rule catches `socket.message:new` and runs `state.push` on `messages`.
- The list updates in place.

## 9. Mobile and desktop modes
- Pico.css provides responsive defaults.
- Pages can declare hints like `layout: "split"` or block props like `cols: 2`.
- A simple rule can set `ui.mode = "desktop"` when width passes a threshold. Blocks can use `visibleIf` on that flag.

## 10. Roadmap
- Add actions: `http.get`, `http.post`, `download`, `clipboard.copy`.
- Plugin registry for custom blocks.
- Theme switching and preferences in localStorage.
- Export to a mobile target by generating a React Native layer from the same descriptors where feasible.
