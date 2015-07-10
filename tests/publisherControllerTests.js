var assert = require('chai').assert;
var sinon = require('sinon');

describe('Publisher controller tests:', function() {
	
	describe('Post', function() {
		
		it ('should fail if no name is part of the body', function() {
			var dataService = {
				savePublisher: function(publisher, callback) {
					callback('hi');
				}
			};
			
			var req = {
				body: {}
			};
			
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			var publisherController = require('../lib/controllers/publisherController.js')(dataService);
			publisherController.post(req, res);
			
			assert.isTrue(res.status.calledWith(400), 'Unexpected status code');
			assert.isTrue(res.send.calledWith('Name is required'), 'Unexpected response');
		});		
		
		it ('should fail if the name is empty', function() {
			var dataService = {
				savePublisher: function(publisher, callback) {
					callback('hi');
				}
			};
			
			var req = {
				body: { name: '' }
			};
			
			var res = {
				status: sinon.spy(),
				send: sinon.spy()
			};
			
			var publisherController = require('../lib/controllers/publisherController.js')(dataService);
			publisherController.post(req, res);
			
			assert.isTrue(res.status.calledWith(400), 'Unexpected status code');
			assert.isTrue(res.send.calledWith('Name is required'), 'Unexpected response');
		});
	});
});