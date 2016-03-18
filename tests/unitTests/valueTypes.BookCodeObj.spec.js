'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('BookCodeObj - ', function nameObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode(5);
        }, 'The book code value must be defined and be a string');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode();
        }, 'The book code value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode(undefined);
        }, 'The book code value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode(null);
        }, 'The book code value must be defined and have a value');
    });

    it('When created with an empty string will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode('');
        }, 'The book code value must be defined and have a value');
    });

    it('When created with a 1 letter string will throw an exception', function testTooShort1() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode('a');
        }, 'The book code value must contain at least 3 characters');
    });

    it('When created with a 31 letter string will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {
            valueTypes.createBookCode('abcdegfhijklmnopqrstuvwxyz12345');
        }, 'The book code value cannot contain more than 30 characters');
    });

    it('When created with a 3 letter string will allow reading of name', function testMinimumAllowed() {
        var cut = valueTypes.createBookCode('abc');
        assert.equal(cut.value, 'abc');
    });

    it('When created with a 30 letter string will allow reading of name', function testMaximumAllowed() {
        var cut = valueTypes.createBookCode('abcdefghijklmnopqrstuvwxyz1234');
        assert.equal(cut.value, 'abcdefghijklmnopqrstuvwxyz1234');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createBookCode('abc');
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });
});
