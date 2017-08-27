(function () {
  angular.module('aboilerplate').factory('RestService', RestService);

  var baseUrl = 'http://aqueous-taiga-69422.herokuapp.com'; // getStatement?clientId=1

  RestService.$inject = ['$http', '$q', 'Son'];
  function RestService($http, $q, Son) {
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
      return $http.put(`${baseUrl}/getStatement?clientId=${parentId}`)
        .then(extractData);
    }

    return { getSons, getTemplates, getTasks, getPrize, addFunds };
  }
}())