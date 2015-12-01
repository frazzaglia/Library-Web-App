'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */

angular.module('palocsApp')
  .controller('SidebarSearchDbCtrl', ['$scope', '$rootScope', '$location', 'DbServ', '$log', function($scope, $rootScope, $location, DbServ, $log) {
    $scope.sidebarSearch = function() {
      if ($scope.title != undefined) {
        var promise;
        promise = DbServ.getBooks($scope.title);
        promise.then(
          function(success) {
            $rootScope.result = success.data;
            console.log(success.data);
            $location.url('/dashboard/search');
          },
          function(error) {
            $log.error("Error loading author");
          });
      } else {
        window.alert("Insert title or name");
      }
    };
  }])
  .directive('sidebar', ['$location', '$rootScope', function($rootScope) {
    return {
      templateUrl: 'scripts/directives/sidebar/sidebar.html',
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function($scope) {
        $scope.selectedMenu = 'dashboard';
        $scope.collapseVar = 0;
        $scope.multiCollapseVar = 0;

        $scope.check = function(x) {

          if (x == $scope.collapseVar)
            $scope.collapseVar = 0;
          else
            $scope.collapseVar = x;
        };

        $scope.multiCheck = function(y) {

          if (y == $scope.multiCollapseVar)
            $scope.multiCollapseVar = 0;
          else
            $scope.multiCollapseVar = y;
        };
      }
    }
  }]);
