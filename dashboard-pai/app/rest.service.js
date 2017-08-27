(function () {
  angular.module('aboilerplate').factory('RestService', RestService);

  var baseUrl = 'http://aqueous-taiga-69422.herokuapp.com'; // getStatement?clientId=1

  RestService.$inject = ['$http', '$q', 'Son', 'StatementItem'];
  function RestService($http, $q, Son, StatementItem) {
    function getSons() {
      return $http.get('/json-models/user.model.json')
        .then(extractData)
        .then(user => user.dependents.map(Son));
    }

    function getTasks(userId) {
      return $http.get('/json-models/tasks.model.json').then(extractData)
    }

    function getTemplates() {
      return $http.get('/json-models/templates.model.json').then(extractData);
    }

    function getPrize(userId) {
      return $http.get('/json-models/prize.model.json').then(extractData);
    }

    function extractData(response) {
      return response.data;
    }

    function addFunds(parentId, funds) {
      return $http.put(`${baseUrl}/addFunds?clientId=${parentId}&amount=${funds}`)
        .then(extractData);
    }

    function getStatement(parentId) {
      return $http.get(`${baseUrl}/getStatement?clientId=${parentId}`)
        .then(extractData)
        .then(data => {
          data.extrato = (data.extrato || []).map(i => StatementItem(i));
          return data;
        });
    }

    return { getSons, getTemplates, getTasks, getPrize, addFunds, getStatement };
  }
}())