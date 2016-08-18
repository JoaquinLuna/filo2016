'use strict';
angular.module('filo2016')
  .controller("filo2016Ctrl", function($scope, $sessionStorage) {
    $scope.user = $sessionStorage.userData;
    console.log($scope.user);
  })
