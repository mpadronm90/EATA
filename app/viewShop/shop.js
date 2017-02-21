/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp.viewShop', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/viewShop', {
                templateUrl: 'viewShop/viewShop.html',
                controller: 'ViewShop'
            });
    }])

    .controller('ViewShop', ['$scope', 'apiEata', '$location','$rootScope','$cookieStore','Notification', function($scope, apiEata, $location, $rootScope, $cookieStore, Notification) {

        $scope.buy = null;
        $scope.remove = null
        $scope.title = null
        $scope.order = {}

        init()

        function init(){
            if(validatePerson()){
                $rootScope.car = $cookieStore.get('car')
                $scope.buy = buy;
                $scope.remove = deleteItemFromCar
                $scope.title = 'Tu carrito esta vacío'
            }
        }

        function buy(){
            $scope.order.lines = [];
            var items = selectChoosen()

            if(items[0]) {
                apiEata.order($scope.order)
                    .then(function(result){
                        console.log(result)
                        Notification.success('La orden se ha concretado');
                        deleteCarTickets(items)
                        $scope.title = 'Gracias por elegirnos!'
                    })
                    .catch(function(error){
                        console.log(error)
                        Notification.error({message: 'No se ha podido concretar la operación. Vuelva a Loguearse'});

                    })
            }
            else{
                Notification({message: 'Debe seleccionar un ticket para proceder a la compra'}, 'error')
            }
        }

        function selectChoosen(){
            var list = []
            angular.forEach($rootScope.car, function(object){
                if(object.choose) {
                    list.push(object)
                    $scope.order.lines.push({'ticket': object.id, 'quantity': object.toBuy})
                }
            })
            console.log(list)
            return list;
        }

        function deleteCarTickets(items){
            angular.forEach(items, function(item){
                angular.forEach($rootScope.car, function(object){
                    if(item.id == object.id) {
                        deleteItemFromCar(object)
                    }
                })
            })

        }

        function deleteItemFromCar(object){
            $rootScope.car.splice($rootScope.car.indexOf(object), 1)
            $cookieStore.put('car', $rootScope.car)
        }

        function validatePerson(){
            if($cookieStore.get('userSession').access_token == null){
                $location.url('/viewAuth')
            }
            else return true
        }

    }]);
