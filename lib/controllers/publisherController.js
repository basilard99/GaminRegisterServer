var publisherFactory = require('../models/publisher.js');

var NAME_MISSING_ERROR = 'Name is required';
var UNKNOWN_ERROR = 'An unknown error occurred';

var publisherController = function (dataService) {
	'use strict';
	
    var post = function (req, res) {
		if (!req.body.name) {
			res.status(400);
			res.send(NAME_MISSING_ERROR);
			return;
		}
		var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
		dataService.savePublisher(pub, function (err, model) {
			if (err) {
				res.status(500);
				res.send(UNKNOWN_ERROR);
				return;
			}
			res.status(201);
			res.send(model);
		});
	};
		
    var get = function (req, res) {
		dataService.getAllPublishers(function (err, models) {
			if (err) {
				res.status(500);
				res.send(UNKNOWN_ERROR);
				return;
			}
			res.json(models);
		});
	};
	
    var getSingle = function (req, res) {
		dataService.getPublisher(req.params.publisherName, function (err, result) {
			if (err) {
				res.status(500);
				res.send(UNKNOWN_ERROR);
				return;
			}
			if (!result) {
				res.status(404);
				res.send();
			} else {
				res.status(200);
				res.json(result);
			}
		});
	};
	
    var put = function (req, res) {
		if (!req.body.name) {
			res.status(400);
			res.send(NAME_MISSING_ERROR);
			return;
		}
		var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
		dataService.savePublisher(pub, function (err, model) {
			if (err) {
				res.status(500);
				res.send(UNKNOWN_ERROR);
				return;
			}
			res.status(201);
			res.send(model);
		});
	};
	
    var patch = function (req, res) {
		if (!req.body.name) {
			res.status(400);
			res.send(NAME_MISSING_ERROR);
			return;
		}
		var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
		dataService.savePublisher(pub, function (err, model) {
			if (err) {
				res.status(500);
				res.send(UNKNOWN_ERROR);
				return;
			}
			res.status(201);
			res.send(model);
		});
	};

    return {
        post: post,
        get: get,
        getSingle: getSingle,
        put: put,
        patch: patch
    };
};

module.exports = publisherController;