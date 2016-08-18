// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('filo2016', ['ionic', 'firebase', 'ngStorage'])

.run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      console.log("Error de autenticación. Retornando al login..");
      $state.go("app.login");
    }
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      controller: 'appCtrl',
      templateUrl: 'templates/viewport.html'
    })
    .state('app.filo2016', {
      url: '/filo',
      abstract: true,
      views: {
        'viewport': {
          templateUrl: 'templates/menu.html',
          controller: 'filo2016Ctrl'
        }
      },
      resolve: {
        auth: function($q, authService) {
          var deferred = $q.defer();
          var auth = authService;
          auth.$requireSignIn().then(function(result) {
            deferred.resolve(result);
          }).catch(function(err) {
            deferred.reject(err);
          });
          return deferred.promise;
        }
      }
    })
    .state('app.filo2016.home', {
      url: '/home',
      views: {
        'content': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'viewport': {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
