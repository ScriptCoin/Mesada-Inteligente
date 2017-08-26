angular.module('aboilerplate', ['ngRoute', 'ng-fusioncharts'])
  .constant('API_BASE_URL', 'https://hidden-fjord-70987.herokuapp.com/')
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        name: 'home',
        templateUrl: 'app/page-home/home.html',
        controller: 'HomeController'
      })
      .when('/login', {
        name: 'login',
        templateUrl: 'app/page-login/login.html',
        controller: 'LoginController'
      })
      .when('/register', {
        name: 'register',
        templateUrl: 'app/page-register/register.html',
        controller: 'RegisterController'
      })
      .when('/not-done', {
        name: 'not-done',
        templateUrl: 'app/under-construction/under-construction.html',
        controller: 'UnderConstructionController'
      })
      .otherwise({ redirectTo: '/' });

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(false);
  });