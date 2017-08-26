const express = require('express')
const config = require('./config.json')
const model = require('./model.js')
const app = express()
const PORT = 1234

app.put('/addFunds', (req, res) => {
  var clientId = req.query.clientId
  var amount = parseFloat(req.query.amount)

  data_obj = {
    "clientId": clientId,
    "amount": amount
  }

  model.send_payment(clientId, amount).then(function() {
    res.json({
      "data": data_obj,
      "success": null
    });
  }).catch(function(err) {
    res.status(400).json({ //bad request
      "data": data_obj,
      "error": err ? err.message : null
    })
  })
})


app.listen(PORT)
