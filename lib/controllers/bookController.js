'use strict';

var bookFactory = require('../models/book.js');
var Promise = require('bluebird');

var BookControllerObj = function defineBookController(dataService) {
    this._dataService = dataService;
};

BookControllerObj.prototype.put = function putAction(req) {

    var _this = this;

    return new Promise(function postBookPromise(resolve, reject) {

        var book;

        try {
            book = bookFactory.createBook(req.body.title,
                                          req.body.bookCode,
                                          req.body.description,
                                          req.body.cost,
                                          req.body.inInventory,
                                          req.body.isPdf,
                                          req.body.isPrint,
                                          req.body.location,
                                          req.body.type,
                                          req.body.publisherUri);
        } catch (e) {
            e.httpStatus = 400;
            reject(e);
        };

        return _this._dataService.saveBook(book)
            .then(function saveBookSuccessful(model) {
                resolve({ httpStatus: 201, data: model });
            }).catch(function saveBookFailed(e) {
                e.httpStatus = 500;
                reject(e);
            });

    });

};

module.exports.createBookController = function createBookController(dataService) {
    return new BookControllerObj(dataService);
};
