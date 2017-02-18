/**
 * Created by michel on 17/02/17.
 */
'use strict';

angular.module('myApp.services', [])
    .factory('apiEata', function($http, $q){

        var service = {};

        service.pathUrl = 'http://frontendtest.entradasatualcance.com/api/v1/';

        service.login = login;
        service.events = events;
        service.ticketsByEvent = ticketsByEvent;
        service.createOrder = createOrder;


        return service;

        function login (user) {
            var defer = $q.defer();
            var promise = defer.promise;

            $http.post(service.pathUrl+'oauth/token/user', {"username": user.username,"password": user.password})
                .then(function(data){
                    defer.resolve(data.data.access_token);
                })
                .catch(function(error){
                    defer.reject(error);
                })

            return promise;
        }

        function events(){
            return $http.get(service.pathUrl+'events');
        };

        function ticketsByEvent(event){
            return $http.get(service.pathUrl+event+'/tickets');
        };

        function createOrder(order){
            return $http.post(service.pathUrl+'orders',[order, order.name, order.lastname, order.documentId, order.zipcode, order.lines]);
        }

    });