'use strict';

var log4js = require('log4js');

function configureLog4js() {
    log4js.configure({
        appenders: [{
            type: 'file',
            filename: './logs/test.log',
            category: 'all'
        }]
    })
};

module.exports = function create() {
    configureLog4js();
    return log4js.getLogger('all');
}
