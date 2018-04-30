const express = require('express');
const ws = require('ws');
const app = express();

app.get('/', (req, res) => {
  res.sendfile(__dirname + '/ws.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port: 3000});
wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
  setInterval(
    () => ws.send(`${new Date()}`),
    1000
  )
})
