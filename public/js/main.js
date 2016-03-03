;(function () {
  'use strict';

  const ws = io.connect();

  ws.on('connection', socket => {
    console.log('socket connected');
  });

  ws.on('receiveChat', msg => {
    displayChat(msg.name, msg.text);
  });

  const form = document.querySelector('form');
  const name = document.querySelector('input[name="name"]');
  const text = document.querySelector('input[name="text"]');
  const ul = document.querySelector('ul');

  const lis = document.querySelectorAll('li');

  form.addEventListener('submit', event => {
    // ALERT IS NO USERNAME PRESENT
    if (!name.value) {
      alert('Please enter a user name!');
      return false;
    };

    // DISPLAY USER CHAT ON DOM
    displayChat(name.value, text.value);

    // EMIT EVENT TO WEBSOCKET
    ws.emit('sendChat', {
      name: name.value,
      text: text.value
    });

    // RESET MESSAGE INPUT VALUE
    text.value = '';

    // SET FOCUS TO MESSAGE FIELD
    text.focus();

    // PREVENT DEFAULT FORM SUBMISSION
    event.preventDefault();
  });

  // DISPLAY CHAT ON DOM
  function displayChat(name, text) {
    const li = generateLI(name, text);

    ul.appendChild(li);
  };

  // CREATE LI DOM ELEMENT WITH FORM INPUTS
  function generateLI( name, text) {
    const li = document.createElement('li');
    const textNode = document.createTextNode(`@${name}: ${text}`);

    li.appendChild(textNode);
    return li;
  };

}());
