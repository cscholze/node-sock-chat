'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ws = require('socket.io')(server);

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
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

// WEB SOCKET
ws.on('connection', socket => {
  console.log('connection', socket);
});
