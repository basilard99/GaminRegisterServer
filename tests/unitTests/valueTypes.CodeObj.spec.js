'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe.only('CodeObj - ', function codeObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createCode(5);
        }, 'The code value must be defined and be a string');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createCode();
        }, 'The code value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createCode(undefined);
        }, 'The code value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createCode(null);
        }, 'The code value must be defined and have a value');
    });

    it('When created with an empty string will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createCode('');
        }, 'The code value must be defined and have a value');
    });

    it('When created with a 1 letter string will throw an exception', function testTooShort1() {
        assert.throws(function assertCheck() {
            valueTypes.createCode('a');
        }, 'The code value must contain at least 3 characters');
    });

    it('When created with a 7 letter string will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {
            valueTypes.createCode('abcdefg');
        }, 'The code value cannot contain more than 6 characters');
    });

    it('When created with a 2 letter string will allow reading of name', function testMinimumAllowed() {
        var cut = valueTypes.createCode('ab');
        assert.equal(cut.value, 'ab');
    });

    it('When created with a 6 letter string will allow reading of name', function testMaximumAllowed() {
        var cut = valueTypes.createCode('abcdef');
        assert.equal(cut.value, 'abcdef');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createCode('abc');
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });
});
