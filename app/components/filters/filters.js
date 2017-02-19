/**
 * Created by michel on 18/02/17.
 */
'use strict';

angular.module('myApp')
    .filter('Customfilter', function() {
        return function(input, search) {
            if (!input) return input;
            if (!search) return input;
            var expected = ('' + search).toLowerCase();
            var result = {};
            angular.forEach(input, function(object, index){
                angular.forEach(object, function(value, key) {
                    var actual = ('' + value).toLowerCase();
                    if (actual.indexOf(expected) !== -1) {
                        result[index] = object;
                        return;
                    }
                });
            })

            return result;
        }
    })
    .filter('sumByKey', function() {
        return function(data, key) {

            if (typeof(data) === 'undefined' || typeof(key) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                sum += parseInt(data[i][key]);
            }

            return sum;
        };
    })
    .filter('sumPriceChoose', function() {
        return function(data) {

            if (typeof(data) === 'undefined') {
                return 0;
            }

            var sum = 0;
            for (var i = data.length - 1; i >= 0; i--) {
                if(data[i]['choose'] == true){

                    sum += parseInt(data[i]['price']) * parseInt(data[i]['toBuy']);
                }
            }

            return sum;
        };
    });