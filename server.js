'use strict';

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index')
})


app.listen(port, () => {
  console.log(`wyvern running on ${port}`)
})