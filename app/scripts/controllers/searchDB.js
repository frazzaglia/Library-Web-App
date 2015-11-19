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

  }]);
