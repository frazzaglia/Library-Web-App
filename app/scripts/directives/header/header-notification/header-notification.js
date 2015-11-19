'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('palocsApp')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	})
	.controller('HeaderNotifyCtrl', ['$scope', '$location', function($scope, $location){
		$scope.goLogin = function() {
			console.log("Provo");
      $location.url('/user');
    };
	}]);
