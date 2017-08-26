(function () {
  angular.module('aboilerplate').factory('Son', Son);

  function Son() {
    return function constructor(son) {
      son = son || {};

      return {
        name: son.name,
        cpf: son.cpf || null,
        gender: son.gender || ''
      };
    }
  }
}());