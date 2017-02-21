'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ui-notification',
  'angular.filter',
  'ngAnimate',
  'ngTouch',
  'myApp.viewAuth',
  'myApp.version',
  'myApp.services',
  'myApp.viewEvents',
  'myApp.viewTickets',
  'myApp.viewShop',
  'myApp.viewInform'

])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', 'NotificationProvider', function($locationProvider, $routeProvider, $httpProvider, NotificationProvider, $q) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/viewEvents'});
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

        $httpProvider.interceptors.push('httpRequestInterceptor');

        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 80,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
        });

    }]);
