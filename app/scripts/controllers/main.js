'use strict';
/**
 * @ngdoc function
 * @name palocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the palocsApp
 */
angular.module('palocsApp')
  .controller('MainCtrl', ['$scope', '$location', '$log', 'API', 'UserServ', 'DbServ',
    function($scope, $location, $log, API, UserServ, DbServ) {

      $scope.results = [];
      $scope.userData = UserServ.userData;
      $scope.search = function(searchKey) {
        API.getNews(searchKey).then(function(response) {
          $scope.results = response.data;
        });
      };

      $scope.erase = function() {
        $scope.results = [];
        $scope.searchKey = "";
      };

      $scope.isConnected = function() {
        return UserServ.isConnected();
      };

      $scope.isStudentOrTeacher = function() {
        return UserServ.isStudentOrTeacher();
      };

      $scope.goLogin = function() {
        $location.url('/login');
      };

      function searchNumberLoans() {
        var promise;
        promise = DbServ.getNumberLoans();
        promise.then(
          function(success) {
            $scope.loans = success.data;
          },
          function(error) {
            $log.error("Error loading loans");
          });
      };
      searchNumberLoans();

      function searchNumberBooks() {
        var promise;
        promise = DbServ.getNumberBooks();
        promise.then(
          function(success) {
            $scope.books = success.data;
          },
          function(error) {
            $log.error("Error loading loans");
          });
      };
      searchNumberBooks();


      function searchNumberUsers() {
        var promise;
        promise = DbServ.getNumberUsers();
        promise.then(
          function(success) {
            $scope.users = success.data;
          },
          function(error) {
            $log.error("Error loading loans");
          });
      };
      searchNumberUsers();


      $scope.line = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
        series: ['Loans', 'Total Book'],
        data: [
          [65, 59, 80, 81, 56, 55, 40],
          [40, 50, 60, 70, 56]
        ]
      };

      $scope.bar = {
        labels: ['2010', '2011', '2012'],
        series: ['Series A', 'Series B'],

        data: [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ]

      };

      $scope.donut = {
        labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
        data: [300, 500, 100]
      };
    }
  ]);
