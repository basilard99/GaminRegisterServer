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
	var publisherController = require(PUBLISHER_CONTROLLER)(dataService);
	var publisherRouter = express.Router(); //eslint-disable-line new-cap

	var publisherListController = require(PUBLISHER_LIST_CONTROLLER)(dataService);

	publisherRouter.route('/publisherList')
		.post(publisherController.post)
		.get(publisherListController.get)
		.put(publisherListController.put);

	publisherRouter.route('/PublisherList/:publisherName')
		.get(publisherController.getSingle)
		.put(publisherController.put)
		.patch(publisherController.patch);

	return publisherRouter;
};

module.exports = routes;
