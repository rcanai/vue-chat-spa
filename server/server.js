// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8000;

const Guid = require('guid');

server.listen(port, () => {
  console.log('http://0.0.0.0:%d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

let participants = 0;

io.on('connection', (socket) => {
  let addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new-message', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new-message', {
      id: Guid.create(),
      userName: socket.userName,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add-user', (userName) => {
    if (addedUser) return;

    // we store the userName in the socket session for this client
    socket.userName = userName;
    participants += 1;
    addedUser = true;
    socket.emit('login', {
      id: Guid.create(),
      participants: participants
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user-joined', {
      id: Guid.create(),
      userName: socket.userName,
      participants: participants
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      id: Guid.create(),
      userName: socket.userName
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop-typing', () => {
    socket.broadcast.emit('stop-typing', {
      id: Guid.create(),
      userName: socket.userName
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      participants -= 1;

      // echo globally that this client has left
      socket.broadcast.emit('user-left', {
        id: Guid.create(),
        userName: socket.userName,
        participants: participants
      });
    }
  });
});
