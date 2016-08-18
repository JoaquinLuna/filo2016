'use strict';
angular.module('filo2016')
  .factory("authService", ["$firebaseAuth",

    function($firebaseAuth) {
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAaUCAKb1Mly8n5jXzToGBNUJknc4DB_Jw",
        authDomain: "filo2016-dd70d.firebaseapp.com",
        databaseURL: "https://filo2016-dd70d.firebaseio.com",
        storageBucket: "filo2016-dd70d.appspot.com",
      };
      firebase.initializeApp(config);
      return $firebaseAuth();
    }
  ]);
