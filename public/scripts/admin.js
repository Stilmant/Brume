// admin.js - Logique client pour l'interface administrateur Brume

const socket = io({ query: { role: 'admin' } });
const list = document.getElementById('list');
const chat = document.getElementById('chat');
const chatHeader = document.getElementById('chatHeader');
const msg = document.getElementById('msg');
const btn = document.getElementById('btn');
const sendDiv = document.getElementById('send');

let currentId = null;
let sessions = [];

/**
 * Affiche la liste des sessions utilisateurs
 * @param {Array} items - Liste des sessions avec leur état
 */
function renderList(items) {
  sessions = items;
  list.innerHTML = '';

  if (items.length === 0) {
    list.innerHTML = '<div style="padding:20px;text-align:center;color:#71717a;">En attente...</div>';
    return;
  }

  items.forEach(it => {
    const row = document.createElement('div');
    row.className = 'session-item' + (currentId === it.id ? ' active' : '');

    const header = document.createElement('div');
    header.className = 'session-header';

    const idSpan = document.createElement('span');
    idSpan.className = 'session-id';
    idSpan.textContent = it.id;

    const badgeContainer = document.createElement('div');
    if (it.unread) {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = 'NEW';
      badgeContainer.appendChild(badge);
    }

    header.appendChild(idSpan);
    header.appendChild(badgeContainer);

    const info = document.createElement('div');
    info.className = 'session-info';
    info.textContent = it.messages + ' message' + (it.messages > 1 ? 's' : '');

    row.appendChild(header);
    row.appendChild(info);

    row.onclick = () => {
      currentId = it.id;
      chatHeader.querySelector('h2').textContent = 'Conversation: ' + it.id;
      chat.innerHTML = '';
      sendDiv.style.display = 'flex';
      socket.emit('join_session', it.id);
      renderList(sessions);
    };

    list.appendChild(row);
  });
}

/**
 * Ajoute une bulle de message dans la zone de chat
 * @param {string} cls - Classe CSS : 'user' ou 'admin'
 * @param {string} text - Contenu du message
 */
function addBubble(cls, text) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + cls;

  let avatar;
  if (cls === 'admin') {
    avatar = document.createElement('div');
    avatar.className = 'avatar admin';
    avatar.innerHTML = '<img src="brume-thought.svg" alt="Brume" />';
  } else if (cls === 'user') {
    avatar = document.createElement('div');
    avatar.className = 'avatar user';
    avatar.textContent = 'U';
  } else {
    avatar = document.createElement('div');
    avatar.className = 'avatar ' + cls;
    avatar.textContent = '?';
  }

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(bubble);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

// Événement : Réception de la liste des sessions
socket.on('session_list', renderList);

// Événement : Réception de l'historique d'une session
socket.on('history', ({ id, messages }) => {
  chat.innerHTML = '';
  if (messages.length === 0) {
    chat.innerHTML = '<div class="empty-state">Aucun message</div>';
  } else {
    messages.forEach(m => addBubble(m.from === 'user' ? 'user' : 'admin', m.text));
  }
});

// Événement : Echo de la réponse envoyée par l'admin
socket.on('admin_echo', ({ text }) => addBubble('admin', text));

// Événement : Clic sur le bouton Envoyer
btn.onclick = () => {
  const t = msg.value.trim();
  if (!t || !currentId) return;
  socket.emit('answer', { id: currentId, text: t });
  msg.value = '';
  msg.style.height = 'auto';
};

// Événement : Envoi avec la touche Enter (sans Shift)
msg.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    btn.click();
  }
});

// Événement : Auto-ajustement de la hauteur du champ de saisie
msg.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});
