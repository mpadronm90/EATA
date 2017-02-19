/**
 * Created by michel on 17/02/17.
 */
'use strict';

describe('myApp.viewAuth module', function() {
    var apiEata, httpBackend,viewAuth, scope, createController, $cookieStore, $location;

    beforeEach(module('myApp.viewAuth'));

    beforeEach(angular.mock.module('ngCookies'));

    beforeEach(inject(function (_apiEata_, $httpBackend, _$cookieStore_, _$location_) {
        apiEata = _apiEata_;
        httpBackend = $httpBackend;
        $cookieStore = _$cookieStore_;
        $location = _$location_

        $cookieStore.put('userSession', {
            'access_token': "YjY1MzMyODViNWU1NzM5ZDFjMmRhNTlmM2M2N2QyZmI5Mjc4ZWQxMmM4N2I5ZmY4MjBiMjRjYjQwNTBmZTE2MA",
            'refresh_token': "YjY1MzMyODViNWU1NzM5ZDFjMmRhNTlmM2M2N2QyZmI5Mjc4ZWQxMmM4N2I5ZmY4MjBiMjRjYjQwNTBmZTE2MA"
        });
    }));

    beforeEach(inject(function ($rootScope, $controller ) {
        scope = $rootScope.$new();
        scope.user = {"username" : "mpadronm90", "password" : "mpadronm90"}
        createController = function() {
            return $controller('ViewAuth', {
                $scope: scope
            });
        };
    }));

    describe('viewAuth controller', function(){

        it('should ....', inject(function() {
            //spec body
            viewAuth = new createController();
            expect(viewAuth).toBeDefined();
        }));



        it('should login correctly', inject(function($timeout) {
            //spec body
            viewAuth = new createController();
            scope.login(true)
            $timeout(function assert() {
                expect($location.path()).toBe('/viewEvent');
                expect($cookieStore.get('userSession').access_token).not.toBe('YjY1MzMyODViNWU1NzM5ZDFjMmRhNTlmM2M2N2QyZmI5Mjc4ZWQxMmM4N2I5ZmY4MjBiMjRjYjQwNTBmZTE2MA');
                $timeout.verifyNoPendingTasks();
                done();
            }, 1001);

        }));

        afterEach(function() {
            // clean up
            $cookieStore.remove ('userSession');
        });

    });

});