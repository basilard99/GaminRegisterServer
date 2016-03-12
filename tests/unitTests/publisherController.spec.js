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
    describe('Post Publisher', function postPublisher() {

        it('should fail with a 400 if invalid publisher information is provided', function test() {
            var dataService = {};

            var req = {
                body: {}
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.post(req, res);

            assert.isTrue(res.status.calledWith(400), 'Unexpected status code');
            assert.isTrue(res.send.calledWith('The name value must be defined and have a value'),
                                              'Unexpected response');
            assert.isTrue(res.send.calledOnce);
        });

        it('should return 500 if the model cannot be saved', function test() {
            var dataService = {
                savePublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('Doesn\'t matter'));
                    });
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

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);

            return publisherController.post(req, res);

            assert.isTrue(res.status.calledWith(500), 'Unexpected status code');
            assert.isTrue(res.send.calledWith('BI: An unknown error occurred'), 'Unexpected response');
            assert.isTrue(res.send.calledOnce, 'Send was not called once');
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

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.post(req, res);

            setTimeout(function waitForResponse() {
                assert.isTrue(res.status.calledWith(201), 'Unexpected status code');
                assert.isTrue(res.send.calledWith(testModel), 'Unexpected response');
                assert.isTrue(res.send.calledOnce);
            }, 1500);
        });

    });

    describe('Get Publisher', function describe() {

        it ('should return a 200 status and found model', function test() {

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

            var res = {
                status: sinon.spy(),
                json: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.getSingle(req, res);

            setTimeout(function waitForResponse() {
                assert.isTrue(res.status.calledWith(200), 'Unexpected status code');
                assert.isTrue(res.json.calledWith(testModel), 'Unexpected response: ' + res.json.args[0][0]);
                assert.isTrue(res.json.calledOnce);
            }, 1500);

        });

        it ('should return a 500 status if service failed', function test() {

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

            var res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.getSingle(req, res);

            setTimeout(function responseReceived() {
                assert.isTrue(res.status.calledWith(500), 'Unexpected status code');
                assert.isTrue(res.send.calledWith('BI: An unknown error occurred'), 'Unexpected response');
                assert.isFalse(res.json.called);
            }, 1500);
        });
    });

    describe('Put Publisher', function describe() {

        it ('should fail with a 400 if invalid publisher information is provided', function test() {
            var dataService = {};

            var req = {
                body: {}
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.put(req, res);

            assert.isTrue(res.status.calledWith(400), 'Unexpected status code');
            assert.isTrue(res.send.calledWith('The name value must be defined and have a value'),
                                              'Unexpected response');
            assert.isTrue(res.send.calledOnce);
        });

        it ('should return 500 if the model cannot be saved', function test() {
            var dataService = {
                savePublisher: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('Doesn\'t matter'));
                    });
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

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.put(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(res.status.calledWith(500),'Unexpected status code');
                assert.isTrue(res.send.calledWith('BI: An unknown error occurred'),'Unexpected response');
                assert.isTrue(res.send.calledOnce);
            }, 1500);
        });

        it ('should successfully save the model', function test() {
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

            var req = {
                body: {
                    name: TEST_NAME,
                    webSite: TEST_WEBSITE,
                    code: TEST_CODE,
                    isActive: TEST_ISACTIVE,
                    description: TEST_DESCRIPTION
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.put(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(res.status.calledWith(201), 'Unexpected status code');
                assert.isTrue(res.send.calledWith(testModel), 'Unexpected response');
                assert.isTrue(res.send.calledOnce);
            }, 1500);
        });
    });

    describe('Patch Publisher', function describe() {

        it ('should fail with a 400 if invalid publisher information is provided', function test() {
            var dataService = {};

            var req = {
                body: {}
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.patch(req, res);

            assert.isTrue(res.status.calledWith(400),'Unexpected status code');
            assert.isTrue(res.send.calledWith('The name value must be defined and have a value'),
                                              'Unexpected response');
            assert.isTrue(res.send.calledOnce);
        });

        it ('should return 500 if the model cannot be saved', function test() {
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

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.patch(req, res);

            assert.isTrue(res.status.calledWith(500), 'Unexpected status code');
            assert.isTrue(res.send.calledWith('BI: An unknown error occurred'), 'Unexpected response');
            assert.isTrue(res.send.calledOnce);
        });

        it ('should successfully save the model', function test() {
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

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            var publisherController = require(CONTROLLER_PATH)(dataService);
            publisherController.patch(req, res);

            assert.isTrue(res.status.calledWith(201), 'Unexpected status code');
            assert.isTrue(res.send.calledWith(testModel), 'Unexpected response');
            assert.isTrue(res.send.calledOnce);
        });
    });
});
