(function() {
  'use strict';

  angular
    .module('dataService', []);
  angular
    .module('dataService')
    .factory('dataService', dataService);

  function dataService($q, $http, $httpParamSerializer) {

    var dataService = {
      sendResp: sendResp
    }

    return dataService;

    function sendResp(usr, qs, rsp) {
      var deferred = $q.defer();
      // use $.param jQuery function to serialize data from JSON
      var data = {
        user: usr,
        q: qs,
        r: rsp
      };

      var config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      $http.post('http://filo2016.mybluemix.net/sendresp', data, config).then(function(result) {
        deferred.resolve(result.data);
        console.log(result);
      }).catch(function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  }
})();
