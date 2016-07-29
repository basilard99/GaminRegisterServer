'use strict';

var assert = require('chai').assert;
var valueTypes = require('../../lib/models/valueTypes.js');

describe('PublisherUriObj - ', function publisherUriObjTestSuite() {

    it('When created without a leading / will throw an exception', function testMissingLeadingSlash() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherUri('publishers/abc');
        }, 'The publisher URI is not valid');
    });

    it('When created without a leading /publishers will throw an exception', function testMissingLeadingPublishers() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherUri('/nope/abc');
        }, 'The publisher URI is not valid');
    });

    it('When created without an invalid code will throw an exception', function testInvalidCode() {
        assert.throws(function assertCheck() {
            valueTypes.createPublisherUri('/publishers/ab');
        }, 'The publisher URI is not valid');
    });

    it('When created with a valid publisher Uri will allow reading of uri', function testValid() {
        var cut = valueTypes.createPublisherUri('/publishers/abc123');
        assert.equal(cut.value, '/publishers/abc123');
    });

    it('Should not allow modification of object', function testInternalAccess() {
        var cut = valueTypes.createPublisherUri('/publishers/abc123');
        assert.throws(function assertCheck() {
            cut.value = 'test';
        }, TypeError);
    });
    
});
