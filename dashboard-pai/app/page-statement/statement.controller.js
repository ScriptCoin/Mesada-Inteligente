(function () {
  angular.module('aboilerplate')
    .controller('StatementController', StatementController);

  StatementController.$inject = ['RestService', 'StatementItem'];
  function StatementController(RestService, StatementItem) {
    var $ctrl = this;

    $ctrl.statementData = null;
    $ctrl.formatDate = formatDate;

    function init() {
      fetchData();
    }

    function fetchData() {
      RestService.getStatement(1)
        .then(setStatementData)
        .catch(handleError);
    }

    function handleError(error) {
      console.error('Error', error);
      var message = error && error.data ? error.data.error.message : 'serviço indisponível';
      fetchData(); // tenta de novo
      // alert(`Desculpe, ocorreu um erro. Tente novamente mais tarde.\n\nDetalhes: ${message}`);
    }

    function setStatementData(statementData) {
      $ctrl.statementData = statementData;
    }

    init();

    // helpers
    function formatDate(date) {
      return moment(date).format('DD/mm/YY HH:mm:ss');
    }

    function getTemplateTasksSummary(template) {
      var grouppedTasks = template.tasks.groups
        .map(g => g.tasks)
        .reduce((all, item) => all.concat(item), []);

      return grouppedTasks.map(t => t.title).splice(0, 5).join(', ');
    }
  }
}());