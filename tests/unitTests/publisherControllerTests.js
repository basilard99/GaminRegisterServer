'use strict';

var publisherFactory = require('../../lib/models/publisher.js');
var assert = require('chai').assert;
var sinon = require('sinon');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';

var CONTROLLER_PATH = '../../lib/controllers/publisherController.js';

describe('Publisher Controller Tests:', function publisherController() {

	describe('Post Publisher', function postPublisher() {

		it ('should fail if no name is part of the body', function test() {
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

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});

		it ('should fail if the name is empty', function test() {
			var dataService = {};

			var req = {
				body: { name: '' }
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};

			var publisherController = require(CONTROLLER_PATH)(dataService);
			publisherController.post(req, res);

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
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
			publisherController.post(req, res);

			assert.isTrue(
				res.status.calledWith(500),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('An unknown error occurred'),
				'Unexpected response'
			);
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
			publisherController.post(req, res);

			assert.isTrue(
				res.status.calledWith(201),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith(testModel),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});

	});

	describe('Get Publisher', function describe() {

		it ('should return a 200 status and found model', function test() {

			var testModel = { someValue: 'someValue' };
			var dataService = {
				getPublisher: function mock(publisherName, callback) {
					callback(null, testModel);
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

			assert.isTrue(
				res.status.calledWith(200),
				'Unexpected status code'
			);
			assert.isTrue(
				res.json.calledWith(testModel),
				'Unexpected response: ' + res.json.args[0][0]
			);
			assert.isTrue(res.json.calledOnce);

		});

		it ('should return a 500 status if service failed', function test() {

			var dataService = {
				getPublisher: function mock(publisherName, callback) {
					callback(new Error('No matter', null));
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

			assert.isTrue(
				res.status.calledWith(500),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('An unknown error occurred'),
				'Unexpected response'
			);
			assert.isFalse(res.json.called);

		});
	});

	describe('Put Publisher', function describe() {

		it ('should fail if no name is part of the body', function test() {
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

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});

		it ('should fail if the name is empty', function test() {
			var dataService = {};

			var req = {
				body: { name: '' }
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};

			var publisherController = require(CONTROLLER_PATH)(dataService);
			publisherController.put(req, res);

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
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
			publisherController.put(req, res);

			assert.isTrue(
				res.status.calledWith(500),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('An unknown error occurred'),
				'Unexpected response'
			);
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
			publisherController.put(req, res);

			assert.isTrue(
				res.status.calledWith(201),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith(testModel),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});

	});

	describe('Patch Publisher', function describe() {

		it ('should fail if no name is part of the body', function test() {
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

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});

		it ('should fail if the name is empty', function test() {
			var dataService = {};

			var req = {
				body: { name: '' }
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};

			var publisherController = require(CONTROLLER_PATH)(dataService);
			publisherController.patch(req, res);

			assert.isTrue(
				res.status.calledWith(400),
				'Unexpected status code'
			);
			assert.isTrue(
				res.send.calledWith('Name is required'),
				'Unexpected response'
			);
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

			assert.isTrue(
				res.status.calledWith(500),
				'Unexpected status code');
			assert.isTrue(
				res.send.calledWith('An unknown error occurred'),
				'Unexpected response'
			);
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

			assert.isTrue(
				res.status.calledWith(201),
				'Unexpected status code');
			assert.isTrue(
				res.send.calledWith(testModel),
				'Unexpected response'
			);
			assert.isTrue(res.send.calledOnce);
		});
	});
});
