var assert = require('chai').assert;
var publisherFactory = require('../lib/publisher.js');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';

describe('Publisher Class Tests', function() {
	describe('name', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher();
			
			assert.notOk(cut.getName());
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME);
			
			assert.strictEqual(cut.getName(), TEST_NAME);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher();
			assert.notOk(cut.getName(), 'default is other than undefined');
			
			cut.setName(TEST_NAME);
			assert.strictEqual(cut.getName(), TEST_NAME);			
		});
	});	
	
	describe('webSite', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher();
			
			assert.notOk(cut.getWebSite());
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE);
			
			assert.strictEqual(cut.getWebSite(), TEST_WEBSITE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher();
			assert.notOk(cut.getWebSite(), 'default is other than undefined');
			
			cut.setWebSite(TEST_WEBSITE);
			assert.strictEqual(cut.getWebSite(), TEST_WEBSITE);			
		});
	});	
	
	describe('code', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher();
			
			assert.notOk(cut.getCode());
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE);
			
			assert.strictEqual(cut.getCode(), TEST_CODE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher();
			assert.notOk(cut.getCode(), 'default is other than undefined');
			
			cut.setCode(TEST_CODE);
			assert.strictEqual(cut.getCode(), TEST_CODE);			
		});
	});	
	
	describe('isActive', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher();
			
			assert.notOk(cut.getIsActive());
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE);
			
			assert.strictEqual(cut.getIsActive(), TEST_ISACTIVE);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher();
			assert.notOk(cut.getIsActive(), 'default is other than undefined');
			
			cut.setIsActive(TEST_ISACTIVE);
			assert.strictEqual(cut.getIsActive(), TEST_ISACTIVE);			
		});
	});	
	
	describe('description', function() {
		it('should default to undefined', function() {
			var cut = publisherFactory.createPublisher();
			
			assert.notOk(cut.getDescription());
		});
		
		it('should be what the ctor passed in', function() {
			var cut = publisherFactory.createPublisher(TEST_NAME, TEST_WEBSITE, TEST_CODE, TEST_ISACTIVE, TEST_DESCRIPTION);
			
			assert.strictEqual(cut.getDescription(), TEST_DESCRIPTION);
		});
		
		it('should be what the property was set to', function() {
			var cut = publisherFactory.createPublisher();
			assert.notOk(cut.getDescription(), 'default is other than undefined');
			
			cut.setDescription(TEST_DESCRIPTION);
			assert.strictEqual(cut.getDescription(), TEST_DESCRIPTION);			
		});
	});
});
