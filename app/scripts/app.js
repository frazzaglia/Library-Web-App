'use strict';
/**
 * @ngdoc overview
 * @name palocsApp
 * @description
 * # palocsApp
 *
 * Main module of the application.
 */
angular
  .module('palocsApp', [
    'oc.lazyLoad',
    'ui.router',
    'ngRoute',
    'ui.bootstrap',
    'angular-loading-bar',
    'LocalStorageModule',
    'palocsApp.apiServModule',
    'palocsApp.loginCtrlModule',
    'palocsApp.userServModule',
    'palocsApp.searchDbCtrlModule',
    'palocsApp.searchServModule',
    'cr.session'
  ])
  .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
    });

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
          loadMyDirectives: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'palocsApp',
              files: [
                'scripts/directives/header/header.js',
                'scripts/directives/header/header-notification/header-notification.js',
                'scripts/directives/sidebar/sidebar.js',
                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
              ]
            })
          }
        }
      })
      .state('dashboard.home', {
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: 'views/dashboard/home.html',
        resolve: {
          loadMyFiles: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'chart.js',
              files: [
                'scripts/controllers/main.js',
                'scripts/directives/timeline/timeline.js',
                'scripts/directives/notifications/notifications.js',
                'scripts/directives/chat/chat.js',
                'scripts/directives/dashboard/stats/stats.js',
                'scripts/controllers/chartContoller.js',
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            })
          }
        }
      })
      .state('dashboard.form', {
        templateUrl: 'views/form.html',
        url: '/form'
      })
      .state('dashboard.blank', {
        templateUrl: 'views/pages/blank.html',
        url: '/blank'
      })
      .state('login', {
        templateUrl: 'views/pages/login.html',
        url: '/login',
        controller: 'LoginCtrl',
      })
      .state('dashboard.chart', {
        templateUrl: 'views/chart.html',
        url: '/chart',
        controller: 'ChartCtrl',
        resolve: {
          loadMyFile: function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'chart.js',
                files: [
                  'bower_components/angular-chart.js/dist/angular-chart.min.js',
                  'bower_components/angular-chart.js/dist/angular-chart.css'
                ]
              }),
              $ocLazyLoad.load({
                name: 'palocsApp',
                files: ['scripts/controllers/chartContoller.js']
              })
          }
        }
      })
      .state('dashboard.table', {
        templateUrl: 'views/table.html',
        url: '/table'
      })
      .state('dashboard.prova', {
        templateUrl: 'views/prova.html',
        url: '/prova',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.search', {
        templateUrl: 'views/search.html',
        url: '/search',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.loans', {
        templateUrl: 'views/loans.html',
        url: '/loans',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.profile', {
        templateUrl: 'views/profile.html',
        url: '/profile',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.books', {
        templateUrl: 'views/books.html',
        url: '/books',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.manageLoans', {
        templateUrl: 'views/manageLoans.html',
        url: '/manageLoans',
        controller: 'SearchDbCtrl'
      })
      .state('dashboard.delay', {
        templateUrl: 'views/delay.html',
        url: '/delay',
        controller: 'SearchDbCtrl'
      })
  }])
  .run(['UserServ', function (UserServ) {
    UserServ.restore();
  }]);
