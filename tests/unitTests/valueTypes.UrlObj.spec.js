'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('UrlObj - ', function urlObjTestSuite() {

    it('When created with a non-string object will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl(5);
        }, 'The url value must be defined and be a string');
    });

    it('When created with nothing will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl();
        }, 'The url value must be defined and have a value');
    });

    it('When created with undefined will throw an exception', function testUndefined() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl(undefined);
        }, 'The url value must be defined and have a value');
    });

    it('When created with null will throw an exception', function testNull() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl(null);
        }, 'The url value must be defined and have a value');
    });

    it('When created with an empty string will throw an exception', function testEmpty() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl('');
        }, 'The url value must be defined and have a value');
    });

    it ('When created with an invalid url string will throw an exception', function testNonUrl() {
        assert.throws(function assertCheck() {
            valueTypes.createUrl('xxx');
        }, 'The url value must be a valid url');
    });

    it ('When created with a valid url string will allow reading of url', function testUrl() {
        var cut = valueTypes.createUrl('http://www.test.com');
        assert.equal(cut.value, 'http://www.test.com');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createUrl('http://www.test.com');
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });

});
