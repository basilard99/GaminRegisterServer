'use strict';

module.exports.createManyFakePublishers = function createFake() {
    return [
        { name: 'Fantasy Flight Games', webSite: 'http://www.fantasyflightgames.com', code: 'FFG', isActive: true },
        { name: 'Wizards of the Coast', webSite: 'http://www.wotc.com', code: 'WOTC', isActive: true },
        { name: 'Pinnacle Entertainment Group', webSite: 'http://www.peginc.com', code: 'PEG', isActive: true }
    ];
};

module.exports.createOneFakePublisher = function createFake() {
    return [
        { name: 'Fantasy Flight Games', webSite: 'http://www.fantasyflightgames.com', code: 'FFG', isActive: true }
    ];
};

module.exports.createEmptyFakePublisherData = function createEmptyFake() {
    return [];
};
