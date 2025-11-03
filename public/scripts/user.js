// user.js - Logique client pour l'interface utilisateur Brume

const socket = io({ query: { role: 'user' } });
const chat = document.getElementById('chat');
const form = document.getElementById('f');
const input = document.getElementById('q');
const sessionIdEl = document.getElementById('sessionId');

let typingEl = null;
let firstMessage = true;

/**
 * Ajoute un message dans la zone de chat
 * @param {string} type - Type du message : 'user', 'ai', etc.
 * @param {string} text - Contenu du message
 */
function addMessage(type, text) {
  if (firstMessage) {
    chat.innerHTML = '';
    firstMessage = false;
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + type;

  let avatar;
  if (type === 'ai') {
    avatar = document.createElement('div');
    avatar.className = 'avatar ai';
    avatar.innerHTML = '<img src="brume-thought.svg" alt="Brume" />';
  } else if (type === 'user') {
    avatar = document.createElement('div');
    avatar.className = 'avatar user';
    avatar.textContent = 'V';
  } else {
    avatar = document.createElement('div');
    avatar.className = 'avatar ' + type;
    avatar.textContent = '?';
  }

  const content = document.createElement('div');
  content.className = 'message-content';
  content.textContent = text;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  chat.appendChild(messageDiv);
  chat.scrollTop = chat.scrollHeight;
}

/**
 * Affiche l'animation de réflexion (typing indicator)
 */
function showTyping() {
  if (typingEl) return;

  if (firstMessage) {
    chat.innerHTML = '';
    firstMessage = false;
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ai';

  const avatar = document.createElement('div');
  avatar.className = 'avatar ai';
  avatar.innerHTML = '<img src="brume-thought.svg" alt="Brume" />';

  const content = document.createElement('div');
  content.className = 'message-content';

  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.innerHTML = '<span></span><span></span><span></span>';

  content.appendChild(typing);
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  chat.appendChild(messageDiv);

  typingEl = messageDiv;
  chat.scrollTop = chat.scrollHeight;
}

/**
 * Cache l'animation de réflexion
 */
function hideTyping() {
  if (typingEl) {
    typingEl.remove();
    typingEl = null;
  }
}

// Événement : Réception de l'ID de session
socket.on('welcome', ({ id }) => {
  sessionIdEl.textContent = 'Session: ' + id;
});

// Événement : Réception d'une réponse de l'admin
socket.on('answer', ({ text }) => {
  hideTyping();
  addMessage('ai', text);
});

// Événement : Soumission du formulaire (envoi de message)
form.addEventListener('submit', e => {
  e.preventDefault();
  const t = input.value.trim();
  if (!t) return;

  addMessage('user', t);
  input.value = '';
  showTyping();
  socket.emit('ask', t);
});

// Événement : Auto-ajustement de la hauteur du champ de saisie
input.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});
