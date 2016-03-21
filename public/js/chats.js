'use strict';

$(document).ready(function() {


  const ul = document.querySelector('ul');
  const username = $('#name');
  const text = $('#msg');


  const ws = io.connect();


  ws.on('connect', (socket) => {
    console.log('socket connected')
  });

  ws.on('receiveChat', (msgs) => {
    msgs.forEach(displayChat)
  });

  function displayChat (chat) {
  
    const li = generateLI(chat)

    ul.appendChild(li)
}


  function generateLI (chat) {
    const li = document.createElement('li');
    const textNode = document.createTextNode(`${chat.username}: ${chat.message}`);
    console.log(chat);
    const dataId = document.createAttribute('data-id');

    dataId.value = chat._id;

    li.setAttributeNode(dataId);
    li.appendChild(textNode);

    return li;
  };


  // jquery click function to be run on each.
  $('#send').click(function() {

    
    const chat = {
      username: username.val(),
      message: text.val()
    };

    // Send the chat object to the server.
    ws.emit('sendChat', chat)
    displayChat(chat)
    });  
  });
