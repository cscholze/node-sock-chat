'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);


// APP ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 3000;

// SETUP VIEW ENGINE
app.set('view engine', 'jade');

// SERVE STATIC FILES
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

// START LISTENING
server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// WEB SOCKET
ws.on('connection', socket => {
  console.log('socket connected');

  socket.on('sendChat', (msg) => {
    console.log('sending msg', msg);
    socket.broadcast.emit('receiveChat', msg);
  });
});
