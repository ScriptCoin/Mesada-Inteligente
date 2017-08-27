(function () {
  angular.module('aboilerplate')
    .controller('StatementController', StatementController);

  StatementController.$inject = ['RestService'];
  function StatementController(RestService) {
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
      alert(`Desculpe, ocorreu um erro. Tente novamente mais tarde.\n\nDetalhes: ${error || 'serviço indisponível'}`)
    }

    function setStatementData(statementData) {
      $ctrl.statementData = statementData;
    }

    init();

    // helpers
    function formatDate(date) {
      return moment(date).format('L');
    }

    function getTemplateTasksSummary(template) {
      var grouppedTasks = template.tasks.groups
        .map(g => g.tasks)
        .reduce((all, item) => all.concat(item), []);

      return grouppedTasks.map(t => t.title).splice(0, 5).join(', ');
    }
  }
}());