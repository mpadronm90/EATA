/**
 * Created by michel on 18/02/17.
 */
'use strict';

describe('myApp.viewEvents module', function() {
    var apiEata, httpBackend, viewAuth, viewEvents, scope, scopeAuth, createController, $cookieStore, createAuthController;

    beforeEach(module('myApp.viewAuth', 'myApp.viewEvents'));

    beforeEach(angular.mock.module('ngCookies'));

    beforeEach(inject(function (_apiEata_, $httpBackend, _$cookieStore_) {
         apiEata = _apiEata_;
         httpBackend = $httpBackend;
         $cookieStore = _$cookieStore_;

        $cookieStore.put('userSession', {
            'access_token': "YjY1MzMyODViNWU1NzM5ZDFjMmRhNTlmM2M2N2QyZmI5Mjc4ZWQxMmM4N2I5ZmY4MjBiMjRjYjQwNTBmZTE2MA",
            'refresh_token': "YjY1MzMyODViNWU1NzM5ZDFjMmRhNTlmM2M2N2QyZmI5Mjc4ZWQxMmM4N2I5ZmY4MjBiMjRjYjQwNTBmZTE2MA"
        });
    }));

    beforeEach(inject(function ($rootScope, $controller ) {
        scope = $rootScope.$new();
        createController = function() {
            return $controller('ViewEvents', {
                $scope: scope
            });
        };
    }));

    beforeEach(inject(function ($rootScope, $controller ) {
        scopeAuth = $rootScope.$new();
        scopeAuth.user = {"username" : "mpadronm90", "password" : "mpadronm90"}
        createAuthController = function() {
            return $controller('ViewAuth', {
                $scope: scopeAuth
            });
        };

        viewAuth = new createAuthController();


    }));

    beforeEach(inject(function () {

        scopeAuth.login(true)

    }));

    describe('viewEvent controller', function(){

        it('should defined', inject(function() {
            //spec body
            viewEvents = new createController();
            expect(viewEvents).toBeDefined();
        }));

        it('should get list of event', inject(function($timeout) {
            viewEvents = new createController();
            $timeout(function assert() {
                expect(scope.events).toBe([
                    {
                        "id": 31,
                        "name": "Event 1",
                        "description": "Event 1 description",
                        "date": "2016-12-23T17:58:27+0000",
                        "numbered": false
                    },
                    {
                        "id": 32,
                        "name": "Event 2",
                        "description": "Event 2 description",
                        "date": "2016-12-24T17:58:27+0000",
                        "numbered": false
                    },
                    {
                        "id": 33,
                        "name": "Event 3",
                        "description": "Event 3 description",
                        "date": "2016-12-25T17:58:27+0000",
                        "numbered": false
                    },
                    {
                        "id": 34,
                        "name": "Event 4",
                        "description": "Event 4 description",
                        "date": "2016-12-26T17:58:27+0000",
                        "numbered": false
                    },
                    {
                        "id": 35,
                        "name": "Event 5",
                        "description": "Event 5 description",
                        "date": "2016-12-27T17:58:27+0000",
                        "numbered": true
                    }
                ]);
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