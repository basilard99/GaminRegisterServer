'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('PublisherCodeObj - ', function publisherCodeObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode(5);
        }, 'The publisher code value must be defined and be a string');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode();
        }, 'The publisher code value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode(undefined);
        }, 'The publisher code value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode(null);
        }, 'The publisher code value must be defined and have a value');
    });

    it('When created with an empty string will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode('');
        }, 'The publisher code value must be defined and have a value');
    });

    it('When created with a 1 letter string will throw an exception', function testTooShort1() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode('a');
        }, 'The publisher code value must contain at least 3 characters');
    });

    it('When created with a 7 letter string will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherCode('abcdefg');
        }, 'The publisher code value cannot contain more than 6 characters');
    });

    it('When created with a 2 letter string will allow reading of name', function testMinimumAllowed() {
        var cut = valueTypes.createPublisherCode('ab');
        assert.equal(cut.value, 'ab');
    });

    it('When created with a 6 letter string will allow reading of name', function testMaximumAllowed() {
        var cut = valueTypes.createPublisherCode('abcdef');
        assert.equal(cut.value, 'abcdef');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createPublisherCode('abc');
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });
});
