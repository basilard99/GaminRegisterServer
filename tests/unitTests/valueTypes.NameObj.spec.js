'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('NameObj - ', function nameObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createName(5);
        }, 'The name value must be defined and be a string');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createName();
        }, 'The name value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createName(undefined);
        }, 'The name value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createName(null);
        }, 'The name value must be defined and have a value');
    });

    it('When created with an empty string will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createName('');
        }, 'The name value must be defined and have a value');
    });

    it('When created with a 1 letter string will throw an exception', function testTooShort1() {
        assert.throws(function assertCheck() {
            valueTypes.createName('a');
        }, 'The name value must contain at least 3 characters');
    });

    it('When created with a 2 letter string will throw an exception', function testTooShort2() {
        assert.throws(function assertCheck() {
            valueTypes.createName('ab');
        }, 'The name value must contain at least 3 characters');
    });

    it('When created with a 31 letter string will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {
            valueTypes.createName('abcdegfhijklmnopqrstuvwxyz12345');
        }, 'The name value cannot contain more than 30 characters');
    });

    it('When created with a 3 letter string will allow reading of name', function testMinimumAllowed() {
        var cut = valueTypes.createName('abc');
        assert.equal(cut.name, 'abc');
    });

    it('When created with a 30 letter string will allow reading of name', function testMaximumAllowed() {
        var cut = valueTypes.createName('abcdefghijklmnopqrstuvwxyz1234');
        assert.equal(cut.name, 'abcdefghijklmnopqrstuvwxyz1234');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createName('abc');
        assert.throws(function assertCheck() {
            cut.name = 'test';
        }, TypeError);
    });
});
