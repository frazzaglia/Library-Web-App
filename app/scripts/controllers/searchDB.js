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
      promise = DbServ.getLoans(crSession.get('idUtente'));
      promise.then(
        function(success) {
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

    $scope.deleteBook = function(id, title) {
      if (confirm("Are you sure to delete \"" + title + "\"?")) {
        var promise;
        promise = DbServ.deleteBook(id);
        promise.then(
          function(success) {
            $scope.searchAllBooks();
          },
          function(error) {
            $log.error("Error deleting book");
          });
      }
    };

    $scope.renew = function(bookTitle, bookId, counter, maxRenewals) {
      if (confirm("Are you sure to renew " + bookTitle + "?")) {
      }
      if (maxRenewals > counter) {
        var promise;
        promise = DbServ.renew(bookId, crSession.get('idUtente'));
        promise.then(
          function(success) {
            if (success.data > 0) {
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
      promise = DbServ.getMyInfo(crSession.get('idUtente'));
      promise.then(
        function(success) {
          $rootScope.myInfoResult = success.data;
        },
        function(error) {
          $log.error("Error loading loans");
        });

    };

    $scope.searchAllBooks = function() {
      var promise;
      promise = DbServ.getAllBooks();
      promise.then(
        function(success) {
          $rootScope.allBooks = success.data;
        },
        function(error) {
          $log.error("Error loading loans");
        });
    };

    $scope.addBook = function() {
      var promise;
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
          $scope.searchAllBooks();
        },
        function(error) {
          $log.error("Error loading loans");
        });
    };
  }]);
