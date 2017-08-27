const express = require('express')
const process = require('process')
const config = require('./config.json')
const model = require('./model.js')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT ? process.env.PORT : 1234

app.options('*', cors())

app.put('/addFunds', cors(), (req, res) => {
  var clientId = req.query.clientId
  var amount = parseFloat(req.query.amount)

  model.send_payment(clientId, amount).then(function() {
    res.json({
      "success": true
    });
  }).catch(function(err) {
    res.status(400).json({ //bad request
      "error": err ? err.message : null
    })
  })
})


app.get('/getStatement', cors(), (req, res) => {
  var clientId = req.query.clientId
  model.get_card_last_30_days(clientId).then(function(data) {
    res.json(data)
  }).catch(function(err) {
    res.status(400).json({ //bad request
      "error": err ? err.message : null
    })
  })
})


app.listen(PORT)
