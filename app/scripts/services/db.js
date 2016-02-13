'use strict';

angular.module('palocsApp.searchServModule', [])
  .factory('DbServ', ['$http', function($http) {
    // Create the http post request
    // The request is a JSON request.
    return {
      getAuthors: function(id) {
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
      },

      getDelay: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getDelay.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getActiveLoans: function(id) {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getActiveLoans.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      renew: function(bookId, userId) {
        console.log("Rinnovo il libro: " + bookId + " per l'utente: " + userId);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/renew.php',
          data: {
            p1: bookId,
            p2: userId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      deliveryLoans: function(bookId, userId, startDate) {
        console.log("Restituisco il libro: " + bookId + " per l'utente: " + userId + " con data: " + startDate);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/deliveryLoans.php',
          data: {
            p1: bookId,
            p2: userId,
            p3: startDate
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      deliveryDelay: function(bookId, userId, startDate) {
        console.log("Restituisco il libro delay: " + bookId + " per l'utente: " + userId + " con data: " + startDate);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/deliveryDelay.php',
          data: {
            p1: bookId,
            p2: userId,
            p3: startDate
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getMyInfo: function(userId) {
        console.log("Ottengo le info per l'utente: " + userId);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getMyInfo.php',
          data: {
            p1: userId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getAllBooks: function(userId) {
        console.log("Ottengo le info per l'utente: " + userId);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getAllBooks.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      insertBook: function(parameter) {
        console.log("Inserisco nel db il libro: ");
        console.log(parameter);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/insertBook.php',
          data: parameter,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      deleteBook: function(id) {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/deleteBook.php',
          data: {
            p1: id
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      reserveBook: function(bookId, userId) {
        console.log("PRENOTO il libro con id: " + bookId + " per l'utente: " + userId);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/reserveBook.php',
          data: {
            p1: bookId,
            p2: userId
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      insertAuthor: function(autore, idLibro) {
        console.log("Inserisco l'autore: " + autore);
        var lastName, firstName;
        lastName = autore.substr(0,autore.indexOf(' '));
        firstName = autore.substr(autore.indexOf(' ')+1);
        console.log("LN: " + lastName + " FN: " + firstName);
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/insertAuthor.php',
          data: {
            p1: lastName,
            p2: firstName,
            p3: idLibro
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      /** Funzioni per la dashboard e i grafici **/
      getNumberLoans: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberLoans.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getNumberActiveLoans: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberActiveLoans.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getNumberDelayLoans: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberDelayLoans.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getNumberBooks: function() {
        console.log("Cerco il numero di libri");
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberBooks.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },

      getNumberUsers: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberUsers.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      },


      getNumberLoansIn2Year: function() {
        return $http({
          method: 'POST',
          url: 'http://localhost:80/palocs/getNumberLoansIn2Year.php',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
      }
    };
  }]);
