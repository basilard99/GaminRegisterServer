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

describe('Publisher Controller Tests:', function publisherController() {

    describe('When GETting Publisher', function describe() {

        it('should return a 200 status and found model', function test() {
            var testModel = { someValue: 'someValue' };
            var dataService = {
                getPublisher: function mock() {
                    return new Promise(function mockPromise(resolve) {
                        resolve(testModel);
                    });
                }
            };

            var req = {
                params: { publisherName: TEST_NAME }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.get(req).then(function successfulGet(result) {
                assert.strictEqual(result.httpStatus, 200)
                assert.strictEqual(result.data.someValue, 'someValue');
            }).catch(function failedGet(e) {
                assert.fail('Promise rejected: ' + e.message);
            });
        });

        it('should return a 500 status if service failed', function test() {

            var dataService = {
                getPublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('No matter'));
                    });
                }
            };

            var req = {
                params: { publisherName: TEST_NAME }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.get(req).then(function successfulGet(result) {
                assert.fail('Promise should have been rejected');
            }).catch(function failedGet(e) {
                assert.strictEqual(e.httpStatus, 500);
            });
        });
    });

    describe('When PUTting a Publisher', function putPublisher() {

        it('should fail with a 400 if invalid publisher information is provided', function test() {
            var publisherController = require(CONTROLLER_PATH).createPublisherController({});
            var req = {
                body: {}
            };

            return publisherController.put(req).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                assert.strictEqual(e.httpStatus, 400);
            });
        });

        it('should return 500 if the model cannot be saved', function test() {
            var dataService = {
                savePublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('Doesn\'t matter'));
                    });
                }
            };
            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            return publisherController.put(req).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                assert.strictEqual(e.httpStatus, 500);
            });
        });

        it('should successfully save the model', function test() {
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

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            return publisherController.put(req).then(function successfulPut(result) {
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

    describe('When PATCHing Publisher', function patchPublisherSuite() {

        it('should fail with a 400 if invalid publisher information is provided', function test() {
            var dataService = {};

            var req = {
                body: {}
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.patch(req).then( function successfulPath() {
                assert.fail('Promise should have been rejected');
            }).catch(function failedPatch(e) {
                assert.strictEqual(e.httpStatus, 400);
            });
        });

        it('should return 500 if the model cannot be saved', function test() {
            var dataService = {
                savePublisher: function mock(publisher, callback) {
                    callback(new Error('Doesn\'t matter'), null);
                }
            };

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.patch(req).then( function successfulPath() {
                assert.fail('Promise should have been rejected');
            }).catch(function failedPatch(e) {
                assert.strictEqual(e.httpStatus, 500);
            });
        });

        it('should successfully save the model', function test() {
            var testModel = publisherFactory.createPublisher(
                TEST_NAME,
                TEST_WEBSITE,
                TEST_CODE,
                TEST_ISACTIVE,
                TEST_DESCRIPTION
            );

            var dataService = {
                savePublisher: function mock(publisher, callback) {
                    callback(null, publisher);
                }
            };

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            var publisherController = require(CONTROLLER_PATH).createPublisherController(dataService);

            return publisherController.patch(req).then( function successfulPath(result) {
                assert.strictEqual(result.httpStatus, 201);
            }).catch(function failedPatch(e) {
                assert.fail('Promise was rejected');
            });
        });
    });
});
