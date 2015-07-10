var express = require('express');
var db = require('seraph')({server: 'http://localhost:9494', name: 'neo4j', pass: 'pass'});
var dataService = require('../lib/dataService.js').create(db);
var publisherFactory = require('../lib/publisher.js');

var routes = function() {
	var publisherRouter = express.Router();
	
	publisherRouter.route('/Publishers')
		.post(function(req, res) {
			var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
			dataService.savePublisher(pub, function(node) {
				res.status(201).send(node);
			});
		})
		.get(function(req, res) {
			dataService.getAllPublishers(function(models) {
				res.json(models);
			});
		});
		
	publisherRouter.route('/Publishers/:publisherName')
		.get(function(req, res) {
			dataService.getPublisher(req.params.publisherName, function(result) {
				res.json(result);
			})
		})
		.put(function(req, res) {
			var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
			dataService.savePublisher(pub, function(node) {
				res.status(201).send(node);
			});
		})
		.patch(function(req, res) {
			var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
			dataService.savePublisher(pub, function(node) {
				res.status(201).send(node);
			});			
		})
		
	return publisherRouter;
};

module.exports = routes;