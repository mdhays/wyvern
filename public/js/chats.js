$(document).ready(function() {

  'use strict';

  // jquery click function to be run on each.
  $('#send').click(function() {

        
        const ul = document.querySelector('ul');
        const username = $('#name');
        const text = $('#msg');
        
        

        const chat = {
          username: username.val(),
          text: text.val()
        };
        

        function displayChat (chat) {
          
            const li = generateLI(chat)

            ul.appendChild(li)
        }

        displayChat(chat)

        function generateLI (chat) {
          const li = document.createElement('li')
          const textNode = document.createTextNode(`${chat.username}: ${chat.text}`)
          console.log(chat.username);
          const dataId = document.createAttribute('data-id')

          dataId.value = chat._id

          li.setAttributeNode(dataId)
          li.appendChild(textNode)

          return li
        }


        
        $.ajax({
          type: 'POST',
          url: '/',
          data: chat,
          success: 'success',
          dataType: 'json'
        });

  });


});