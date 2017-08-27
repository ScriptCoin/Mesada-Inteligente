angular.module('aboilerplate')
  .controller('ShellController', ['$scope', '$route', '$location', function AdminController($scope, $route, $location) {
    const $ctrl = this;

    $ctrl.location = location;
    $ctrl.navigate = navigate;

    function location(page) {
      return $route.current && $route.current.$$route.name === page;
    }

    function navigate(page) {
      switch (page) {
        case 'home':
          $location.path('/');
          break;
        case 'admin':
          $location.path('/admin');
          break;
      }
    }
  }]);