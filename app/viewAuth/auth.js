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

    .controller('ViewAuth', ['$scope', 'apiEata', '$location', '$cookieStore','$rootScope', function($scope, apiEata, $location, $cookieStore, $rootScope) {

        $scope.user = null
        $scope.login = null

        init()

        function init(){
            $rootScope.car = 0;
            $scope.login = login
            if($cookieStore.get('userSession'))
                $scope.user = {'username': $cookieStore.get('userSession').user, 'password': $cookieStore.get('userSession').pass}
        }

        function login(isValid){
            if(isValid) {
                apiEata.login($scope.user).then(function (data) {
                    refreshSession(data)
                    $location.url('/viewEvents')
                }).catch(function (error) {
                    console.log(error)
                    $scope.messages = "Usuario y/o password contraseña incorrectos";
                })
            }
            else{
                $scope.messages = "Usuario y contraseña obligatorios";
            }
        }

        function refreshSession(data){
            if(!$cookieStore.get('userSession')){
                $cookieStore.put('userSession', {})
            }

            var userSession = {'user':$scope.user.username, 'access_token': data.data.access_token, 'refresh_token': data.data.refresh_token};

            $scope.user.remember == true ? userSession.pass = $scope.user.password : userSession.pass = '';
            $cookieStore.get('userSession').user !== $scope.user.username ? $cookieStore.remove('car') : $rootScope.car = $cookieStore.get('car');
            $cookieStore.put('userSession', userSession);
            console.log($cookieStore.get('userSession'))
        }

    }]);