const express = require('express');
const exp = express();
const server = require('http').createServer(exp);
const io = require('socket.io')(server);
const port = 8000;

const path = require('path');
const moment = require('moment');
const Guid = require('guid');

server.listen(port, () => {
  console.log('http://0.0.0.0:%d', port);
});

// exp.use(express.static(path.join(__dirname, 'public')));

// exp.set('views', __dirname + '/dist');
// exp.get('/', (req, res) => {
//   res.render('index', {});
// });

const getNowDatetimeString = function () {
  return moment().format('YYYY-MM-DD H:m:s');
}

let participants = [];

io.on('connection', (socket) => {
  let addedUser = false;

  socket.on('new-message', (data) => {
    let obj = {
      id: Guid.create(),
      userName: socket.userName,
      content: data,
      createdAt: getNowDatetimeString(),
      isMine: false
    };
    socket.broadcast.emit('new-message', obj);

    obj.isMine = true;
    socket.emit('new-message', obj);
  });

  socket.on('add-user', (userName) => {
    if (addedUser) return;

    if (participants.indexOf(userName) === -1) {
      participants.push(userName);
    } else {
      socket.emit('duplication');
      return;
    }

    socket.userName = userName;

    addedUser = true;

    socket.emit('login', {
      id: Guid.create(),
      participants: participants,
      createdAt: getNowDatetimeString(),
    });

    socket.broadcast.emit('user-joined', {
      id: Guid.create(),
      userName: socket.userName,
      participants: participants,
      createdAt: getNowDatetimeString(),
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      id: Guid.create(),
      userName: socket.userName,
      createdAt: getNowDatetimeString(),
    });
  });

  socket.on('stop-typing', () => {
    socket.broadcast.emit('stop-typing', {
      id: Guid.create(),
      userName: socket.userName,
      createdAt: getNowDatetimeString(),
    });
  });

  socket.on('disconnect', () => {
    if (addedUser) {
      const index = participants.indexOf(socket.userName);
      participants.splice(index, 1);

      socket.broadcast.emit('user-left', {
        id: Guid.create(),
        userName: socket.userName,
        participants: participants,
        createdAt: getNowDatetimeString(),
      });
    }
  });
});
