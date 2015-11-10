'use strict';

/* Controllers */

angular.module('palocsApp.loginCtrlModule', [])
  .controller('LoginCtrl', ['$scope', '$routeParams', '$location', 'UserServ', function($scope, $routeParams, $location, UserServ) {

    function init() {
      $scope.user = '';
      $scope.password = '';
      $scope.loginSuccess = false;
      $scope.numberOfAttempts = 0;
      $scope.userData = UserServ.userData;
    }
    init();

    $scope.logout = function() {
      UserServ.logout();
      init();
      $location.url('/login');
    };

    $scope.isConnected = function() {
      return UserServ.isConnected();
    };

    $scope.login = function() {
      var promise = UserServ.login($scope.user, $scope.password);

      promise.then(function(response) {
        $scope.loginSuccess = true;
        $scope.numberOfAttempts = 0;
        $scope.userData = UserServ.userData;
        console.log("I dati dell'utente: " + $scope.user);
      }, function(error) {
        console.log("Errore login: " + error);
        $scope.loginSuccess = false;
        $scope.numberOfAttempts++;
      });
    };

    $scope.goHome = function() {
      $location.url('/dashboard/home');
    };

  }]);
