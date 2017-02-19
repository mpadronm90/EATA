/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp.viewEvents', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewEvents', {
                templateUrl: 'viewEvents/viewEvents.html',
                controller: 'ViewEvents'
            });
    }])

    .controller('ViewEvents', ['$scope', 'apiEata', '$location','$rootScope','$cookieStore', function($scope, apiEata, $location, $rootScope, $cookieStore) {

        $scope.events = {};

        init()

        function init(){
           events()
           $rootScope.car = $cookieStore.get('car')
        }

        function events(){
            apiEata.events()
                .then(function(data){
                    console.log(data)
                    $scope.events = data.data;
                })
                .catch(function(error){
                    $location.url('/viewAuth');
                })
        }

    }])
