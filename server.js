// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import {
  getOrCreateSession,
  addMessage,
  setUnread,
  getAllSessions,
  sessionExists
} from "./db.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

io.on("connection", socket => {
  const role = socket.handshake.query.role; // "user" ou "admin"

  if (role === "admin") {
    socket.join("admins");
    pushList();

    socket.on("join_session", id => {
      if (!sessionExists(id)) return;
      socket.join("s:"+id);
      setUnread(id, false);
      const session = getOrCreateSession(id);
      socket.emit("history", { id, messages: session.messages });
      pushList();
    });

    socket.on("answer", ({ id, text }) => {
      if (!sessionExists(id) || !text?.trim()) return;
      addMessage(id, "admin", text);
      io.to("u:"+id).emit("answer", { text });
      io.to("s:"+id).emit("admin_echo", { text });
    });

  } else { // user
    // Gérer la reconnexion avec un ID existant
    const existingId = socket.handshake.query.sessionId;
    let id;

    if (existingId && sessionExists(existingId)) {
      // Reconnexion
      id = existingId;
      const session = getOrCreateSession(id);
      socket.emit("welcome", { id, reconnected: true });
      socket.emit("restore_history", { messages: session.messages });
    } else {
      // Nouvelle session
      id = uuidv4().slice(0,8);
      getOrCreateSession(id);
      socket.emit("welcome", { id, reconnected: false });
    }

    socket.join("u:"+id);

    socket.on("ask", text => {
      if (!text?.trim()) return;
      addMessage(id, "user", text);
      setUnread(id, true);
      io.to("admins").emit("new_question", { id, text });
      pushList();
    });
  }

  function pushList() {
    const list = getAllSessions();
    io.to("admins").emit("session_list", list);
  }
});

app.get('/', (req, res) => {
  res.redirect('/user.html');
});

const port = process.env.PORT || 3000;
httpServer.listen(port, "0.0.0.0", () => {
  console.log("Server on port", port);
});