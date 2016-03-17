'use strict';

module.exports.createFakePublisherData = function createFake() {
    return [
        { name: 'Fantasy Flight Games', webSite: 'http://www.fantasyflightgames.com', code: 'FFG', isActive: true },
        { name: 'Wizards of the Coast', webSite: 'http://www.wotc.com', code: 'WOTC', isActive: true },
        { name: 'Pinnacle Entertainment Group', webSite: 'http://www.peginc.com', code: 'PEG', isActive: true }
    ];
};

module.exports.createEmptyFakePublisherData = function createEmptyFake() {
    return [];
};
