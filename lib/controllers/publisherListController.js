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
            
            if (publisherList.list.length === 0) {
                res.status(404);
                res.send(MISSING_RESOURCE);
                return;
            }
            
            res.status(200);
			res.json(publisherList);
		});
    }
    
    return { get: get };

};

module.exports = publisherListController;