'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'ui-notification',
  // 'ngAnimate',
  // 'ngTouch',
  // 'ui.bootstrap',
  'angularModalService',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewAuth',
  'myApp.version',
  'myApp.services',
  'myApp.viewEvents',
  'myApp.viewTickets',
  'myApp.viewShop'

])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', 'NotificationProvider',function($locationProvider, $routeProvider, $httpProvider, NotificationProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/view1'});
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';


        NotificationProvider.setOptions({
            delay: 3000,
            startTop: 80,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });
    }])
    .run(['$rootScope', '$injector','$location', function($rootScope,$injector, $location) {


    }]);
