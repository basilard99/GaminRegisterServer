'use strict';

var express = require('express');
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

	var dataService = require('../models/dataService.js').create(db);
	var publisherController = require(PUBLISHER_CONTROLLER)(dataService);
	var publisherListController = require(PUBLISHER_LIST_CONTROLLER)(dataService);
	var publisherRouter = express.Router();

	publisherRouter.route('/Publishers')
		.post(publisherController.post)
		.get(publisherController.get);

	publisherRouter.route('/Publishers/:publisherName')
		.get(publisherController.getSingle)
		.put(publisherController.put)
		.patch(publisherController.patch);

	return publisherRouter;
};

module.exports = routes;
