(function () {
  angular.module('aboilerplate').factory('Son', Son);

  function Son() {
    return function constructor(son) {
      son = son || {};

      return {
        firstname: son.firstname,
        cpf: son.cpf || null,
        gender: son.gender || ''
      };
    }
  }
}());