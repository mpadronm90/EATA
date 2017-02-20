/**
 * Created by michel on 17/02/17.
 */
'use strict';

angular.module('myApp.services', [])
    .factory('apiEata', function($http, $q, $cookieStore){

        var service = {};

        service.pathUrl = 'http://frontendtest.entradasatualcance.com/api/v1/';

        service.login = login;
        service.events = events;
        service.event = event;
        service.tickets = tickets;
        service.order = createOrder;
        service.orders = orders;


        return service;

        function setHeader(){
            // var userSession = $cookieStore.get('userSession') ? $cookieStore.get('userSession') : {} todo quitar
            $http.defaults.headers.common.Authorization = 'Bearer '+$cookieStore.get('userSession').access_token;
        }

        function login (user) {
            var defer = $q.defer();
            var promise = defer.promise;

            $http.post(service.pathUrl+'oauth/token/user', {"username": user.username,"password": user.password})
                .then(function(data){
                    defer.resolve(data);
                })
                .catch(function(error){
                    defer.reject(error);
                })

            return promise;
        }

        function events(){
            setHeader();
            return $http.get(service.pathUrl+'events');
        };

        function event(event){
            setHeader()
            return $http.get(service.pathUrl+'events/'+event);
        };

        function tickets(event){
            setHeader()
            return $http.get(service.pathUrl+'events/'+event+'/tickets');
        };

        function createOrder(order){
            setHeader()
            return $http.post(service.pathUrl+'orders',order);
        }

        function orders(){
            setHeader()
            return $http.get(service.pathUrl+'orders');
        }



    });