var assert = require('chai').assert;
var db = require('seraph')({name: 'neo4j', pass: 'pass'});
var dataService = require('../lib/dataService.js').create(db);
var publisherFactory = require('../lib/publisher.js');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';

var clearNeo = function(done) {
	db.query('MATCH (n) DELETE (n)', function(err, result) {
		done();
	});
};

var addTestPublisher = function(done) {
	db.query("CREATE (n:Publisher " +
			"{ name: '" + TEST_NAME + "', " + 
			"webSite: '" + TEST_WEBSITE + "', " +
			"code: '" + TEST_CODE + "', " +
			"isActive: '" + TEST_ISACTIVE + "', " +
			"description: '" + TEST_DESCRIPTION + "'})", function(err, result) {
		if (err) throw err;
		done();
	});	
}

describe('Data Service Tests', function() {
	
	describe('saving a publisher', function() {
		
		before(function(done) {
			clearNeo(function() { done(); })
		});
		
		it('should save a publisher', function(done) {
			
			var pub = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE, TEST_DESCRIPTION);
			dataService.savePublisher(pub, function(node) {
				assert.ok(node);
				done();
			});			
			
		});
	});
	
	describe('getting all publishers', function() {
		
		before(function(done) {
			clearNeo(function() { 
				addTestPublisher(function() {
					done();
				});
			});
		});
		
		it('should get all publishers', function(done) {
			
			dataService.getAllPublishers(function(models) {
				
				assert.isTrue(models.length > 0);
				assert.isTrue(models[0].name === TEST_NAME);
				done();
				
			});
		});
		
	});
	
	describe('getting a publisher by name', function() {
		
		before(function(done) {
			clearNeo(function() {
				addTestPublisher(function() {
					done();
				});
			});
		});
		
		it ('should get a matching publisher', function(done) {
			
			dataService.getPublisher(TEST_NAME, function(model) {
				
				assert.ok(model);
				assert.isTrue(model.name === TEST_NAME);
				
				done();
			});
		});
	});
})