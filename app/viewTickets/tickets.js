/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp.viewTickets', ['ngRoute', 'myApp.services'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/event/:eventId/viewTickets/', {
                templateUrl: 'viewTickets/viewTickets.html',
                controller: 'ViewTickets'
            });
    }])

    .controller('ViewTickets', ['$scope', 'apiEata', '$location','$routeParams', '$rootScope', 'Notification', '$cookieStore', function($scope, apiEata, $location, $routeParams, $rootScope, Notification, $cookieStore) {

        $scope.event = null
        $scope.tickets = null
        $scope.addToCar = null

        init()

        function init(){
            event();
            tickets();
            $rootScope.car = $cookieStore.get('car')
            $scope.addToCar = addToCar
        }

        function event(){
            apiEata.event($routeParams.eventId)
                .then(function(data){
                    $scope.event = data.data
                    console.log(data)
                })
                .catch(function(error){
                    console.log(error)
                    $scope.event = {}
                    //$location.url('/viewAuth');
                })
        }

        function tickets(){
            apiEata.tickets($routeParams.eventId)
                .then(function(data){
                    $scope.tickets = data.data
                    console.log('especial')
                    console.log(data)

                })
                .catch(function(error){
                    console.log(error)
                    $scope.tickets = {}
                    //$location.url('/viewAuth');
                })
        }

        function addToCar(ticket) {
            var founded = false
            angular.forEach($rootScope.car, function (object) {

                if (object.id == ticket.id) {
                    if ((object.toBuy + ticket.toBuy) <= ticket.maximum) {
                        object.toBuy += ticket.toBuy
                        Notification('Se ha añadido el pedido al carrito');
                        ticket.toBuy = 0
                    }
                    else {
                        Notification.error('Ha llegado al máximo de tickets para este evento');
                    }
                    founded = true
                }
            });
            if (!founded) {
                var list = []
                var ticketcar = clone(ticket);
                ticketcar.event.seatmap_seats = [] // TODO crear seatmap
                list.push(ticketcar);
                if(!$rootScope.car) {
                    $rootScope.car = list
                }
                else{
                    $rootScope.car.push(list[0]);
                }
                ticket.toBuy = 0
                Notification('Se ha añadido el pedido al carrito');
            }
            $cookieStore.put('car', $rootScope.car)

        }

        function clone(src) {
            function mixin(dest, source, copyFunc) {
                var name, s, i, empty = {};
                for(name in source){
                    // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
                    // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
                    // don't overwrite it with the toString() method that source inherited from Object.prototype
                    s = source[name];
                    if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
                        dest[name] = copyFunc ? copyFunc(s) : s;
                    }
                }
                return dest;
            }

            if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
                // null, undefined, any non-object, or function
                return src;	// anything
            }
            if(src.nodeType && "cloneNode" in src){
                // DOM Node
                return src.cloneNode(true); // Node
            }
            if(src instanceof Date){
                // Date
                return new Date(src.getTime());	// Date
            }
            if(src instanceof RegExp){
                // RegExp
                return new RegExp(src);   // RegExp
            }
            var r, i, l;
            if(src instanceof Array){
                // array
                r = [];
                for(i = 0, l = src.length; i < l; ++i){
                    if(i in src){
                        r.push(clone(src[i]));
                    }
                }
                // we don't clone functions for performance reasons
                //		}else if(d.isFunction(src)){
                //			// function
                //			r = function(){ return src.apply(this, arguments); };
            }else{
                // generic objects
                r = src.constructor ? new src.constructor() : {};
            }
            return mixin(r, src, clone);

        }
    }])