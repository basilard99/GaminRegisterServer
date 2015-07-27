var assert = require('chai').assert;
var publisherFactory = require('../../lib/models/publisher.js');

var TEST_NAME = 'TestName';
var TEST_NAME2 = 'TestName2';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';

describe('Publisher Factory Tests', function() {
	it('should throw an exception if name is undefined', function() {
		assert.throw(function() { publisherFactory.createPublisher(undefined) }, 'Name is undefined');
	});
	
	it ('should create an object matching the creation parameters', function() {
		var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE, TEST_DESCRIPTION);

		assert.strictEqual(cut.name, TEST_NAME);
		assert.strictEqual(cut.webSite, TEST_WEBSITE);
		assert.strictEqual(cut.code, TEST_CODE);
		assert.strictEqual(cut.isActive, TEST_ISACTIVE);
		assert.strictEqual(cut.description, TEST_DESCRIPTION);		
	});	
});

describe('Publisher Class Tests', function() {
	describe('name', function() {		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.strictEqual(cut.name, TEST_NAME);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			cut.name = TEST_NAME2;
			assert.strictEqual(cut.name, TEST_NAME2);			
		});
	});	
	
	describe('webSite', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.notOk(cut.webSite);
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE);
			
			assert.strictEqual(cut.webSite, TEST_WEBSITE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			assert.notOk(cut.webSite, 'default is other than undefined');
			
			cut.webSite = TEST_WEBSITE;
			assert.strictEqual(cut.webSite, TEST_WEBSITE);			
		});
	});	
	
	describe('code', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.notOk(cut.code);
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE);
			
			assert.strictEqual(cut.code, TEST_CODE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			assert.notOk(cut.code, 'default is other than undefined');
			
			cut.code = TEST_CODE;
			assert.strictEqual(cut.code, TEST_CODE);			
		});
	});	
	
	describe('isActive', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.notOk(cut.isActive);
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE);
			
			assert.strictEqual(cut.isActive, TEST_ISACTIVE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			assert.notOk(cut.isActive, 'default is other than undefined');
			
			cut.isActive = TEST_ISACTIVE;
			assert.strictEqual(cut.isActive, TEST_ISACTIVE);			
		});
	});	
	
	describe('description', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.notOk(cut.description);
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE, TEST_DESCRIPTION);
			
			assert.strictEqual(cut.description, TEST_DESCRIPTION);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			assert.notOk(cut.description, 'default is other than undefined');
						
			cut.description = TEST_DESCRIPTION;
			assert.strictEqual(cut.description, TEST_DESCRIPTION);			
		});
	});
});
