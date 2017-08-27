(function () {
  angular.module('aboilerplate', ['ngMaterial', 'ngRoute', 'ng-fusioncharts', 'firebase'])
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
        .when('/atividades', {
          name: 'activities',
          templateUrl: 'app/page-tasks/tasks.html',
          controller: 'TasksController',
          controllerAs: '$ctrl'
        })
        .when('/premiacao', {
          name: 'prize',
          templateUrl: 'app/page-prize/prize.html',
          controller: 'PrizeController',
          controllerAs: '$ctrl'
        })
        .when('/recarga', {
          name: 'recharge',
          templateUrl: 'app/page-recharge/recharge.html',
          controller: 'RechargeController',
          controllerAs: '$ctrl'
        })
        .when('/not-done', {
          name: 'not-done',
          templateUrl: 'app/under-construction/under-construction.html',
          controller: 'UnderConstructionController'
        })
        .otherwise({ redirectTo: '/' });

      // configure html5 to get links working on jsfiddle
      $locationProvider.html5Mode(false);
    })
    .config(configureTheme)
    .config(configureFirebase);

  configureTheme.$inject = ['$mdThemingProvider'];
  function configureTheme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  }

  function configureFirebase() {
    // Initialize Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyC93XS4v13wBVcwTdF8Y06wkwTKlxTRv7A",
      authDomain: "mesadainteligente.firebaseapp.com",
      databaseURL: "https://mesadainteligente.firebaseio.com",
      projectId: "mesadainteligente",
      storageBucket: "mesadainteligente.appspot.com",
      messagingSenderId: "84646453780"
    };
    firebase.initializeApp(firebaseConfig);
  }
}());