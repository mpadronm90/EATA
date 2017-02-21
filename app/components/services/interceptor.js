angular.module('myApp.services')
    .factory('httpRequestInterceptor', function ($q, $location) {
        return {
            'responseError': function (rejection) {
                // do something on error
                if(rejection.status === 404 || rejection.status === 400 || rejection.status === 401){
                    $location.path('/viewAuth');
                }
                return $q.reject(rejection);

            }
        }
    });