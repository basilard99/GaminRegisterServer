'use strict';

module.exports.createManyFakePublishers = function createFake() {
    return [
        { name: 'Fantasy Flight Games', code: 'FFG' },
        { name: 'Wizards of the Coast', code: 'WOTC' },
        { name: 'Pinnacle Entertainment Group', code: 'PEG' }
    ];
};

module.exports.createOneFakePublisher = function createFake() {
    return [
        { name: 'Fantasy Flight Games', code: 'FFG' }
    ];
};

module.exports.createEmptyFakePublisherData = function createEmptyFake() {
    return [];
};
