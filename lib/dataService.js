var model = require('seraph-model');

function DataService(db) {	
	var _db = db;
	
	return {
		savePublisher: function(publisher, callback) {
			
			var newPub = model(_db, 'Publisher');
			
			newPub.save(publisher, function(err, node) {
				if (err) {
					throw err;
				}
				
				callback(node);
			});
			
		}
	}
};

module.exports.create = function(db) {
	return new DataService(db);
};