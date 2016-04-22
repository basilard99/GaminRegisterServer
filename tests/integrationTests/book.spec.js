'use strict';

var should = require('should');
var app = require('../../app.js');
var request = require('supertest')(app);
var neo4jManager = require('../.././neo4jFunctions').create();
var valueTypes = require('../../lib/models/valueTypes.js');

describe('Book Integration Tests', function bookIntegrationTestSuite() {

    beforeEach(function beforeEach(done) {
        neo4jManager.clearNeo4j()
            .then(function neo4jClearedSuccessfully() {
                done();
            }, function neo4jFailedToClear(err) {
                console.log(err);
                done();
            });
    });

    it('Should allow a book to be saved and return a publisher id', function test(done) {
        var testData = {
                    title: 'Deadlands: Hell on Earth',
                    bookCode: 'PEG 123',
                    desription: 'Spaghetti western with meat',
                    cost: 24.95,
                    inInventory: true,
                    isPdf: true,
                    isPrint: true,
                    location: 'Home',
                    type: valueTypes.BookTypeEnum.RPG
        };

        request
            .put('/api/book')
            .send(testData)
            .expect(201)
            .end(function end(err, results) {
                console.log(err);
                results.body.should.have.property('id');
                done();
            });
    });

});
