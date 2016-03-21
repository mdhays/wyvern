'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg').native;
const server = require('http').createServer(app);
const ws = require('socket.io')(server);
const port = process.env.PORT || 3000;
const POSTGRES_URL = process.env.POSTGRES_URL
  || 'postgres://localhost:5432/wyvern';

let db = new pg.Client(POSTGRES_URL);


app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));


app.use(express.static('public'));





app.get('/', (req, res) => {
  res.render('index')
});

app.post('/', (req, res) => {
  console.log(req)
  db.query(`INSERT INTO chatlog (message) VALUES ('${req.body.text}')`, (err, result) => {
    if(err) throw err
    console.log(req.body.msg);
    res.send(req.body.msg);
  });
});

app.get('/music', (req, res) => {

  res.render('music');

});

app.get('/callback', (req, res) => {

  res.render('callback');

});


db.connect((err) => {
  if (err) throw err

  pg.connect(POSTGRES_URL, (err, client) => {

    db = client;

    server.listen(port, () => {
      console.log(`wyvern running on ${port}`);
    });
  });

  ws.on('connection', socket => {
  console.log('socket connected', socket.id)

  // Whenever a user connects to the database, get all the chats.
  db.query('SELECT * FROM chatlog', (err, result) => {
    if (err) throw err;

    socket.emit('receiveChat', result.rows);
  });

  // Execute this once the client sends their message. chat becomes msg.
  socket.on('sendChat', msg => {
    console.log(msg);
    db.query(`INSERT INTO chatlog (message) VALUES ('${msg.message}')`, (err, result) => {
        if (err) throw err;
        // Broadcast emits to all but this socket.
        socket.broadcast.emit('receiveChat', [msg]);
      });
    });
  });
});



