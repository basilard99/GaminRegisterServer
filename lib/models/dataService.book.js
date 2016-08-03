'use strict';

var Promise = require('bluebird');
var logger = require('../utils/logger.js')();

var BookServiceObj = function defineService(db) {
    this.model = require('seraph-model');
    this.database = db;
};

BookServiceObj.prototype = {
    saveBook: function saveBookAction(bookToSave) {
        var _this = this;
        return new Promise(function saveBookPromise(resolve, reject) {

            try {

                if (!bookToSave) {
                    reject(new Error('Book is required'));
                    return;
                }

                if (!bookToSave.title) {
                    reject(new Error('Book name is required'));
                    return;
                }

                var bookModel = _this.model(_this.database, 'Book');
                bookModel.where({ title: bookToSave.title }, function cb(err, results) {
                    if (err) {
                        logger.debug('Error while checking to see if the book exists:\n\t- ' + err);
                        reject(err);
                    }

                    var model = results[0];
                    if (model) {
                        /*
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
                        */
                    } else {
                        var tempBook = {
                            title: bookToSave.title,
                            bookCode: bookToSave.bookCode,
                            description: bookToSave.description,
                            cost: bookToSave.cost,
                            inInventory: bookToSave.inInventory,
                            isPdf: bookToSave.isPdf,
                            isPrint: bookToSave.isPrint,
                            location: bookToSave.location,
                            type: bookToSave.type,
                            publisherUri: bookToSave.publisherUri
                        };

                        bookModel.save(tempBook, function cb(err, savedBook) {
                            if (err) {
                                if (savedBook) {
                                    logger.debug('Error while saving book ' + tempBook.title + ':\n\t- ' + err);
                                } else {
                                    logger.debug('Error while saving book:\n\t- ' + err);
                                }
                                reject(err);
                            }

                            logger.info('Saved book: ' + savedBook.title);
                            resolve(savedBook);
                        });
                    }
                });
            } catch (err) {
                logger.debug('Error while saving book:\n\t- ' + err);
                reject(err);
            }
        });
    },
};

module.exports.createBookService = function create(db) {
    return new BookServiceObj(db);
};
