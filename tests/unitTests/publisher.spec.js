'use strict';

var assert = require('chai').assert;
var publisherFactory = require('../../lib/models/publisher.js');

var TEST_NAME = 'TestName';
var TEST_WEBSITE = 'www.TestWebSite.com';
var TEST_CODE = 'TWS';
var TEST_ISACTIVE = false;
var TEST_DESCRIPTION = 'TestDescription';

describe('The publisher should behave as follows - ', function describe() {

    it ('the factory should create an object matching the creation parameters',
        function test() {
            var cut = publisherFactory.createPublisher(TEST_NAME,
                                                       TEST_WEBSITE,
                                                       TEST_CODE,
                                                       TEST_ISACTIVE,
                                                       TEST_DESCRIPTION
                      );

            assert.strictEqual(cut.name, TEST_NAME);
            assert.strictEqual(cut.webSite, TEST_WEBSITE);
            assert.strictEqual(cut.code, TEST_CODE);
            assert.strictEqual(cut.isActive, TEST_ISACTIVE);
            assert.strictEqual(cut.description, TEST_DESCRIPTION);
        }
    );
});
