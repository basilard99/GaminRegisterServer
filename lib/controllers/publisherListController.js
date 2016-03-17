'use strict';

var MISSING_RESOURCE = 'The requested resource could not be found';

var publisherListController = function create(publisherDataService) {

    var get = function getRestAction(req, res) {

		publisherDataService.getAllPublishers()
            .then(function getAllPublishersSucceeded(publisherList) {
                if (publisherList.length === 0) {
                    res.status(404);
                    res.send(MISSING_RESOURCE);
                    return;
                }

                var results = [];
                for (var i = 0; i < publisherList.length; i++) {
                    results.push({ name: publisherList[i].name, uri: 'publisherList/' + publisherList[i].code });
                }

                var returnedList = { list: results };
                res.status(200);
                res.json(returnedList);
            }, function getAllPublishersFailed(err) {
				res.status(500);
				res.send(err);
            });
    };

    var put = function putRestAction(req, res) {

        publisherDataService.savePublisherList(req.body)
            .then(function savePublisherListSucceeded() {
                res.status(201);
                res.json({ uri: 'publisherList/' });
            }, function savePublisherListFailed(err) {
                res.status(500);
                res.send(err);
            });

    };

    return {
        get: get,
        put: put
    };

};

module.exports = publisherListController;
