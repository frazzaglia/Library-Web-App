'use strict';

angular.module('palocsApp.searchServModule', [])
  .factory('DbServ', ['$http', function($http) {
    // Create the http post request
    // The request is a JSON request.
    return {
      getMovie: function(id) {
        console.log(id);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/search4.php',
          data: {
            p1: id,
            p2: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getAuthors: function(id) {
        console.log(id);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getBooksByAuthor.php',
          data: {
            p1: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getBooks: function(title) {
        console.log("Il servizio cerca il libro: " + title);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getBooksByTitle.php',
          data: {
            p1: title
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getLoans: function(id) {
        console.log("Cerco i prestiti per l'utente con id: " + id);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getLoans.php',
          data: {
            p1: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
    };
  }]);