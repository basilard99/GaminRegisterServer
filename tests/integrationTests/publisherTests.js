'use strict';

var should = require('should');
var app = require('../../app.js');
var request = require('supertest')(app);
var neo4jManager = require('../.././neo4jFunctions').create();

describe('Publisher Integration Tests', function describe() {

	beforeEach(function beforeEach(done) {
		neo4jManager.clearNeo4j()
			.then(function neo4jClearedSuccessfully() {
				done();
			}, function neo4jFailedToClear(err) {
				console.log(err);
				done();
			});
	});

	it('Should allow a publisher to be saved and return a publisher id', function test(done) {
		var testData = {
			name: 'Fantasy Flight Games',
			webSite: 'http://www.fantasyflightgames.com',
			code: 'FFG',
			isActive: true
		};

		request
			.post('/api/publisherList')
			.send(testData)
			.expect(200)
			.end(function end(err, results) {
				results.body.should.have.property('id');
				done();
			});
	});

	it('should allow a single publisher to be retrieved', function test(done) {
		var testData = {
			name: 'Fantasy Flight Games',
			webSite: 'http://www.fantasyflightgames.com',
			code: 'FFG',
			isActive: true
		};

		request
			.post('/api/publisherList')
			.send(testData)
			.end(function end(err) {
				if (err) {
					should.fail('Unable to post publisher: ' + err.message);
					done();
				}

				request
					.get('/api/publisherList/' + testData.name)
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
		var testData = {
			name: 'Fantasy Flight Games',
			webSite: 'http://www.fantasyflightgames.com',
			code: 'FFG',
			isActive: true
		};
		var testData2 = {
			name: 'Wizards of the Coast',
			webSite: 'http://www.wotc.com',
			code: 'WOTC',
			isActive: true };

		request
			.post('/api/publisherList')
			.send(testData)
			.end(function end(err) {

				if (err) {
					should.fail('Unable to post publisher: ' + err.message);
					done();
				}

				request.post('/api/publisherList')
					.send(testData2)
					.end(function end(err) {

						if (err) {
							should.fail('Unable to post publisher: '
										+ err.message);
							done();
						}

						request
							.get('/api/publisherList')
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
		var testData = {
			name: 'Fantasy Flight Games',
			webSite: 'http://www.fantasyflightgames.com',
			code: 'FFG',
			isActive: true
		};

		request
			.post('/api/publisherList')
			.send(testData)
			.end(function end() {
				testData.webSite = 'www.TestWebSiteNew.com';
				request
					.put('/api/publisherList/' + testData.name)
					.send(testData)
					.expect(201)
					.end(function end(err) {
						if (err) {
							should.fail(err.message);
						}
						done();
					});
			});
	});

	it('should allow updating of a publisher via patch', function test(done) {
		var testData = {
			name: 'Fantasy Flight Games',
			webSite: 'http://www.fantasyflightgames.com',
			code: 'FFG',
			isActive: true
		};

		request
			.patch('/api/publishers')
			.send(testData)
			.end(function end() {
				testData.webSite = 'www.TestWebSiteNew.com';
				request
					.put('/api/publisherList/' + testData.name)
					.send(testData)
					.expect(201)
					.end(function end(err) {
						if (err) {
							should.fail(err.message);
						}
						done();
					});
			});
	});

	it('should allow putting a publisher list', function test(done) {
		var testData = { list: [
								{
									name: 'Fantasy Flight Games',
									webSite: 'http://www.fantasyflightgames.com',
									code: 'FFG',
									isActive: true
								},
								{
									name: 'Wizards of the Coast',
									webSite: 'http://www.wotc.com',
									code: 'WOTC',
									isActive: true
								}
                               ]
		};

		request
			.put('/api/publisherList')
			.send(testData)
			.expect(201)
			.end(function end() {
				request
					.get('/api/publisherList')
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

after(function after(done) {
	app.server.close();
	console.log('shutting down Express');
	done();
});
