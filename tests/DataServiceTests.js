var assert = require('chai').assert;
var db = require('seraph')({name: 'neo4j', pass: 'pass'});
var dataService = require('../lib/dataService.js').create(db);
var publisherFactory = require('../lib/publisher.js');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';

describe('Data Service Tests', function() {
	describe('saving a publisher', function() {
		it('should save a publisher', function(done) {
			
			var pub = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE, TEST_DESCRIPTION);
			var node = dataService.savePublisher(pub, function(node) {
				assert.ok(node);
				done();
			});			
		})
	})
})