'use strict';
/**
 * @ngdoc function
 * @name palocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the palocsApp
 */
angular.module('palocsApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$timeout', '$location', '$log', 'API', 'UserServ', 'DbServ',
    function($scope, $rootScope, $timeout, $location, $log, API, UserServ, DbServ) {

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
            $rootScope.loans = success.data;
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
            $rootScope.books = success.data;
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
            console.log("il numero di utenti è: " + success.data);
            $rootScope.users = success.data;
          },
          function(error) {
            $log.error("Error loading loans");
          });
      };
      searchNumberUsers();


      $scope.line = {
        labels: ['July', 'August', 'September', 'October', 'November', 'December', 'January'],
        series: ['Loans', 'Total Users'],
        data: [
          [65, 59, 80, 81, 56, 55, 40],
          [40, 50, 60, 70, 56]
        ]
      };



      function doughnut() {
        $timeout(function() {
          var d = new Object();
          d.labels = ["Loans", "Users", "Books"];
          var promise;
          d.values = [$rootScope.loans, $rootScope.users, $rootScope.books];
          $scope.dataDoughnut = d.values;
          $scope.labelsDoughnut = d.labels;
        }, 1000);
      };
      doughnut();



      function bar() {
        var d = new Object();
        d.labelsBar = ["2014", "2015"];
        d.seriesBar = ["Loans"];
        var promiseLoans;
        promiseLoans = DbServ.getNumberLoansIn2Year();
        promiseLoans.then(
          function(success) {
            console.log("il numero di loan in 2 anni è: " + success.data);
            $scope.labelsBar = d.labelsBar;
            $scope.seriesBar = d.seriesBar;
            $scope.dataBar = [
              [success.data[0], success.data[1]]
            ];
          },
          function(error) {
            $log.error("Error loading loans");
          }
        );
      };
      bar();

      /*  $scope.donut = {
          labels: ["Loans", "Users", "Books"],
          data: [1800, 500, 100]
        };

        $scope.bar = {
          labels: ['2014', '2015'],
          series: ['Loans', 'Books'],

          data: [
            [65, 59],
            [28, 48]
          ]

        };
        */
    }
  ]);
