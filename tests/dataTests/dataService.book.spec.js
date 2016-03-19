'use strict';

var assert = require('chai').assert;
var db = require('seraph')({ name: 'neo4j', pass: 'pass' });
var Promise = require('bluebird');
var neo4jManager = require('../.././neo4jFunctions').create();

//var publisherFactory = require('../../lib/models/publisher.js');
var dataService = require('../../lib/models/dataService.book.js').createBookService(db);


/*
var addSinglePublisherNode = function addSingleNode(data) {
    var dataToSave =  { name: data.name,
                        code: data.code,
                        webSite: data.webSite,
                        isActive: data.isActive,
                        description: data.description };

    return neo4jManager.addNode(dataToSave, 'Publisher');
};

var addTestPublishers = function addAsync(samplePublisherData) {
    return new Promise(function addPromise(resolve) {
        var addPromises = [];
        for (var i = 0; i < samplePublisherData.length; i++) {
            addPromises.push(addSinglePublisherNode(samplePublisherData[i]));
        }
        Promise.all(addPromises).then(function cleanupAfterAllPublishers() {
            resolve();
        });
    });
};
*/

describe.only('The Data Service will handle books as follows --', function dataServiceTests() {

/*
    describe('when handling lists of books', function bookList() {

        beforeEach(function beforeHandlingPublisherLists() {
            return neo4jManager.clearNeo4j()
                    .then(function successfullyCleared() {
                        return neo4jManager.addDummyNode();
                    });
        });

        it('will get only publisher nodes', function test() {
            var samplePublisherData = require('./fakes/publisherData.js').createManyFakePublishers();

            return addTestPublishers(samplePublisherData)
                    .then(function getPublishersFromDb() {
                        return dataService.getAllPublishers();
                    }).then(function verifyPublishers(models) {
                        assert.isTrue(models.length === 3, 'Length was: ' + models.length);
                    });
        });

        it('will create nodes for all valid books', function testCreateMultipleNodes() {

            var samplePublisherData = require('./fakes/publisherData.js').createManyFakePublishers();

            return dataService.savePublisherList({ list: samplePublisherData })
                    .then(function finishedSaving() {
                        return dataService.getAllPublishers();
                    }).then(function verify(models) {
                        assert.isTrue(models.length === 3, 'length was: ' + models.length);
                    });
        });
    });
*/
    describe('when dealing with a single book', function testSingleBook() {

        beforeEach(function beforeSavingBookTests() {
            return neo4jManager.clearNeo4j();
        });

        it('should return an error when saving a book that is not truthy', function test(done) {
            return dataService.saveBook(null)
                        .then(function successfulSave() {
                            throw new Error('Book should not have saved');
                            done();
                        }, function failedSave(err) {
                            assert.strictEqual(err.message, 'Book is required');
                            done();
                        });
        });

        it('should return an error when saving a book whose name is not truthy', function test(done) {
            var testData = { name: '' };

            dataService.saveBook(testData)
                .then(function successfulSave() {
                    throw new Error('Book should not have saved');
                    done();
                }, function failedSave(err) {
                    assert.strictEqual(err.message, 'Book name is required');
                    done();
                });
        });

    });
/*
    describe('saving a publisher (NEEDS REVIEWED)', function savePublisher() {
        it('should save a new publisher', function test() {
            var testData = publisherFactory.createPublisher(
                TEST_NAME,
                TEST_WEBSITE,
                TEST_CODE,
                TEST_ISACTIVE,
                TEST_DESCRIPTION
            );

            return dataService.savePublisher(testData)
                    .then(function successfulSave(node) {
                        assert.ok(node);
                        assert.strictEqual(node.name, TEST_NAME);
                        assert.strictEqual(node.webSite, TEST_WEBSITE);
                        assert.strictEqual(node.code, TEST_CODE);
                        assert.strictEqual(node.isActive, TEST_ISACTIVE);
                        assert.strictEqual(node.description, TEST_DESCRIPTION);
                    });
        });

        it('should update an existing publisher', function test() {
            var testData = require('./fakes/publisherData.js').createOneFakePublisher();

            return dataService.savePublisher(testData[0])
                        .then(function successfulSave() {
                            var pub = publisherFactory.createPublisher(testData[0].name,
                                                                       testData[0].webSite,
                                                                       testData[0].code,
                                                                       testData[0].isActive,
                                                                       TEST_DESCRIPTION2);

                            return dataService.savePublisher(pub);
                        }).then(function getAllPublishersToVerify() {
                            return dataService.getAllPublishers();
                        }).then(function verify(models) {
                            assert.isTrue(models.length === 1, 'Length was: ' + models.length);

                            assert.strictEqual(models[0].name, testData[0].name);
                            assert.strictEqual(models[0].webSite, testData[0].webSite);
                            assert.strictEqual(models[0].code, testData[0].code);
                            assert.strictEqual(models[0].isActive, testData[0].isActive);
                            assert.strictEqual(models[0].description, TEST_DESCRIPTION2);
                        });
        });
    });

    describe('getting a publisher by name (NEEDS REVIEWED)', function describe() {

        var samplePublisherData = require('./fakes/publisherData.js').createOneFakePublisher();

        beforeEach(function beforeGettingPublisherByName() {
            return neo4jManager.clearNeo4j()
                    .then(function successfullyCleared() {
                        return addTestPublishers(samplePublisherData);
                    });
        });

        it('should return an error if publisher.name is not truthy', function test() {
            return dataService.getPublisher('')
                .then(function getSucceeded() {
                    throw new Error('Publisher should not have been retrieved');
                }, function getFailed(err) {
                    assert.strictEqual(err.message, 'Publisher Name is required');
                });
        });

        it('should get a matching publisher', function test() {
            return dataService.getPublisher('Fantasy Flight Games')
                .then(function verify(model) {
                    assert.ok(model);
                    assert.isTrue(model.name === 'Fantasy Flight Games');
                });
        });
    });

*/
});
