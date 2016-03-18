'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('MoneyObj - ', function moneyObjTestSuite() {

    it('When created with a non-number object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney('hi');
        }, 'The money value must be defined and be a number');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney();
        }, 'The money value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney(undefined);
        }, 'The money value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney(null);
        }, 'The money value must be defined and have a value');
    });

    it('When created with a value of less than 0 will throw an exception', function testTooShort1() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney(-0.00001);
        }, 'The money value must be between 0 and 1000');
    });

    it('When created with a value of more than 1000 will throw an exception', function testTooLong() {
        assert.throws(function assertCheck() {
            valueTypes.createMoney(1000.0000001);
        }, 'The money value must be between 0 and 1000');
    });

    it('When created with a valid number will allow reading of name', function testMinimumAllowed() {
        var cut = valueTypes.createMoney(14.99);
        assert.equal(cut.value, 14.99);
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createMoney(14.99);
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });
});
