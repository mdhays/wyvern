'use strict';
$(document).ready(function() {

const client_id = '';
const base = '//api.soundcloud.com/tracks?linked_partitioning=1&client_id=';
const options = '&limit=20&offset=0&q=';

const scUrl = `${base}${client_id}${options}`;



  $('#find').click(function() {

    const song = $('#song').val()
    console.log('running', song);
    $.get(`${scUrl}${song}`, function(data, status) {
      const results = data.collection;
      
      
      for(let i = 0; i < results.length; i++) {
        const output = document.getElementById('output');
        console.log(results[i]);
        const li = generateLI(results[i]);
        
        output.appendChild(li);

      }

    function generateLI (result) {
      const li = document.createElement('li');
      const textNode = document.createTextNode(`${result.title}`);

      li.appendChild(textNode);
      console.log(li);
      return li;
    };

    });
  });
});


// Work on getting a response from the api to the dom.