'use strict';

var should = require('should');
var app = require('../../app.js');
var request = require('supertest')(app);

var clearNeo = function clear(done) {
	var db = require('seraph')({
		server: 'http://localhost:7474',
		name: 'neo4j',
		pass: 'pass'
	});
	db.query('MATCH (n) DELETE (n)', function deleteAll() {
		done();
	});
};

describe('Publisher Integration Tests', function describe() {

	beforeEach(function beforeEach(done) {
		clearNeo(function clear() {
			done();
		});
	});

	it('Should allow a publisher to be saved and return a publisher id',
		function test(done) {
			var testData = { name: 'ITPublisher' };

			request
				.post('/api/publishers')
				.send(testData)
				.expect(200)
				.end(function end(err, results) {
					results.body.should.have.property('id');
					done();
				});
		}
	);

	it('should allow a single publisher to be retrieved', function test(done) {
		var testData = { name: 'ITPublisher' };

		request
			.post('/api/publishers')
			.send(testData)
			.end(function end(err) {
				if (err) {
					should.fail('Unable to post publisher: ' + err.message);
					done();
				}

				request
					.get('/api/publishers/' + testData.name)
					.expect(200)
					.end(function end(err, results) {
						if (err) {
							should.fail(err.message);
							done();
						}

						results.body.should.have.property('name');
						should.equal(results.body.name, testData.name);
						done();
					});
			});
	});

	it('should get all publishers', function test(done) {
		var testData = { name: 'ITPublisher' };
		var testData2 = { name: 'ITPublisher2' };

		request
			.post('/api/publishers')
			.send(testData)
			.end(function end(err) {

				if (err) {
					should.fail('Unable to post publisher: ' + err.message);
					done();
				}

				request.post('/api/publishers')
					.send(testData2)
					.end(function end(err) {

						if (err) {
							should.fail('Unable to post publisher: '
										+ err.message);
							done();
						}

						request
							.get('/api/publishers/')
							.expect(200)
							.end(function end(err, results) {
								if (err) {
									should.fail(err.message);
									done();
								}
								should.equal(results.body.list.length, 2);
								done();
							});
					});
			});
	});

	it('should allow updating of a publisher via put', function test(done) {
		var testData = { name: 'ITPublisher', webSite: 'TestWebSite' };

		request
			.post('/api/publishers')
			.send(testData)
			.end(function end(err, results) {
				results;
				testData.webSite = 'TestWebSiteNew';
				request
					.put('/api/publishers/' + testData.name)
					.send(testData)
					.expect(201)
					.end(function end(err, results) {
						results;
						if (err) {
							should.fail(err.message);
						}
						done();
					});
			});
	});

	it('should allow updating of a publisher via patch', function test(done) {
		var testData = { name: 'ITPublisher', webSite: 'TestWebSite' };

		request
			.patch('/api/publishers')
			.send(testData)
			.end(function end(err, results) {
				results;
				testData.webSite = 'TestWebSiteNew';
				request
					.put('/api/publishers/' + testData.name)
					.send(testData)
					.expect(201)
					.end(function end(err, results) {
						results;
						if (err) {
							should.fail(err.message);
						}
						done();
					});
			});
	});
});

after(function after(done) {
	app.server.close();
	console.log('shutting down Express');
	done();
});
