'use strict';
/**
 * @ngdoc function
 * @name palocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the palocsApp
 */
angular.module('palocsApp')
  .controller('MainCtrl', ['$scope', '$location', '$timeout', '$routeParams', 'API', 'UserServ',
    function($scope, $location, $timeout, $routeParams, API, UserServ) {

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

      $scope.goLogin = function() {
        $location.url('/login');
      };

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

//  .controller('MainCtrl', function($scope,$position) {
//  });
