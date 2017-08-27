var config = require('./config.json')
var VisaAPIClient = require('./libs/visaapiclient.js');
var mockData = require('./mock_data.json')
var ApiAgillitasCartesPrPagos = require('api_agillitas_cartes_pr_pagos')
var strftime = require('strftime')

module.exports = {
  send_payment: function(clientId, amount) {
    return new Promise(function(resolve, reject) {
      var apiKey = config.visa.apiKey;
      var baseUri = 'cybersource/';
      var resourcePath = 'payments/v1/sales';
      var queryParams = 'apikey=' + apiKey;
      var visaAPIClient = new VisaAPIClient();

      var cardNumber = mockData.clients[clientId].cardNumber
      var cardExpirationMonth = mockData.clients[clientId].cardExpirationMonth
      var cardExpirationYear = mockData.clients[clientId].cardExpirationYear

      var paymentAuthorizationRequest = JSON.stringify({
        "amount": amount.toString(),
        "currency": "USD", // only works in USD!
        "payment": {
          "cardNumber": cardNumber,
          "cardExpirationMonth": cardExpirationMonth,
          "cardExpirationYear": cardExpirationYear
        }
      });

      visaAPIClient.doXPayRequest(baseUri, resourcePath, queryParams, paymentAuthorizationRequest, 'POST', {},
        function(err, responseCode) {
          transaction_msg_id = "Transaction(" + clientId + ", " + amount.toString() + ")"

          if (!err && responseCode === 201) {
            console.log(transaction_msg_id + ": Visa part OK!")

            // send amount to agilitas
            var api = new ApiAgillitasCartesPrPagos.CartoesApi()
            var agiClientId = config.agilitas.client_id
            var agiAccessToken = config.agilitas.access_token
            var clientProxyNum = mockData.clients[clientId].proxyNumber
            var saldo = ApiAgillitasCartesPrPagos.SetSaldo.constructFromObject({
              'saldo': {
                'valor': amount
              }
            })

            api.cartoesIdCartaoSaldoPut(agiClientId, agiAccessToken, clientProxyNum, saldo, function(error) {
              if (error) {
                console.log(transaction_msg_id + ": Agilitas Error: " + error)
                reject(error)
              } else {
                console.log(transaction_msg_id + ": Agilitas OK!")
                resolve()
              }
            });

          } else {
            console.log(transaction_msg_id + ": Visa Error!")
            reject(err)
          }
        });
    })
  },

  get_card_last_30_days: function(clientId) {
    return new Promise(function(resolve, reject) {
      var agiClientId = config.agilitas.client_id
      var agiAccessToken = config.agilitas.access_token
      var clientProxyNum = mockData.clients[clientId].proxyNumber

      var today = strftime('%Y-%m-%d')
      var beforeTime = new Date
      beforeTime.setDate(beforeTime.getDate() - 30)
      var _30daysbefore = strftime('%Y-%m-%d', beforeTime)


      var extratoGetCallback = new Promise(function(resolve, reject) {
        var api = new ApiAgillitasCartesPrPagos.CartoesApi()
        api.cartoesIdCartaoExtratoGet(agiClientId, agiAccessToken, mockData.clients[clientId].proxyNumber, _30daysbefore, today, function(error, data, response) {
          if (error) {
            reject(error);
          } else {
            resolve(data)
          }
        })
      });

      var saldoGetCallback = new Promise(function(resolve, reject) {
        var api = new ApiAgillitasCartesPrPagos.CartoesApi()
        api.cartoesIdCartaoSaldoGet(agiClientId, agiAccessToken, mockData.clients[clientId].proxyNumber, function(error, data, response) {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        })
      })

      Promise.all([extratoGetCallback, saldoGetCallback]).then(function(data) {
        data[0]['saldo'] = data[1].saldo.valor
        resolve(data[0])
      }).catch(function(error) {
        reject(error);
      });
    });

  }
}
