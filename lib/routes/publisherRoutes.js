'use strict';

var express = require('express');

var routes = function(port) {
	var db = require('seraph')({server: 'http://localhost:' + port, name: 'neo4j', pass: 'pass'});
	var dataService = require('../models/dataService.js').create(db);	
	var publisherController = require('../controllers/publisherController.js')(dataService);
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