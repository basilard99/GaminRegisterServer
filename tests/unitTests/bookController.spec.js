'use strict';

var assert = require('chai').assert;
var Promise = require('bluebird');
var valueTypes = require('../../lib/models/valueTypes.js');

var CONTROLLER_PATH = '../../lib/controllers/bookController.js';

var TEST_TITLE = 'Test Title';
var TEST_BOOK_CODE = '123456';
var TEST_DESCRIPTION = 'Test Description';
var TEST_COST = 19.95;
var TEST_IN_INVENTORY = true;
var TEST_IS_PDF = true;
var TEST_IS_PRINT = true;
var TEST_LOCATION = 'OneDrive';
var TEST_TYPE = valueTypes.BookTypeEnum.WarGame;

describe('Book Controller Tests: ', function bookControllorSuite() {

    describe('When PUTting a book: ', function putBookTests() {

        it('should fail with a 400 if invalid book data is provided', function testInvalidData() {
            var bookController = require(CONTROLLER_PATH).createBookController({});
            var req = {
                body: {}
            };

            return bookController.put(req).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                assert.strictEqual(e.httpStatus, 400);
            });

        });

        it('should return 500 if the model cannot be saved', function testSaveFailed() {
            var dataService = {
                saveBook: function mock() {
                    return new Promise(function mockPromise(resolve, reject) {
                        reject(new Error('Doesn\'t matter'));
                    });
                }
            };

            var req = {
                body: {
                    title: TEST_TITLE,
                    bookCode: TEST_BOOK_CODE,
                    desription: TEST_DESCRIPTION,
                    cost: TEST_COST,
                    inInventory: TEST_IN_INVENTORY,
                    isPdf: TEST_IS_PDF,
                    isPrint: TEST_IS_PRINT,
                    location: TEST_LOCATION,
                    type: TEST_TYPE
                }
            };

            var bookController = require(CONTROLLER_PATH).createBookController(dataService);

            return bookController.put(req).then(function successfulPut() {
                assert.fail('Did not get expected failure');
            }).catch(function failedPut(e) {
                console.log(e.message);
                assert.strictEqual(e.httpStatus, 500);
            });

        });

        it('should return 201 if the model is created', function testPutSuccessful() {
            var dataService = {
                saveBook: function mock() {
                    return new Promise(function mockPromise(resolve) {
                        resolve(new Error('Doesn\'t matter'));
                    });
                }
            };

            var bookController = require(CONTROLLER_PATH).createBookController(dataService);
            var req = {
                body: {
                    title: TEST_TITLE,
                    bookCode: TEST_BOOK_CODE,
                    desription: TEST_DESCRIPTION,
                    cost: TEST_COST,
                    inInventory: TEST_IN_INVENTORY,
                    isPdf: TEST_IS_PDF,
                    isPrint: TEST_IS_PRINT,
                    location: TEST_LOCATION,
                    type: TEST_TYPE
                }
            };

            return bookController.put(req).then(function successfulPut(arg) {
                console.log('???');
                assert.strictEqual(arg.httpStatus, 201, 'Unexpected status code: ' + arg.httpStatus);
            }).catch(function failedPut(e) {
                console.log(e.message);
                assert.fail('Did not get expected success: ' + e.message);
            });
        });
    });

});
