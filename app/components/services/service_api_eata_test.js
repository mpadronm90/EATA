/**
 * Created by michel on 17/02/17.
 */
'use strict';

describe('myApp.services Api Eata', function() {
    var apiEata, httpBackend;

    beforeEach(module('myApp.services'));

    beforeEach(inject(function (_apiEata_, $httpBackend) {
        apiEata = _apiEata_;
        httpBackend = $httpBackend;
    }));


    describe('Api Eata service', function(){

        it('service.events return list', function() {
            //spec service
            httpBackend.whenGET('http://frontendtest.entradasatualcance.com/api/v1/events').respond([
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
            apiEata.events().then(function(data) {
                expect(data.data[1].id).toEqual(32);
            });
            httpBackend.flush();
        });

        it('service.login return Token', function() {
            //spec service
            httpBackend.whenPOST('http://frontendtest.entradasatualcance.com/api/v1/oauth/token', {}).respond([
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
            apiEata.events().then(function(data) {
                expect(data.data[1].id).toEqual(32);
            });
            httpBackend.flush();
        });

    });
});