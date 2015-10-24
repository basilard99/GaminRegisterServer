'use strict';

var assert = require('chai').assert;
var db = require('seraph')({ name: 'neo4j', pass: 'pass' });
var dataService = require('../../lib/models/dataService.js').create(db);
var publisherFactory = require('../../lib/models/publisher.js');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';
var TEST_DESCRIPTION2 = 'TestDescription2';

var clearNeo = function clear(done) {
	db.query('MATCH (n) DELETE (n)', function execute(err) {
		done();
	});
};

var addTestPublisher = function setup(done) {
	db.query('CREATE (n:Publisher ' +
			'{ name: \'' + TEST_NAME + '\', ' +
			'webSite: \'' + TEST_WEBSITE + '\', ' +
			'code: \'' + TEST_CODE + '\', ' +
			'isActive: \'' + TEST_ISACTIVE + '\', ' +
			'description: \'' + TEST_DESCRIPTION + '\'})',
		function cb(err) {
			if (err) {
				throw err;
			}

			done();
	});
};

describe('Data Service Tests', function dataServiceTests() {

	describe('saving a publisher', function savePublisher() {

		before(function before(done) {
			clearNeo(function clear() {
				done();
			});
		});

		it('should return an error if publisher is not truthy',
			function test(done) {
				dataService.savePublisher(null, function verify(err, node) {
					assert.strictEqual(err.message, 'Publisher is required');
					assert.notOk(node);
					done();
				}
			);
		});

		it('should return an error if publisher.name is not truthy',
			function test(done) {
				var testData = { name: '' };

				dataService.savePublisher(testData,
					function verify(err, node) {
						assert.strictEqual(
							err.message,
							'Publisher Name is required'
						);
						assert.notOk(node);
						done();
					}
			);
		});

		it('should save a new publisher', function test(done) {

			var pub = publisherFactory.createPublisher(
				TEST_NAME,
				TEST_WEBSITE,
				TEST_CODE,
				TEST_ISACTIVE,
				TEST_DESCRIPTION
			);
			dataService.savePublisher(pub, function verify(err, node) {

				assert.ok(node);

				assert.strictEqual(node.name, TEST_NAME);
				assert.strictEqual(node.webSite, TEST_WEBSITE);
				assert.strictEqual(node.code, TEST_CODE);
				assert.strictEqual(node.isActive, TEST_ISACTIVE);
				assert.strictEqual(node.description, TEST_DESCRIPTION);

				done();
			});

		});

		it ('should update an existing publisher', function test(done) {

			dataService.getAllPublishers(function setup(err, models) {
				var publisherCount = models.length;

				var pub = publisherFactory.createPublisher(
					TEST_NAME,
					TEST_WEBSITE,
					TEST_CODE,
					TEST_ISACTIVE,
					TEST_DESCRIPTION2
				);
				dataService.savePublisher(pub, function verify(err, node) {

					assert.ok(node);

					assert.strictEqual(node.name, TEST_NAME);
					assert.strictEqual(node.webSite, TEST_WEBSITE);
					assert.strictEqual(node.code, TEST_CODE);
					assert.strictEqual(node.isActive, TEST_ISACTIVE);
					assert.strictEqual(node.description, TEST_DESCRIPTION2);

					dataService.getAllPublishers(function verify(err, models) {
						assert.strictEqual(models.length, publisherCount);
						done();
					});
				});
			});
		});
	});

	describe('getting all publishers', function describe() {

		before(function before(done) {
			clearNeo(function clear() {
				addTestPublisher(function cb() {
					done();
				});
			});
		});

		it('should get all publishers', function test(done) {

			dataService.getAllPublishers(function verify(err, models) {

				assert.isTrue(models.length > 0);
				assert.isTrue(models[0].name === TEST_NAME);
				done();

			});
		});
	});

	describe('getting a publisher by name', function describe() {

		before(function before(done) {
			clearNeo(function clear() {
				addTestPublisher(function cb() {
					done();
				});
			});
		});

		it('should return an error if publisher.name is not truthy',
			function test(done) {
				dataService.getPublisher('', function verify(err, model) {
					assert.strictEqual(
						err.message,
						'Publisher Name is required'
					);
					assert.notOk(model);
					done();
				}
			);
		});

		it ('should get a matching publisher', function test(done) {

			dataService.getPublisher(TEST_NAME, function verify(err, model) {

				assert.ok(model);
				assert.isTrue(model.name === TEST_NAME);

				done();
			});
		});
	});
});
