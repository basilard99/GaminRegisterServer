'use strict';

var publisherFactory = require('../models/publisher.js');

var UNKNOWN_ERROR = 'BI: An unknown error occurred';

var publisherController = function controller(dataService) {
    var post = function postAction(req, res) {

        var pub;

        try {
            pub = publisherFactory.createPublisher(req.body.name,
                                                   req.body.webSite,
                                                   req.body.code,
                                                   req.body.isActive,
                                                   req.body.description
            );
        } catch(e) {
            res.status(400);
            res.send(e);
            return;
        }

        dataService.savePublisher(pub)
            .then(function savePublisherSuccessful(model) {
                res.status(201);
                res.send(model);
            }, function savePublisherFailed() {
                res.status(500);
                res.send(UNKNOWN_ERROR);
            });
    };

    var get = function getAction(req, res) {
        dataService.getAllPublishers(function callback(err, models) {
            if (err) {
                res.status(500);
                res.send(err);
                return;
            }
            res.json(models);
        });
    };

    var getSingle = function getSingleAction(req, res) {
        dataService.getPublisher(req.params.publisherName)
            .then(function getPublisherSuccessful(result) {
                if (!result) {
                    res.status(404);
                    res.send();
                } else {
                    res.status(200);
                    res.json(result);
                }
            }, function getPublisherFailed() {
                res.status(500);
                res.send(UNKNOWN_ERROR);
            });
    };

    var put = function putAction(req, res) {

        var pub;
        try {
            pub = publisherFactory.createPublisher(req.body.name,
                                                   req.body.webSite,
                                                   req.body.code,
                                                   req.body.isActive,
                                                   req.body.description
            );
        } catch(e) {
            res.status(400);
            res.send(e);
            return;
        }

        dataService.savePublisher(pub)
            .then(function savePublisherSuccessful(model) {
                res.status(201);
                res.send(model);
            }, function savePublisherFailed() {
                res.status(500);
                res.send(UNKNOWN_ERROR);
            });
    };

    var patch = function patchAction(req, res) {

        var pub;
        try {
            pub = publisherFactory.createPublisher(req.body.name,
                                                   req.body.webSite,
                                                   req.body.code,
                                                   req.body.isActive,
                                                   req.body.description
            );
        } catch(e) {
            res.status(400);
            res.send(e);
            return;
        }
        
        dataService.savePublisher(pub, function callback(err, model) {
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
