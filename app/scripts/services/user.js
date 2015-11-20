'use strict';

angular.module('palocsApp.userServModule', []).
value('version', 'step3')
  .service('UserServ', ['$http', '$q', 'API', 'crSession', function($http, $q, API, crSession) {
    var service = {};

    service.userData = {};

    service.getSessionUserInfo = function() {
      return crSession.get('userData');
    };

    service.isConnected = function() {
      return Object.keys(service.userData).length > 0;
    };

    service.isStudentOrTeacher = function() {
      return crSession.get('userType') === "S";
    };

    service.login = function(user, password) {
      var deferred = $q.defer();

      API.login(user, password).then(function(response) {
        // qui posso salvare in sessione
        console.log("Salvo i dati in sessione.");
        console.log(response.data);
        crSession.set('userData', response.data);
        crSession.set('idUtente', response.data[0].id_number);
        crSession.set('userType', response.data[0].type);
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
