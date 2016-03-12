'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('DescriptionObj - ', function descriptionObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createDescription(5);
        }, 'The description value must be defined and be a string');
    });

    it('When created with nothing will reset to an empty string', function testUndefined() {
        var cut = valueTypes.createDescription();
        assert.equal(cut.description, '');
    });

    it('When created with undefined will reset to an empty string', function testUndefined() {
        var cut = valueTypes.createDescription(undefined);
        assert.equal(cut.description, '');
    });

    it('When created with null will reset to an empty string', function testNull() {
        var cut = valueTypes.createDescription(null);
        assert.equal(cut.description, '');
    });

    it('When created with an empty string will allow reading of description', function testEmpty() {
        var cut = valueTypes.createDescription('');
        assert.equal(cut.description, '');
    });

    it('When created with a 501 letter string will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {

            // The array length is actually 1 less than than the bound given
            valueTypes.createDescription(Array(502).join('x'));
        }, 'The description value cannot contain more than 500 characters');
    });

    it('When created with a 500 letter string will allow reading of description', function testMinimumAllowed() {
        var cut = valueTypes.createDescription('abc');
        assert.equal(cut.description, 'abc');
    });

    it('When created with an empty string will allow reading of description', function testMinimumAllowed() {
        var cut = valueTypes.createDescription('abc');
        assert.equal(cut.description, 'abc');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createDescription('abc');
        assert.throws(function assertCheck() {
            cut.description = 'test';
        }, TypeError);
    });
});
