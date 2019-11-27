const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = 9000

const app = express();
const server = http.createServer(app)
const io = socketio(server);

io.on('connection', (socket) => {
  const socketId = socket.id

  socket.on('tweet', () => console.log('Hello'));

  socket.on('updateListen', (user) => {
    socket.broadcast.emit('updated', user)
  })
});

server.listen(PORT);