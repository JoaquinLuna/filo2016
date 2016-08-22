'use strict';
angular.module('filo2016')
  .controller("homeCtrl", function($scope, $firebaseObject, $sessionStorage, dataService) {
    var ref = firebase.database().ref().child("data").child("preguntas");
    var obj = $firebaseObject(ref);
    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    syncObject.$loaded().then(function() {
      console.log("Data loaded");

      $("#loading").addClass("animated fadeOut")
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {});;

      $("#data").addClass("animated bounceIn");
    }).catch(function(error) {
      console.error("Error:", error);
    });
    syncObject.$bindTo($scope, "preguntas");


    $scope.sendResp = function(rsp) {
      $("#loading").addClass("animated fadeIn")
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {});;

      $("#data").addClass("animated bounceOut");

      dataService.sendResp($sessionStorage.userData.uid, '00001', rsp).then(function() {
        console.log("correcto!");
      });
    }
  })
