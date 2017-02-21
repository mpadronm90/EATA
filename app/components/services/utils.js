/**
 * Created by michel on 17/02/17.
 */
'use strict';

angular.module('myApp.services')
    .factory('Utils', function(){

        var service = {};

        service.reverser = reverser;

        function reverser (list, toBeReversed){
            if (toBeReversed.length !== 0){
                list.push( toBeReversed.pop() );
                reverser(list, toBeReversed);
            }
        }

        return service;

    });