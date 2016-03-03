'use strict';

const express = require('express');
const app = express();
const pg = require('pg');
const server = require('http').createServer(app);
const ws = require('socket.io')(server);


// APP ENVIRONMENT VARIABLES
const PRODUCTION = false;
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/node-sock-chat-db';

const db = new pg.Client(DATABASE_URL);

// SETUP VIEW ENGINE
app.set('view engine', 'jade');

// SERVE STATIC FILES
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/chats', (req, res) => {
  console.log('attempting to return chats');
  db.query('SELECT * FROM chats', (err, result) => {
    if (err) throw err

    res.send(result.rows)
  })
});

db.connect((err) => {
  if (err) throw err

  server.listen(PORT, () => {
    console.log(`DB listening on port: ${PORT}`)
  })
})



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
