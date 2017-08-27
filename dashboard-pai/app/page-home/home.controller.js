angular.module('aboilerplate')
  .controller('HomeController', ['$scope', '$rootScope', 'RestService', 'FirebaseService', function HomeController($scope, $rootScope, RestService, FirebaseService) {
    var $ctrl = this;
    $ctrl.todayTasks = null;

    function init() {
      fetchData();
    }

    function fetchData() {
      $ctrl.isLoading = true;
      $ctrl.todayTasks = FirebaseService.getTasks(1, 2);
      $ctrl.todayTasks.$loaded()
        .then(() => $ctrl.isLoading = false);
    }

    init();
  }]);