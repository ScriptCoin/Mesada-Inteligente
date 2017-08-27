(function () {
  angular.module('aboilerplate')
    .controller('RechargeController', RechargeController);

  RechargeController.$inject = ['RestService'];
  function RechargeController(RestService) {
    var $ctrl = this;

    $ctrl.mesada = 300;
    $ctrl.score = 819;

    $ctrl.prize = null;
    $ctrl.formatDate = formatDate;
    $ctrl.transfer = transfer;
    $ctrl.scoreToMoney = scoreToMoney;

    function init() {
      $ctrl.value = scoreToMoney($ctrl.score);
    }

    function fetchData() {
    }

    function setPrize(prize) {
      $ctrl.prize = prize;
    }

    function scoreToMoney(score) {
      return ($ctrl.mesada / 1000) * score;
    }

    function transfer(value) {
      RestService.addFunds(1, value)
        .then(console.log);
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