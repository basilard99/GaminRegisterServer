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
		},
		
		getAllPublishers: function(callback) {
			
			var pubType = model(_db, 'Publisher');
			
			pubType.findAll(function(err, allOfTheseModels) {
				if (err) throw err;
				
				callback(allOfTheseModels);
			})
		},
		
		getPublisher: function(publisherName, callback) {
			
			var pubType = model(_db, 'Publisher');
			
			pubType.where({ name: publisherName }, function(err, model) {
				if (err) throw err;
				console.log(model);
				callback(model[0]);
			})
		}
	}
};

module.exports.create = function(db) {
	return new DataService(db);
};