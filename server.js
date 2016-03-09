'use strict';

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

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


app.listen(port, () => {
  console.log(`wyvern running on ${port}`)
})