const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

let connectedUsers = new Set();

io.on('connection', (socket) => {
  console.log('User connected');
  connectedUsers.add(socket.id);
  io.emit('user count', connectedUsers.size);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    connectedUsers.delete(socket.id);
    io.emit('user count', connectedUsers.size);
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', { id: socket.id, message: msg });
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

