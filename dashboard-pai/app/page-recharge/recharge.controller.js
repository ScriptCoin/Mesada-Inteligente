(function () {
  angular.module('aboilerplate')
    .controller('RechargeController', RechargeController);

  RechargeController.$inject = ['RestService'];
  function RechargeController(RestService) {
    var $ctrl = this;

    $ctrl.prize = null;
    $ctrl.formatDate = formatDate;

    function init() {
      fetchData();
    }

    function fetchData() {
      RestService.getPrize(2).then(setPrize);
    }

    function setPrize(prize) {
      $ctrl.prize = prize;
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