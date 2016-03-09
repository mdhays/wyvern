'use strict';

const express = require('express')
const app = express()
const path = require('path')
const pg = require('pg').native
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const POSTGRES_URL = process.env.POSTGRES_URL
  || 'postgres://localhost:5432/wyvern'

let db


app.set('view engine', 'jade')


app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}))


app.use(express.static('public'))





app.get('/', (req, res) => {
  res.render('index')
})


app.get('/songs', (req, res) => {
  db.query('SELECT * FROM songs', (err, result) => {
    if(err) throw err

    res.send(result.rows)
  })
})



pg.connect(POSTGRES_URL, (err, client) => {

  db = client

  server.listen(port, () => {
    console.log(`wyvern running on ${port}`)
  })
})


