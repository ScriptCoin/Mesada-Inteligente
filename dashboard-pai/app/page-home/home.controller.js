angular.module('aboilerplate')
  .controller('HomeController', ['$scope', '$rootScope', 'RestService', function HomeController($scope, $rootScope, RestService) {
    var $ctrl = this;
    $ctrl.todayTasks = null;

    function init() {
      fetchData();
    }

    function fetchData() {
      RestService.getTasks(2).then(tasks => {
          setTasks(tasks);
      });
    }
    function setTasks(tasks) {
      $ctrl.todayTasks = tasks;
    }

    init();
  }]);