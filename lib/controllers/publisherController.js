'use strict';

var publisherFactory = require('../models/publisher.js');
var Promise = require('bluebird');

var PublisherControllerObj = function definePublisherController(dataService) {
    this._dataService = dataService;
};

PublisherControllerObj.prototype.put = function putAction(publisher) {
    var _this = this;

    return new Promise(function putPublisherPromise(resolve, reject) {
        var pub;

        try {
            pub = publisherFactory.createPublisher(publisher.name,
                                                   publisher.webSite,
                                                   publisher.code,
                                                   publisher.isActive,
                                                   publisher.description
            );
        } catch (e) {
            console.log('exception: ' + e);
            e.httpStatus = 400;
            reject(e);
        }

        _this._dataService.savePublisher(pub)
            .then(function savePublisherSuccessful(model) {
                resolve({ httpStatus: 201, data: model });
            }).catch(function savePublisherFailed(e) {
                e.httpStatus = 500;
                reject(e);
            });
    });
};

PublisherControllerObj.prototype.post = function postAction(publisher) {
    var _this = this;

    return new Promise(function postPublisherPromise(resolve, reject) {
        var pub;

        try {
            pub = publisherFactory.createPublisher(publisher.name,
                                                   publisher.webSite,
                                                   publisher.code,
                                                   publisher.isActive,
                                                   publisher.description
            );
        } catch (e) {
            e.httpStatus = 400;
            reject(e);
        }

        _this._dataService.savePublisher(pub)
            .then(function savePublisherSuccessful(model) {
                resolve({ httpStatus: 201, data: model.name });
            }).catch(function savePublisherFailed(e) {
                e.httpStatus = 500;
                reject(e);
            });
    });
};

PublisherControllerObj.prototype.get = function getAction(publisherName) {
    var _this = this;

    return new Promise(function getPublisherPromise(resolve, reject) {
        _this._dataService.getPublisher(publisherName)
            .then(function getPublisherSuccessful(result) {
                if (!result) {
                    e.httpStatus = 404;
                    reject(e);
                } else {
                    resolve({ httpStatus: 200, data: result });
                }
            }).catch(function getPublisherFailed(e) {
                e.httpStatus = 500;
                reject(e);
            });
    });
};

module.exports.createPublisherController = function createPublisherController(dataService) {
    return new PublisherControllerObj(dataService);
};
