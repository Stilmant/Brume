// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static("public"));

const sessions = new Map(); // id -> { messages:[{from,text,ts}], unread:boolean }

io.on("connection", socket => {
  const role = socket.handshake.query.role; // "user" ou "admin"

  if (role === "admin") {
    socket.join("admins");
    pushList();

    socket.on("join_session", id => {
      const s = sessions.get(id);
      if (!s) return;
      socket.join("s:"+id);
      s.unread = false;
      socket.emit("history", { id, messages: s.messages });
      pushList();
    });

    socket.on("answer", ({ id, text }) => {
      const s = sessions.get(id);
      if (!s || !text?.trim()) return;
      s.messages.push({ from: "admin", text, ts: Date.now() });
      io.to("u:"+id).emit("answer", { text });
      io.to("s:"+id).emit("admin_echo", { text });
    });

  } else { // user
    const id = uuidv4().slice(0,8);
    sessions.set(id, sessions.get(id) || { messages: [], unread: false });
    socket.join("u:"+id);
    socket.emit("welcome", { id });

    socket.on("ask", text => {
      if (!text?.trim()) return;
      const s = sessions.get(id);
      s.messages.push({ from: "user", text, ts: Date.now() });
      s.unread = true;
      io.to("admins").emit("new_question", { id, text });
      pushList();
    });
  }

  function pushList() {
    const list = [...sessions.entries()].map(([id, s]) => ({
      id, unread: s.unread, messages: s.messages.length
    }));
    io.to("admins").emit("session_list", list);
  }
});

const port = process.env.PORT || 3000;
httpServer.listen(port, "0.0.0.0", () => {
  console.log("Server on port", port);
});