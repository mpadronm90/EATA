/**
 * Created by michel on 17/02/17.
 */
'use strict';

angular.module('myApp.viewAuth', ['ngRoute', 'myApp.services', 'http-auth-interceptor'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewAuth', {
                templateUrl: 'viewAuth/auth.html',
                controller: 'ViewAuth'
            });
    }])

    .controller('ViewAuth', ['$scope', 'apiEata', 'authService'   , function($scope, apiEata, authService) {
        $scope.user = {}
        $scope.login = login

        function login(isValid){

            if(isValid) {
                apiEata.login($scope.user).then(function (token) {
                    console.log(token)
                    authService.loginConfirmed([token]);

                }).catch(function (error) {
                    console.log(error)
                    $scope.messages = "Usuario o password incorrecto "+error.message;
                })
            }
            else{
                $scope.messages = "Rellene los campos de forma correcta";
            }
        }



    }]);