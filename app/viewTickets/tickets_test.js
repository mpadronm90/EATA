/**
 * Created by michel on 18/02/17.
 */
'use strict';

describe('myApp.viewTickets module', function() {
    var apiEata, httpBackend, viewTickets, viewAuth, scope, scopeAuth,  createController, $cookieStore, createAuthController;

    beforeEach(module('myApp.viewAuth', 'myApp.viewTickets'));

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
            return $controller('ViewTickets', {
                $scope: scope,
                $routeParams: {'eventId': 31}
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

    describe('viewTicket controller', function(){

        it('should defined', inject(function() {
            //spec body
            viewTickets = new createController();
            expect(viewTickets).toBeDefined();
        }));

        it('should get list of Ticket', inject(function($timeout) {
            //spec body
            viewTickets = new createController();
            $timeout(function assert() {
                expect(scope.tickets).toBe([
                    {
                        "id": 151,
                        "event": {
                            "id": 31,
                            "name": "Event 1",
                            "description": "Event 1 description",
                            "date": "2016-12-23T17:58:27+0000",
                            "numbered": false,
                            "seatmap_seats": []
                        },
                        "name": "Event 1 Ticket 1",
                        "description": "Event 1 Ticket 1 description",
                        "price": 39,
                        "minimum": 1,
                        "maximum": 5
                    },
                    {
                        "id": 152,
                        "event": {
                            "id": 31,
                            "name": "Event 1",
                            "description": "Event 1 description",
                            "date": "2016-12-23T17:58:27+0000",
                            "numbered": false,
                            "seatmap_seats": []
                        },
                        "name": "Event 1 Ticket 2",
                        "description": "Event 1 Ticket 2 description",
                        "price": 60,
                        "minimum": 2,
                        "maximum": 4
                    },
                    {
                        "id": 153,
                        "event": {
                            "id": 31,
                            "name": "Event 1",
                            "description": "Event 1 description",
                            "date": "2016-12-23T17:58:27+0000",
                            "numbered": false,
                            "seatmap_seats": []
                        },
                        "name": "Event 1 Ticket 3",
                        "description": "Event 1 Ticket 3 description",
                        "price": 44,
                        "minimum": 1,
                        "maximum": 4
                    },
                    {
                        "id": 154,
                        "event": {
                            "id": 31,
                            "name": "Event 1",
                            "description": "Event 1 description",
                            "date": "2016-12-23T17:58:27+0000",
                            "numbered": false,
                            "seatmap_seats": []
                        },
                        "name": "Event 1 Ticket 4",
                        "description": "Event 1 Ticket 4 description",
                        "price": 64,
                        "minimum": 2,
                        "maximum": 6
                    },
                    {
                        "id": 155,
                        "event": {
                            "id": 31,
                            "name": "Event 1",
                            "description": "Event 1 description",
                            "date": "2016-12-23T17:58:27+0000",
                            "numbered": false,
                            "seatmap_seats": []
                        },
                        "name": "Event 1 Ticket 5",
                        "description": "Event 1 Ticket 5 description",
                        "price": 32,
                        "minimum": 1,
                        "maximum": 7
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