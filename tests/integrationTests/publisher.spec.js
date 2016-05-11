'use strict';

var should = require('should');
var app = require('../../app.js');
var request = require('supertest')(app);
var neo4jManager = require('../.././neo4jFunctions').create();

describe('Publisher Integration Tests', function publisherSuite() {

    beforeEach(function setupDataForEachTest(done) {
        neo4jManager.clearNeo4j()
            .then(function neo4jClearedSuccessfully() {
                done();
            }, function neo4jFailedToClear() {
                done();
            });
    });

    describe('Given a valid publisher on the client', function givenAValidPublisherOnClient() {
        context('When POSTed to a publisher list', function whenPosting() {
            it('Should receive a 201 (Created) response', function shouldReceive201(done) {
                var testData = {
                    name: 'Fantasy Flight Games',
                    webSite: 'http://www.fantasyflightgames.com',
                    code: 'FFG',
                    isActive: true
                };

                request
                    .post('/api/PublisherList/')
                    .send(testData)
                    .expect(201)
                    .end(function end() {
                        done();
                    });
            });

            it('Should receive a reference to the created entity', function shouldReceiveReferenceToEntity(done) {
                var testData = {
                    name: 'Fantasy Flight Games',
                    webSite: 'http://www.fantasyflightgames.com',
                    code: 'FFG',
                    isActive: true
                };

                request
                    .post('/api/PublisherList/')
                    .send(testData)
                    .expect(201)
                    .end(function end(err, results) {
                        results.text.should.equal('/publisherList/Fantasy%20Flight%20Games');
                        done();
                    });
            });

            it('Should receive a Location Header to the created entity', function shouldReceiveLocation(done) {
                var testData = {
                    name: 'Fantasy Flight Games',
                    webSite: 'http://www.fantasyflightgames.com',
                    code: 'FFG',
                    isActive: true
                };

                request
                    .post('/api/PublisherList/')
                    .send(testData)
                    .expect(201)
                    .expect('Location', '/publisherList/Fantasy%20Flight%20Games')
                    .end(function end() {
                        done();
                    });
            });
        });

        context('When PUT', function whenPutting() {
            it('Should receive a 201 (Created) response status', function shouldReceive201(done) {
                var testData = {
                    name: 'Fantasy Flight Games',
                    webSite: 'http://www.fantasyflightgames.com',
                    code: 'FFG',
                    isActive: true
                };

                request
                    .put('/api/PublisherList/' + testData.name)
                    .send(testData)
                    .expect(201)
                    .end(function end() {
                        done();
                    });
            });
        });
    });

    describe('Given a publisher exists on the server', function givenPublisherExists() {
        beforeEach(function createTestData(done) {
            var testData = {
                name: 'Fantasy Flight Games',
                webSite: 'http://www.fantasyflightgames.com',
                code: 'FFG',
                isActive: true
            };

            request
                .post('/api/publisherList')
                .send(testData)
                .end(function end(err) {
                    if (err) {
                        should.fail('Unable to post publisher: ' + err.message);
                    };
                    done();
                });
        });

        context('When GETting', function gettingPublisherData() {
            it('a single publisher should be retrieved', function retrieveSinglePublisher(done) {
                request
                    .get('/api/publisherList/Fantasy%20Flight%20Games')
                    .expect(200)
                    .end(function end(err, results) {
                        if (err) {
                            should.fail(err.message);
                            done();
                        }

                        results.body.should.have.property('name');
                            should.equal(results.body.name, 'Fantasy Flight Games');
                            done();
                        });
            });
        });
    });
});

after(function cleanupAfterTests(done) {
    app.server.close();
    console.log('shutting down Express');
    done();
});
