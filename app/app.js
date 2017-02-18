'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.viewAuth',
  'myApp.version',
  'myApp.services',
  'http-auth-interceptor'

])
    .config(['$locationProvider', '$routeProvider', '$httpProvider',function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/view1'});
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

    }])
    .run(['$rootScope', '$injector','$location', function($rootScope,$injector, $location) {

        $rootScope.$on('event:auth-loginCancelled', function(){
            $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
                headersGetter()['Authorization'] = null;
                $rootScope.login = false
                $location.url('/viewAuth')
            }
        });
        $rootScope.$on('event:auth-loginConfirmed', function(token){
            $injector.get("$http").defaults.transformRequest = function(data, headersGetter) {
                headersGetter()['Authorization'] = "Bearer "+token
                $rootScope.login = true
            }
        });
        $rootScope.$on('event:auth-loginRequired', function(){
            $rootScope.login = false
            $location.url('/viewAuth')
        });
    }]);
