'use strict';
$(document).ready(function() {


  const client_id = 'e5b95dafbd80c22b802bfa85f59e5073';
  const base = '//api.soundcloud.com/tracks?linked_partitioning=1&client_id=';
  const options = '&limit=20&offset=0&q=';

  // Concatenates the url for the search.
  const scUrl = `${base}${client_id}${options}`;



  // Loads up the soundcloud widget and listens for events.
  //////////////////////////////////////////////////
  const widget = SC.Widget(document.getElementById('soundcloud_widget'));
  


  widget.bind(SC.Widget.Events.READY, function() {
    console.log('Ready...');
  });
  

  widget.bind(SC.Widget.Events.FINISH, function() {
    changeIframeSrc();
  });
   
  //////////////////////////////////////////////////

  // Function to be called if a song is finished, or if the first song is selected.

  function changeIframeSrc() {

    const prependStreamURL = 'http://w.soundcloud.com/player/?url=';
    const test = 'https://api.soundcloud.com/tracks/31204641';
    const displayAs = '&show_artwork=true&liking=true&sharing=true&auto_play=true';

    document.getElementById('soundcloud_widget').src = `${prependStreamURL}${test}${displayAs}`;

  }



 










  $('#find').click(function() {

    const song = $('#song').val()
    
    $.get(`${scUrl}${song}`, function(data, status) {
      
      const results = data.collection;
      
      let counter = 0;

      for(let i = 0; i < results.length; i++) {
        const output = document.getElementById('output');
        console.log(results[i]);
        const li = generateLI(results[i]);
        
        output.appendChild(li);

      }

    function generateLI (result) {

      const li = document.createElement('li');
      const textNode = document.createTextNode(`${result.title}`);

      const dataId = document.createAttribute('data-id');

      let i = 0;
      dataId.value = counter++;

      li.setAttributeNode(dataId);
      li.appendChild(textNode);
      return li;
    };

    });
  });
});






// 1. Get the uri of a sound by clicking on the songname.
// 2. Load the new sound into the widget.
// 3. If user wants to add more, push uri's into an array.
// 4. On SC.Widget.Events.FINISH, load the next uri from the array into the widget.
