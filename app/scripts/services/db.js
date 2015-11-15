'use strict';

angular.module('palocsApp.searchServModule', [])
  .factory('DbServ', ['$http', function($http) {
    // Create the http post request
    // The request is a JSON request.
    return {
      getMovie: function(id) {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/search4.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
    };
  }]);
