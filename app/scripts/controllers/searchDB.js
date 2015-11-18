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
      promise = DbServ.getLoans(crSession.get('idUtente'));
      promise.then(
        function(success) {
          console.log("TROVATI");
          console.log(success.data[0].user_id);
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
      console.log("counter: "+counter);
      console.log("max: "+maxRenewals);
      if (maxRenewals > counter){
        console.log("Posso rinnovare");

      }
      else{
        window.alert("Can not renew");
      }
    };
  }]);
