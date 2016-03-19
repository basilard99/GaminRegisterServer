'use strict';

var Promise = require('bluebird');
var logger = require('../utils/logger.js')();

var BookServiceObj = function defineService(db) {
    this.model = require('seraph-model');
    this.database = db;
    //this.publisherfactory = publisherFactory;
};

BookServiceObj.prototype = {
    saveBook: function savePublisherAction(book) {
        var _this = this;
        return new Promise(function saveBookPromise(resolve, reject) {

            try {

                if (!book) {
                    reject(new Error('Book is required'));
                    return;
                }

                if (!book.name) {
                    reject(new Error('Book name is required'));
                    return;
                }
/*
                var pub = _this.model(_this.database, 'Publisher');
                pub.where({ name: publisher.name }, function cb(err, results) {
                    if (err) {
                        logger.debug('Error while checking to see if the publisher exists:\n\t- ' + err);
                        reject(err);
                    }

                    var model = results[0];
                    if (model) {
                        if (publisher.webSite) {
                            model.webSite = publisher.webSite;
                        }

                        if (publisher.code) {
                            model.code = publisher.code;
                        }

                        if (publisher.isActive) {
                            model.isActive = publisher.isActive;
                        }

                        if (publisher.description) {
                            model.description = publisher.description;
                        }

                        pub.save(model, function cb(err, savedModel) {
                            if (err) {
                                logger.debug('Error while saving publisher ' + model.name + ':\n\t- ' + err);
                                reject(err);
                            }
                            logger.info('Saved publisher: ' + savedModel.name);
                            resolve(savedModel);
                        });
                    } else {
                        var tempPub = {
                            name: publisher.name,
                            webSite: publisher.webSite,
                            code: publisher.code,
                            isActive: publisher.isActive,
                            description: publisher.description
                        };

                        pub.save(tempPub, function cb(err, model) {
                            if (err) {
                                if (model) {
                                    logger.debug('Error while saving publisher ' + model.name + ':\n\t- ' + err);
                                } else {
                                    logger.debug('Error while saving publisher:\n\t- ' + err);
                                }

                                reject(err);
                                return;
                            }

                            logger.info('Saved publisher: ' + model.name);
                            resolve(model);
                        });
                    }
                });*/
            } catch (err) {
                logger.debug('Error while saving publisher:\n\t- ' + err);
                reject(err);
            }
        });
    },
};

module.exports.createBookService = function create(db) {
    return new BookServiceObj(db);
};
