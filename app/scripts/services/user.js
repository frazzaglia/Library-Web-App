'use strict';

angular.module('palocsApp.userServModule', []).
value('version', 'step3')
  .service('UserServ', ['$http', '$q', 'API', 'crSession', '$rootScope', function($http, $q, API, crSession, $rootScope) {
    var service = {};

    service.userData = {};

    service.getSessionUserInfo = function() {
      return crSession.get('userData');
    };

    service.isConnected = function() {
      /*if (Object.keys(service.userData).length > 0) {
        console.log("Connesso");
      }
      else {
        console.log("NON connesso");
      }*/
      return Object.keys(service.userData).length > 0;
    };

    service.login = function(user, password) {
      var deferred = $q.defer();

      var parameter = JSON.stringify({
        username: user,
        password: password
      });
      API.login(parameter).then(function(response) {
        // qui posso salvare in sessione
        console.log("la risposta è:" + response);
        crSession.set('userData', response.data)
        service.userData = response.data;
        API.setToken(response.data.token);
        console.log(crSession.get('userData'));
        deferred.resolve(response);
      }, function(error) {
        console.log("l'errore è:" + error);
        deferred.reject(error);
      });

      return deferred.promise;
    };

    service.logout = function() {
      crSession.purge();
      API.voidToken();
      service.userData = {};
    };

    service.restore = function() {
      if (crSession.get('userData')) {
        service.userData = crSession.get('userData');
      }
    };

    return service;
  }]);
