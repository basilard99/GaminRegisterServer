'use strict';

var express = require('express');
var PUBLISHER_FACTORY = require('../models/publisher.js');
var BOOK_CONTROLLER = '../controllers/bookController.js';
var PUBLISHER_LIST_CONTROLLER = '../controllers/publisherListController.js';
var SERVER = 'http://localhost:';
var USER = 'neo4j';
var PASSWORD = 'pass';

var routes = function setUpRoutes(port) {
    var db = require('seraph')({
        server: SERVER + port,
        name: USER,
        pass: PASSWORD
    });

    var dataService = require('../models/dataService.book.js').createBookService(db);
    var bookController = require(BOOK_CONTROLLER).createBookController(dataService);
    var bookRouter = express.Router(); //eslint-disable-line new-cap

    bookRouter.put('/book', function doPut(req, res) {
        bookController.put(req, res).then(function postSuccessful(arg) {
            res.status(arg.httpStatus).send(arg.data);
        }).catch(function putFailed(e) {
            res.status(e.httpStatus).send();
        });

    });

        //.get(publisherListController.get)
        //.put(publisherListController.put);

    return bookRouter;
};

module.exports = routes;
