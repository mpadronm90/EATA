/**
 * Created by michel on 18/02/17.
 */
'use strict';


angular.module('myApp')
    .directive('logout', ['$cookieStore','$location', '$rootScope', function ($cookieStore, $location, $rootScope) {
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment
            template: '<a style="color: white" class="nav-link" ng-click="logout()"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></a>',
            controller: function ($scope) {

                $scope.logout = logout

                function logout(){
                    var userSession = $cookieStore.get('userSession');
                    if(userSession) {
                        userSession.access_token = null
                        userSession.refresh_token = null
                        $cookieStore.put('userSession', userSession)
                        $rootScope.car = []
                        $location.url('/viewAuth')
                    }
                }

            } //DOM manipulation
        }
}]);
