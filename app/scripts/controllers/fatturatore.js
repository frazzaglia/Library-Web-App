'use strict';
/**
 * @ngdoc function
 * @name palocsApp.controller:fatturatoreCtrl
 * @description
 * # MainCtrl
 * Controller of the palocsApp
 */
angular.module('palocsApp')
  .controller('fatturatoreCtrl', function() {
    this.qty = 1;
    this.cost = 2;
    this.inCurr = 'EUR';
    this.currencies = ['USD', 'EUR', 'CNY'];
    this.usdToForeignRates = {
      USD: 1,
      EUR: 0.74,
      CNY: 6.09
    };
    this.totale = 0;

    this.total = function total(outCurr) {
      return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
    };
    this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
      this.totale = amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
      return this.totale;
    };
    this.pay = function pay() {
      window.alert("Thanks!" + this.totale);
    };
  }).controller('SpicyController', ['$scope', function($scope) {
    $scope.spice = 'very';

    $scope.chiliSpicy = function() {
      $scope.spice = 'chili';
    };

    $scope.jalapenoSpicy = function() {
      $scope.spice = 'jalapeño';
    };
  }])
  .controller('jsonCtrl', function($scope, $http) {
    $http.get("http://www.w3schools.com/angular/customers.php")
      .success(function(response) {
        $scope.names = response.records;
      });
  });
