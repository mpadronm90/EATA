/**
 * Created by michel on 17/02/17.
 */
'use strict';

angular.module('myApp.viewAuth', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewAuth', {
                templateUrl: 'viewAuth/auth.html',
                controller: 'ViewAuth'
            });
    }])

    .controller('ViewAuth', ['$scope', 'apiEata', '$http'   , function($scope, apiEata, $http) {
        $scope.user = {}
        $scope.login = login

        init()

        function login(isValid){
            if(isValid) {
                apiEata.login($scope.user).then(function (data) {
                    console.log(data)

                }).catch(function (error) {
                    $scope.messages = "Usuario o password incorrecto";
                    console.log(error)
                })
            }
            else{
                $scope.messages = "Rellene los campos de forma correcta";
            }
        }

        function init(){
            $http.defaults.headers.common['Authorization'] = '';
        }
    }]);