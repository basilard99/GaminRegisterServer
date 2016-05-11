'use strict';

var publisherFactory = require('../../lib/models/publisher.js');
var assert = require('chai').assert;
var sinon = require('sinon');
var Promise = require('bluebird');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'www.TestWebSite.com';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = false;
var TEST_DESCRIPTION = 'TestDescription';

var CONTROLLER_PATH = '../../lib/controllers/publisherController.js';

describe('Publisher Controller Tests:', function publisherControllerTests() {

    describe('When GETting Publisher', function getPublisher() {
        it('should return a 200 status and found model', function testSuccessfulCreate() {
            var testModel = { someValue: 'someValue' };
            var dataService = {
                getPublisher: function mockGetPublisher() {
                    return new Promise(function mockPromise(resolve) {
                        resolve(testModel);
                    });
                }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.get(TEST_NAME).then(function successfulGet(result) {
                assert.strictEqual(result.httpStatus, 200)
                assert.strictEqual(result.data.someValue, 'someValue');
            }).catch(function failedGet(e) {
                assert.fail('Promise rejected: ' + e.message);
            });
        });

        it('should return a 500 status if service failed', function testFailedCreate() {
            var dataService = {
                getPublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('No matter'));
                    });
                }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.get(TEST_NAME).then(function successfulGet(result) {
                assert.fail('Promise should have been rejected');
            }).catch(function failedGet(e) {
                assert.strictEqual(e.httpStatus, 500);
            });
        });
    });

    describe('When PUTting a Publisher', function putPublisher() {
        it('should fail with a 400 if invalid publisher information is provided', function testInvalidPublisher() {
            var publisherController = require(CONTROLLER_PATH).createPublisherController();

            return publisherController.put({}).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                assert.strictEqual(e.httpStatus, 400);
            });
        });

        it('should return 500 if the model cannot be saved', function testDataServiceFails() {
            var dataService = {
                savePublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('Doesn\'t matter'));
                    });
                }
            };
            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            var testData = {
                name: TEST_NAME,
                webSite: TEST_WEBSITE,
                code: TEST_CODE,
                isActive: TEST_ISACTIVE,
                description: TEST_DESCRIPTION
            };

            return publisherController.put(testData).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                assert.strictEqual(e.httpStatus, 500);
            });
        });

        it('should successfully save the model', function testSuccessfulSave() {
            var testModel = publisherFactory.createPublisher(
                TEST_NAME,
                TEST_WEBSITE,
                TEST_CODE,
                TEST_ISACTIVE,
                TEST_DESCRIPTION
            );

            var dataService = {
                savePublisher: function mock(publisher) {
                    return new Promise(function mockPromise(resolve) {
                        resolve(publisher);
                    });
                }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            var testData = {
                name: TEST_NAME,
                webSite: TEST_WEBSITE,
                code: TEST_CODE,
                isActive: TEST_ISACTIVE,
                description: TEST_DESCRIPTION
            };

            return publisherController.put(testData).then(function successfulPut(result) {
                assert.strictEqual(result.httpStatus, 201);
                assert.strictEqual(result.data.name, TEST_NAME);
                assert.strictEqual(result.data.webSite, TEST_WEBSITE);
                assert.strictEqual(result.data.code, TEST_CODE);
                assert.strictEqual(result.data.isActive, TEST_ISACTIVE);
                assert.strictEqual(result.data.description, TEST_DESCRIPTION);
            }).catch(function failedPut(e) {
                console.log(e.message);
                assert.fail('Promise was rejected: ' + e.message);
            });
        });
    });
});
