const socket = io();

const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value;
  socket.emit('chat message', message);
  messageInput.value = '';
});

socket.on('chat message', (data) => {
  const li = document.createElement('li');
  li.innerHTML = `<span class="user-id">${data.id}</span> ${data.message}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
});
const userCount = document.querySelector('#user-count');

socket.on('user count', (count) => {
  let userOrUsers = count === 1 ? 'user' : 'users';
  userCount.innerHTML = `${count} ${userOrUsers} online`;
});
