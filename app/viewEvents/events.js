/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp.viewEvents', ['ngRoute', 'myApp.services', 'http-auth-interceptor'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewEvents', {
                templateUrl: 'viewEvents/viewEvents.html',
                controller: 'ViewEvents'
            });
    }])

    .controller('ViewEvents', ['$scope', 'apiEata', '$http', 'authService', function($scope, apiEata, $http, authService) {


    }]);