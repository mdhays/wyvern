'use strict';
$(document).ready(function() {


  SC.initialize({
    client_id: '',
    redirect_uri: 'http://localhost:3000/callback'
  });
    
   // initiate auth popup
  SC.connect().then(function() {
    return SC.get('/me');
  }).then(function(me) {
    alert('Hello, ' + me.username);
    console.log(me);
  });


});


// Work on getting a response from the api to the dom.