'use strict';

angular.module('palocsApp.searchDbCtrlModule', [])
  .controller('SearchDbCtrl', ['$scope', '$rootScope', 'crSession', '$http', 'DbServ', '$log', function($scope, $rootScope, crSession, $http, DbServ, $log) {
    $scope.search = function() {
      if ($scope.title != undefined) {
        var promise;
        if ($scope.searchType == "Author") {
          promise = DbServ.getAuthors($scope.title);
        } else {
          promise = DbServ.getBooks($scope.title);
        }
        promise.then(
          function(success) {
            console.log(success.data);
            $scope.result = success.data;
          },
          function(error) {
            $log.error("Error loading author");
          });
      } else {
        window.alert("Insert title or name");
      }
    };

    $scope.searchLoans = function() {
      var promise;
      console.log("Cerco i prestiti per l'utente: " + crSession.get('idUtente'))
      promise = DbServ.getLoans(crSession.get('idUtente'));
      promise.then(
        function(success) {
          console.log("DATI: ");
          console.log(success.data);
          $rootScope.resultLoans = success.data;
        },
        function(error) {
          $log.error("Error loading loans");
        });

    };

    $scope.delete = function(username) {
      if (confirm("Are you sure to delete " + username + "?")) {
        console.log("Rimuovo: " + username);
      }
    };

    $scope.renew = function(bookTitle, bookId, counter, maxRenewals) {
      if (confirm("Are you sure to renew " + bookTitle + "?")) {
        console.log("Rinnovo per l'utente: " + crSession.get('idUtente') + " il libro con id: " + bookId);
      }
      if (maxRenewals > counter) {
        var promise;
        promise = DbServ.renew(bookId, crSession.get('idUtente'));
        promise.then(
          function(success) {
            console.log("RINNOVATO");
            console.log(success.data);
            if (success.data > 0) {
              console.log("Posso rinnovare");
              $scope.searchLoans();
            }
          },
          function(error) {
            $log.error("Error renewing");
          });
      } else {
        window.alert("Can not renew");
      }
    };

    $scope.searchMyInfo = function() {
      var promise;
      console.log("Cerco le info per l'utente: " + crSession.get('idUtente'))
      promise = DbServ.getMyInfo(crSession.get('idUtente'));
      promise.then(
        function(success) {
          console.log("INFO: ");
          console.log(success.data);
          $rootScope.myInfoResult = success.data;
        },
        function(error) {
          $log.error("Error loading loans");
        });

    };

    $scope.searchAllBooks = function() {
      var promise;
      console.log("Cerco tutti i libri");
      promise = DbServ.getAllBooks();
      promise.then(
        function(success) {
          console.log("LIBRI: ");
          console.log(success.data);
          $rootScope.allBooks = success.data;
        },
        function(error) {
          $log.error("Error loading loans");
        });
    };

    $scope.addBook = function() {
      var promise;
      console.log("AGGIUNGO un libro");
      var args = [
        $scope.ISBN, $scope.title, $scope.publisherId,
          $scope.publicationDate, $scope.description,
          $scope.language, $scope.place, $scope.numCopies
      ];
      for (var i = 0; i < args.length; i++) {
        if (args[i] === undefined || args[i] === null) {
          window.alert("Insert all fields, please" + args[i]);
          return;
        }
      }
      var obj = new Object();
      obj.isbn = $scope.ISBN;
      obj.title = $scope.title;
      obj.publisherId = $scope.publisherId;
      obj.publicationDate = $scope.publicationDate;
      obj.description = $scope.description;
      obj.language = $scope.language;
      obj.place = $scope.place;
      obj.numCopies = $scope.numCopies;
      //var param = JSON.stringify(args);
      promise = DbServ.insertBook(obj);
      promise.then(
        function(success) {
          console.log("Ho inserito tutti i campi");
          console.log(success.data);
          $scope.searchAllBooks();
        },
        function(error) {
          $log.error("Error loading loans");
        });
    };
  }]);
