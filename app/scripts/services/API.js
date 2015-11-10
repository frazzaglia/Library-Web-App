'use strict';

angular.module('palocsApp.apiServModule', []).
  value('version', 'step3')
  .service('API', ['$http', '$q', function($http, $q){
	  	var service = {};

      service.voidToken = function(token){
        delete $http.defaults.headers.common.Authorization;
      };

      service.setToken = function(token){
        $http.defaults.headers.common.Authorization = 'Basic ' + token;
      };

	  	service.getNews = function(searchKey) {
        return $http.get('http://rest.test.corley.it/news', {'params': {'q': searchKey}});
      };
	  	service.getNewsById = function(id) {
        return $http.get('http://rest.test.corley.it/news/' + id );
      };

      service.login = function(parameter) {
      //  return $http.post('http://rest.test.corley.it/login', parameter);
        return   $http({
            method: 'POST',
            url: 'http://localhost:80/search2.php',
            data: parameter,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
      };

		  return service;
  }]);
