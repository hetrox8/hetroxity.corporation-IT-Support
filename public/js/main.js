// Initialize chat widget
const chatWidget = document.createElement('div');
chatWidget.innerHTML = `
<div class="chat-widget">
  <div class="chat-header bg-primary text-white p-3 rounded-top">
    <h5 class="mb-0">Live Chat Support</h5>
    <button class="btn-close btn-close-white close-chat"></button>
  </div>
  <div class="chat-body bg-white p-3 d-none">
    <div class="messages mb-3" style="height: 300px; overflow-y: auto"></div>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Type your message...">
      <button class="btn btn-primary send-btn">Send</button>
    </div>
  </div>
</div>
`;

document.body.appendChild(chatWidget);

// Socket.io setup
const socket = io();
const chatInput = chatWidget.querySelector('input');
const sendBtn = chatWidget.querySelector('.send-btn');
const messagesDiv = chatWidget.querySelector('.messages');
const chatBody = chatWidget.querySelector('.chat-body');
const closeChat = chatWidget.querySelector('.close-chat');

// Toggle chat visibility
chatWidget.querySelector('.chat-header').addEventListener('click', () => {
  chatBody.classList.toggle('d-none');
});

closeChat.addEventListener('click', () => {
  chatBody.classList.add('d-none');
});

// Handle message sending
sendBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if(message) {
    socket.emit('chatMessage', {
      name: 'User',
      message: message
    });
    chatInput.value = '';
  }
});

// Receive messages
socket.on('message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.className = 'message mb-2';
  messageElement.innerHTML = `
    <strong>${msg.name}:</strong> ${msg.message}
    <small class="text-muted d-block">${new Date().toLocaleTimeString()}</small>
  `;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});