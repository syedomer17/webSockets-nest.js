const socket = io('http://localhost:3002');

const usernameModal = document.getElementById('usernameModal');
const usernameInput = document.getElementById('usernameInput');
const joinChatBtn = document.getElementById('joinChatBtn');

const chatContainer = document.getElementById('chatContainer');
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username = '';

// Helper: Add message to chat UI
function addMessage(text, className = '') {
  const li = document.createElement('li');
  li.textContent = text;
  if (className) li.classList.add(className);
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // scroll down
}

// When user clicks Join Chat
joinChatBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (!name) {
    alert('Please enter a username');
    return;
  }
  username = name;
  usernameModal.classList.add('hidden');
  chatContainer.classList.remove('hidden');

  // Notify server user joined with username
  socket.emit('join', username);

  addMessage(`✅ You joined as ${username}`, 'system-message');
  messageInput.focus();
});

// Send message function
function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;
  socket.emit('newMessage', { message: msg, username });
  messageInput.value = '';
}

// Send button click
sendButton.addEventListener('click', sendMessage);

// Send message on Enter key press
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});

// Receive new chat messages
socket.on('message', (data) => {
  addMessage(`${data.username}: ${data.message}`);
});

// User joined notification
socket.on('user-joined', (data) => {
  addMessage(`🟢 ${data.username} joined the chat`, 'system-message');
});

// User left notification
socket.on('user-left', (data) => {
  addMessage(`🔴 ${data.username} left the chat`, 'system-message');
});
