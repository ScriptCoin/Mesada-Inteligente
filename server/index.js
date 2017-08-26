const express = require('express')
const config = require('./config.json')
const model = require('./model.js')
const app = express()
const PORT = 1234

/**
 * API
 *
 * 
 *
 */

app.put('/addFunds', (req, res) => {
  var clientId = req.query.client_id
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
    res.status(404).json({ //not found
      "data": data_obj,
      "error": err ? err.message : null
    })
  })
})


app.listen(PORT)
