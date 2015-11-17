'use strict';
/*
angular.module('palocsApp.searchDbCtrlModule', [])
  .controller('SearchDbCtrl', ['$scope', '$http', 'DbServ', '$log', function($scope, $http, DbServ, $log) {
    $scope.search = function() {
      var param = [];
      param["last_name"] = "pippoN";
      param["first_name"] = "pippoC";
      console.log("Chiamo il server: " + $scope.keywords);
      var promise = DbServ.getMovie("pippoN");
      promise.then(
        function(success) {
          console.log(success.data);
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
  */
