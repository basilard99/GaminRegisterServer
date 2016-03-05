'use strict';

module.exports.createFakePublisherData = function createFake() {
    return [
        { name: 'Fantasy Flight Games', code: 'FFG' },
        { name: 'Wizards of the Coast', code: 'WOTC' },
        { name: 'Pinnacle Entertainment Group', code: 'PEG' }
    ];
};

module.exports.createEmptyFakePublisherData = function createEmptyFake() {
    return [];
};
