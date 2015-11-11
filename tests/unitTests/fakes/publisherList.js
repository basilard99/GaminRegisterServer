'use strict';

module.exports.createFakePublisherList = function createFake() {
    return {
        
        list: [
            { name: 'FantasyFlightGames', uri: '/FFG' },
            { name: 'Wizards of the Coast', uri: '/WOTC'}
        ]
        
    };
};

module.exports.createEmptyFakePublisherList = function createFake() {
    return {
        
        list: []
        
    };
};