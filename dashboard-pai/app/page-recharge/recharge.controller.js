(function () {
  angular.module('aboilerplate')
    .controller('RechargeController', RechargeController);

  RechargeController.$inject = ['RestService', 'FirebaseService'];
  function RechargeController(RestService, FirebaseService) {
    var $ctrl = this;

    $ctrl.mesada = 300;

    $ctrl.rechargeDone = false;

    $ctrl.prize = null;
    $ctrl.formatDate = formatDate;
    $ctrl.transfer = transfer;
    $ctrl.scoreToMoney = scoreToMoney;

    function init() {
      $ctrl.value = scoreToMoney(0);
      fetchData();
    }

    function fetchData() {
      $ctrl.isLoading = true;
      $ctrl.score = FirebaseService.getScore(1, 2);

      $ctrl.score.$loaded()
        .then(() => $ctrl.value = scoreToMoney($ctrl.score.score))
        .then(() => $ctrl.isLoading = false);
    }

    function setPrize(prize) {
      $ctrl.prize = prize;
    }

    function scoreToMoney(score) {
      return Math.floor(($ctrl.mesada / 1000) * score);
    }

    function transfer(value) {
      $ctrl.isLoading = true;
      RestService.addFunds(1, value)
        .then(handleSuccess)
        .catch(handleError);
    }

    function handleSuccess() {
      $ctrl.rechargeDone = true;
      $ctrl.isLoading = false;
    }

    function handleError(error) {
      console.error('Error', error);
      alert(`Desculpe, ocorreu um erro. Tente novamente mais tarde.\n\nDetalhes: ${error || 'serviço indisponível'}`)
      $ctrl.isLoading = false;
    }

    init();

    // helpers
    function formatDate(date) {
      return moment(date).format('LL');
    }

    function getTemplateTasksSummary(template) {
      var grouppedTasks = template.tasks.groups
        .map(g => g.tasks)
        .reduce((all, item) => all.concat(item), []);

      return grouppedTasks.map(t => t.title).splice(0, 5).join(', ');
    }
  }
}());