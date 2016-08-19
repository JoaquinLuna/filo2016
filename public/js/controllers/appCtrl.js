'use strict';
angular.module('filo2016')
  .controller("appCtrl", function($scope, $sessionStorage, $state, firebaseService) {
    var auth = firebaseService;

    auth.$onAuthStateChanged(function(firebaseUser) {
      if (firebaseUser) {
        var user = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          photo: firebaseUser.photoURL,
          email: firebaseUser.email
        };
        $sessionStorage.userData = user;
        console.log("Auth State changed: " + angular.toJson(user, true));
        //console.log("Auth State changed.");
      }
    });
  })
