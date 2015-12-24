'use strict';

var MISSING_RESOURCE = 'The requested resource could not be found';

var publisherListController = function create(dataService) {

    var get = function getRestAction(req, res) {

		dataService.getAllPublishers(function callback(err, publisherList) {
			if (err) {
				res.status(500);
				res.send(err);
				return;
			}

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
		});
    };

    return { get: get };

};

module.exports = publisherListController;
