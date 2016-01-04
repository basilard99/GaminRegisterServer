'use strict';

var assert = require('chai').assert;
var db = require('seraph')({ name: 'neo4j', pass: 'pass' });
var publisherFactory = require('../../lib/models/publisher.js');
var dataService = require('../../lib/models/dataService.js').create(db, publisherFactory);

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'TestWebSite';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = 'false';
var TEST_DESCRIPTION = 'TestDescription';
var TEST_DESCRIPTION2 = 'TestDescription2';

var addNonPublisherNode = function addNonPublisher(done) {

	var dataToSave =  { name: 'NotImportant',
						someValue: '22' };

	db.save(dataToSave, 'Dummy', function saveDone(err) {
		if (err) {
			throw err;
		}

		done();
	});

};

var clearNeo4j = function clear(done) {
	db.query('MATCH (n) DELETE (n)', function execute() {
		done();
	});
};

var addSinglePublisherNode = function addSingleNode(data) {

	var dataToSave =  { name: data.name,
						code: data.code,
						webSite: data.webSite,
						isActive: data.isActive,
						description: data.description };
	db.save(dataToSave, 'Publisher', function queryDone(err) {
		if (err) {
			throw err;
		}
	});

};

var addTestPublishers = function add(samplePublisherData, done) {

	for (var i = 0; i < samplePublisherData.length; i++) {
		addSinglePublisherNode(samplePublisherData[i], function doneAdding() {});
    }

	setTimeout(function timeoutExceeded() {
		done();
	}, 1500);
};

describe('The Data Service will behave as follows --', function dataServiceTests() {

	describe('when handling publisher lists', function publisherList() {
		this.timeout(10000);

		before(function before(done) {
			clearNeo4j(function doneClearing() {
				addNonPublisherNode(function doneAddingNonPublisher() {
					done();
				});
			});
		});

		it('will get only publisher nodes', function test(done) {

			var samplePublisherData = require('./fakes/publisherData.js').createManyFakePublishers();
			addTestPublishers(samplePublisherData, function doneAddingTestPublishers() {

				dataService.getAllPublishers(function verify(err, models) {

					// There are 3 test publishers created, plus one dummy node.
					assert.isTrue(models.length === 3, 'length was: ' + models.length);
					done();

				});
			});

		});

		it('will create nodes for all valid publishers', function testCreateMultipleNodes(done) {

			var samplePublisherData = require('./fakes/publisherData.js').createManyFakePublishers();

			dataService.savePublisherList({ list: samplePublisherData}, function finishedSaving(err) {
				setTimeout(function timeoutExceeded() {
					assert.isUndefined(err);

					dataService.getAllPublishers(function verify(err, models) {
						// There are 3 test publishers created, plus one dummy node.
						assert.isTrue(models.length === 3, 'length was: ' + models.length);
						done();
					});
				}, 1500);
			});
		});
	});

	describe('saving a publisher (NEEDS REVIEWED)', function savePublisher() {

		before(function before(done) {
			clearNeo4j(function clear() {
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

	describe('getting a publisher by name (NEEDS REVIEWED)', function describe() {

		var samplePublisherData = require('./fakes/publisherData.js').createOneFakePublisher();
		before(function before(done) {
			clearNeo4j(function clear() {
				addTestPublishers(samplePublisherData, function cb() {
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

		it('should get a matching publisher', function test(done) {

			dataService.getPublisher('Fantasy Flight Games', function verify(err, model) {

				assert.ok(model);
				assert.isTrue(model.name === 'Fantasy Flight Games');

				done();
			});
		});
	});

});
