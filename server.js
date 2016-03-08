'use strict';

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hello')
})


app.listen(port, () => {
  console.log(`wyvern running on ${port}`)
})