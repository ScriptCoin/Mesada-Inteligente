(function () {
  angular.module('aboilerplate').factory('StatementItem', StatementItem);

  function StatementItem() {
    return function constructor(statementItem) {
      statementItem = statementItem || {};

      return {
        date: statementItem.dataHora,
        transaction: statementItem.estabelecimento || null,
        value: statementItem.tipo === "CARGA" ? statementItem.valor : -statementItem.valor
      };
    }
  }
}());