(function () {
  angular.module('aboilerplate').factory('SonTasks', SonTasks);

  function SonTasks() {
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