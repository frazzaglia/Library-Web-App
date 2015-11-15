'use strict';

angular.module('palocsApp.searchDbCtrlModule', [])
  .controller('SearchDbCtrl', ['$scope', '$http', 'DbServ', '$log', function($scope, $http, DbServ, $log) {
    $scope.stampa = function() {
      console.log("Chiamo il server: " + $scope.keywords);
      var promise = DbServ.getMovie();
      promise.then(
        function(success) {
          $scope.result = success.data;
        },
        function(error) {
          $log.error("Error loading author");
        });
    };

    $scope.delete = function(username) {
      if (confirm("Are you sure to delete " + username + "?")) {
        console.log("Rimuovo: " + username);
      }
    };
  }]);
