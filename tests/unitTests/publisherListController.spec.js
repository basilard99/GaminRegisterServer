'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');

var CUT_PATH = '../../lib/controllers/publisherListController.js';

describe('The Publisher List Controller behaves as follows --', function specifyPublisherListBehaviors() {

    describe('When the system GETs a Publisher List --', function specifyGet() {

        it('will return a 200 Status Code and the correct Publisher List when one exists', function checkSuccessful() { //eslint-disable-line max-len

			var samplePublisherData = require('./fakes/publisherData.js').createFakePublisherData();
            var sampleResource = {
                list: [
                    { name: 'Fantasy Flight Games', uri: 'publisherList/FFG' },
                    { name: 'Wizards of the Coast', uri: 'publisherList/WOTC' },
                    { name: 'Pinnacle Entertainment Group', uri: 'publisherList/PEG' }
                ]
            };

			var dataService = {
				getAllPublishers: function mock() {
					return new Promise(function mockPromise(resolve) {
						resolve(samplePublisherData);
					});
				}
			};

			var req = {
				body: {}
			};

			var res = {
				status: sinon.spy(),
				json: sinon.spy(),
				send: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.get(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(
                    res.status.calledWith(200),
                    'Unexpected status code'
                );
                assert.isTrue(
                    res.json.calledWith(sampleResource),
                    'Unexpected response: ' + res.json.args[0][0]
                );
                assert.isTrue(res.json.calledOnce);

            });
        });

        it('will return a 404 if no Publisher List is found', function checkNoPublisherList() {

			var sampleEmptyPublisherData = require('./fakes/publisherData.js').createEmptyFakePublisherData();

			var dataService = {
				getAllPublishers: function mock() {
					return new Promise(function mockPromise(resolve) {
						resolve(sampleEmptyPublisherData);
					});
				}
			};

			var req = {
				body: {}
			};

			var res = {
				status: sinon.spy(),
				send: sinon.spy(),
                json: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.get(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(
                    res.status.calledWith(404),
                    'Unexpected status code'
                );
                assert.isTrue(res.send.calledOnce);
            }, 1500);
        });
    });

    describe('When the system PUTs a Publisher List --', function specifyPut() {

        it('will return a 201 Status Code and the correct URI after put', function checkSuccessful(done) {
            var dataService = {
                savePublisherList: function mock() {
					return new Promise(function mockPromise(resolve) {
						resolve();
					});
                }
            };

			var req = {
				body: {
                    list: [
                           { name: 'TestName1' },
                           { name: 'TestName2' },
                           { name: 'TestName3' }
                        ]
                }
			};

			var res = {
				status: sinon.spy(),
				json: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.put(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(
                    res.status.calledWith(201),
                    'Unexpected status code: ' + res.status.args[0]
                );

                assert.isTrue(
                    res.json.calledWith({ uri: 'publisherList/' }),
                    'Unexpected response: ' + res.json.args[0][0]
                );

                assert.isTrue(res.json.calledOnce);
                done();
            }, 1000);
        });

        it('will return a 500 Status Code if put fails', function checkSuccessful(done) {
            var dataService = {
                savePublisherList: function mock() {
					return new Promise(function mockPromise(resolve, reject) {
						reject('Test Error');
					});
                }
            };

			var req = {
				body: {
                    list: [
                           { name: 'TestName1' },
                           { name: 'TestName2' },
                           { name: 'TestName3' }
                        ]
                }
			};

			var res = {
				status: sinon.spy(),
				json: sinon.spy()
			};

			var cut = require(CUT_PATH)(dataService);
			cut.put(req, res);

            setTimeout(function timeoutExceeded() {
                assert.isTrue(
                    res.status.calledWith(500),
                    'Unexpected status code: ' + res.status.args[0]
                );
                done();
            }, 1000);
        });

    });

});
