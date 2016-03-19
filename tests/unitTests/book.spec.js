'use strict';

var assert = require('chai').assert;
var bookFactory = require('../../lib/models/book.js');
var valueTypes = require('../../lib/models/valueTypes.js');

var TEST_TITLE = 'Test Title';
var TEST_BOOK_CODE = '123456';
var TEST_DESCRIPTION = 'Test Description';
var TEST_COST = 19.95;
var TEST_IN_INVENTORY = true;
var TEST_IS_PDF = true;
var TEST_IS_PRINT = true;
var TEST_LOCATION = 'OneDrive';
var TEST_TYPE = valueTypes.BookTypeEnum.WarGame;

describe('The book should behave as follows - ', function describe() {

    it('should fail to create the book if neither isPrint nor isPdf is true', function test() {
        assert.throws(function assertCheck() {
            bookFactory.createBook(TEST_TITLE,
                                   TEST_BOOK_CODE,
                                   TEST_DESCRIPTION,
                                   TEST_COST,
                                   TEST_IN_INVENTORY,
                                   false,
                                   false,
                                   TEST_LOCATION,
                                   TEST_TYPE);
        }, 'The book must be either a print or PDF');
    });

    it('should fail to create the book if the type is invalid', function test() {
        assert.throws(function assertCheck() {
            bookFactory.createBook(TEST_TITLE,
                                   TEST_BOOK_CODE,
                                   TEST_DESCRIPTION,
                                   TEST_COST,
                                   TEST_IN_INVENTORY,
                                   TEST_IS_PDF,
                                   TEST_IS_PRINT,
                                   TEST_LOCATION,
                                   'a');
        }, 'The type is not a valid book type');
    });

    it ('the factory should create an object matching the creation parameters',
        function test() {
            var cut = bookFactory.createBook(TEST_TITLE,
                                             TEST_BOOK_CODE,
                                             TEST_DESCRIPTION,
                                             TEST_COST,
                                             TEST_IN_INVENTORY,
                                             TEST_IS_PDF,
                                             TEST_IS_PRINT,
                                             TEST_LOCATION,
                                             TEST_TYPE
            );

            assert.strictEqual(cut.title, TEST_TITLE);
            assert.strictEqual(cut.bookCode, TEST_BOOK_CODE);
            assert.strictEqual(cut.description, TEST_DESCRIPTION);
            assert.strictEqual(cut.cost, TEST_COST);
            assert.strictEqual(cut.inInventory, TEST_IN_INVENTORY);
            assert.strictEqual(cut.isPdf, TEST_IS_PDF);
            assert.strictEqual(cut.isPrint, TEST_IS_PRINT);
            assert.strictEqual(cut.location, TEST_LOCATION);
            assert.strictEqual(cut.type, TEST_TYPE);
        }
    );
});
