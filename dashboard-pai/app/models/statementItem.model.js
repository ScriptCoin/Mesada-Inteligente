(function () {
  angular.module('aboilerplate').factory('StatementItem', StatementItem);

  function StatementItem() {
    const DATE_FORMAT = 'DD/mm/YY HH:mm:ss';
    return function constructor(statementItem) {
      statementItem = statementItem || {};

      return {
        date: moment(statementItem.dataHora, DATE_FORMAT),
        transaction: statementItem.estabelecimento || null,
        value: statementItem.tipo === "CARGA" ? statementItem.valor : -statementItem.valor
      };
    }
  }
}());