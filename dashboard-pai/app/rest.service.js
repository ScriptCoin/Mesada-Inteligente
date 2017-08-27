(function () {
  angular.module('aboilerplate').factory('RestService', RestService);

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

    function extractData(response) {
      return response.data;
    }

    return { getSons, getTemplates, getTasks };
  }
}())