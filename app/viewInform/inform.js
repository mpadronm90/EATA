/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp.viewInform', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewInform', {
                templateUrl: 'viewInform/viewInform.html',
                controller: 'ViewInform'
            });
    }])

    .controller('ViewInform', ['$scope', 'apiEata', '$location','$rootScope','$cookieStore', function($scope, apiEata, $location, $rootScope, $cookieStore) {


        $scope.orders = []

        init()

        function init(){
            orders()
            $rootScope.car = $cookieStore.get('car')
        }

        function orders() {
            apiEata.orders()
                .then(function(data){
                    $scope.orders = data.data
                })
                .catch(function (error) {
                    console.log(error)
                    $location.url('/viewAuth')
                })
        }


    }])
