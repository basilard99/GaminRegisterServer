'use strict';

var express = require('express');
var PUBLISHER_FACTORY = require('../models/publisher.js');
var PUBLISHER_CONTROLLER = '../controllers/publisherController.js';
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

	var dataService = require('../models/dataService.publisher.js').createPublisherService(db, PUBLISHER_FACTORY);
	var publisherController = require(PUBLISHER_CONTROLLER).createPublisherController(dataService);
	var publisherRouter = express.Router(); //eslint-disable-line new-cap

	var publisherListController = require(PUBLISHER_LIST_CONTROLLER)(dataService);

	publisherRouter.route('/publisherList')
		.get(publisherListController.get)
		.put(publisherListController.put);

	publisherRouter.post('/publisherList', function doPost(req, res) {
		publisherController.post(req.body).then(function postSuccessful(arg) {
			var encodedLocation = '/publisherList/' + encodeURIComponent(arg.data);
			res.status(arg.httpStatus).location(encodedLocation).send(encodedLocation);
		}).catch(function postFailed(e) {
			res.status(e.httpStatus).send();
		});
	});

	publisherRouter.put('/PublisherList/:publisherName', function doPut(req, res) {
		publisherController.put(req.body).then(function putSuccessful(arg) {
			res.status(arg.httpStatus).send(arg.data);
		}).catch(function putFailed(e) {
			res.status(e.httpStatus).send();
		});
	});

	publisherRouter.get('/PublisherList/:publisherName', function doGet(req, res) {
		publisherController.get(req.params.publisherName).then(function getSuccessful(result) {
			res.status(result.httpStatus).send(result.data);
		}).catch(function getFailed(e) {
			res.status(e.httpStatus).send();
		});
	});

	return publisherRouter;
};

module.exports = routes;
