'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('ForcedBooleanObj - ', function forcedBooleanObjTestSuite() {

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createForcedBoolean();
        }, 'The boolean value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createForcedBoolean(undefined);
        }, 'The boolean value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createForcedBoolean(null);
        }, 'The boolean value must be defined and have a value');
    });

    it('When created with a non-boolean (string) will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createForcedBoolean('true');
        }, 'The boolean value must be defined and have a true/false value');
    });

    it('When created with a non-boolean (number) will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createForcedBoolean(1);
        }, 'The boolean value must be defined and have a true/false value');
    });

    it('When created with a boolean value will allow reading of value', function testBoolean() {
        var cut = valueTypes.createForcedBoolean(false);
        assert.equal(cut.value, false);
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createForcedBoolean(true);
        assert.throws(function assertCheck() {
            cut.value = false;
        }, TypeError);
    });
});
