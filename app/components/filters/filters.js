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
    })
    .filter('reverse', ['Utils',function(Utils) {
            return function(toBeReversed, desc){
                console.log(desc)
                var reverse = []
                if(desc) {
                    Utils.reverser(reverse, toBeReversed)      //Funcion que devuelve los items en list de forma reversa con recursividad
                    console.log(reverse)
                    return reverse;
                }
                else {
                    return toBeReversed;
                }
            };
    }])
    .filter('customOrder', function() {
        return function(toBeReversed, desc){
            var reverse = []
            if(desc) {
                Utils.reverser(reverse, toBeReversed)      //Funcion que devuelve los items en list de forma reversa con recursividad
                console.log(reverse)
                return reverse;
            }
            else {
                return toBeReversed;
            }
        };
    })
    .filter('customGroupBy', ['$filter',function($filter) {
        return function(items, key){

           var list = $filter('flatten')(items)
           list =  $filter('groupBy')(list, key)
           list =  $filter('toArray')(list, true)

           angular.forEach(list, function(obj){
               obj.total =  $filter('sumByKey')(obj, 'total')
           })

           return list
        };
    }])
    .filter("groupingMonthFilter", function () {

        return function (orig, same, getID) {
            if (!(orig instanceof Array)) return orig;
            if (orig.length == 0) return orig;

            var result = [];

            var cur = [];
            var i = 0;
            for (i = 0; i < orig.length; i ++) {
                if (i == 0 || same(orig[i], orig[i-1])) {
                    cur.push(orig[i]);
                } else {
                    result.push({
                        id: getID(orig[i-1]),
                        items: cur
                    });

                    cur = [orig[i]];
                }

            }
            result.push({
                id: getID(orig[orig.length - 1]),
                items: cur
            });

            var toKey=function(item){
                return moment(item.logdate).format("YYYY-MM-DD");
            };

            function pushtoexists(itemDateMap,item,date){
                for(var j=0; j<itemDateMap.length; j++){
                    if(itemDateMap[j].date == date){
                        itemDateMap[j].logtimes.push(item);
                        return true;
                    }
                }
                return false;
            }
            function push_item(itemDateMap,item,date){
                itemDateMap.push({
                    'date':date,
                    'item':[item]
                });
            }
            var addArrayToMap = function(items){
                var itemDateMap = [];

                for(var i=0; i<items.length; i++){
                    var item = items[i];
                    var date = toKey(item);

                    var push_obj = pushtoexists(itemDateMap,item,date);
                    if(itemDateMap.length == 0 || push_obj== false){
                        push_item(itemDateMap,item,date);
                    }

                }

                return {
                    "data_list":itemDateMap,
                };
            };


            for (i = 0; i < result.length; i ++) {
                var map = addArrayToMap(result[i].items);
                result[i].data = map.item_list;
                result[i].$$hashKey = i;

            }

            return result;
        };
    });;
