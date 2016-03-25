'use strict';
$(document).ready(function() {


  const client_id = 'e5b95dafbd80c22b802bfa85f59e5073';
  const base = '//api.soundcloud.com/tracks?linked_partitioning=1&client_id=';
  const options = '&limit=20&offset=0&q=';
  let songURI;


  // Concatenates the url for the search.
  const scUrl = `${base}${client_id}${options}`;



  // Loads up the soundcloud widget and listens for events.
  ////////////////////////////////////////////////
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

    const prependStreamURL = '//w.soundcloud.com/player/?url=';
    const displayAs = '&show_artwork=true&liking=true&sharing=true&auto_play=true';

    document.getElementById('soundcloud_widget').src = `${prependStreamURL}${songURI}${displayAs}`;

  }



  $('#output').click(function() {
    $('.song').click(function() {
      songURI = this.id;
      console.log(songURI);
      changeIframeSrc(songURI);
    });
  });





  $('#find').click(function() {

    const song = $('#song').val()
    
      $.get(`${scUrl}${song}`, function(data, status) {
      
        const results = data.collection;
        
        let counter = 0;

        for(let i = 0; i < results.length; i++) {
          
          const output = document.getElementById('output');
          console.log(results[i], "looping through data array");
          
          let uri = getURI(results[i]);
          console.log(uri);
          const button = generateButton(results[i]);
          

          output.appendChild(button);

        }


      function getURI(song) {
        let uri = song.uri;
        return uri;
      }


      function generateButton (result) {

        const button = document.createElement('button');
        const textNode = document.createTextNode(`${result.title}`);
        const Class = document.createAttribute('class');
        const id = document.createAttribute('id');


        
        id.value = result.uri;
        Class.value = 'song';
        button.setAttributeNode(id);
        button.setAttributeNode(Class);
        button.appendChild(textNode);
        return button;
      };

    });

  });

});
  
// 1. Get the uris and push them into a table.
