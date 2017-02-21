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
        $scope.restructurationForInform = null
        $scope.orderDescAsc = null
        $scope.desc = null
        $scope.orderTypeFunc = null
        $scope.orderType = null
        $scope.orderTypeComment = null
        $scope.inform = null

        init()

        function init(){
            orders()
            $rootScope.car = $cookieStore.get('car')
            $scope.restructurationForInform = restructurationForInform
            $scope.orderDescAsc = orderDescAsc
            $scope.desc = false
            $scope.orderTypeFunc = orderTypeFunc
            $scope.orderType = 'total'
            $scope.orderTypeComment = "Evento"
            $scope.inform = inform
        }

        function orders() {
            apiEata.orders()
                .then(function(data){
                    $scope.orders = data.data
                })
                .catch(function (error) {
                    console.log(error)
                })
        }

        // Utilizada para reestructurar el json que entra del api de orders para aplicar filtros sobre el mismo.
        function restructurationForInform (object){
            console.log(object, 1)
            var list = []
            angular.forEach(object.lines, function(data){
                list.push({"event":data.ticket.event.name, "order": object.name, "ticket":data.ticket.name, "quantity":data.quantity, "price": data.ticket.price, "total": (data.ticket.price * data.quantity), "date": object.created_at})
            })
            return list;
        };

        // Utilizada para alternar el orden en los filtros de mayor a menor o viceversa


        function orderDescAsc(desc){
            $scope.desc = desc
        }

        // Utilizada para alternar el tipo de dato a utilizar en el orden de los filtros


        function orderTypeFunc(type) {

            $scope.orderType = type

            switch (type) {
                case '$key':
                    $scope.orderTypeComment = "Evento"   // valor que toma evento al filtrar y quedar en la cabecera, se encuentra en la cabecera
                    break;
                case 'total':
                    $scope.orderTypeComment = "Ventas" // valor total de ventas
                    break;
                case 'date':
                    $scope.orderTypeComment = "Fecha"  // ordenado por fecha
                    break;
            }
        }

        function inform(value){
            $scope.informe = value;
            if(value == 1)
                $scope.groupType = 'event'
            else
                $scope.groupType = 'date'
        }


    }])
