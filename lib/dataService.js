var model = require('seraph-model');

function DataService(db) {	
	var _db = db;
	
	return {
		savePublisher: function(publisher, callback) {
			
			var pub = model(_db, 'Publisher');
			
			pub.where({ name: publisher.name }, function(err, results) {
				if (err) throw err;
								
				var model = results[0];		
				if (model)
				{
					model.webSite = publisher.webSite;
					model.code = publisher.code;
					model.isActive = publisher.isActive;
					model.description = publisher.description;
					
					pub.save(model, function(err, savedModel) {
						if (err) throw err;
						callback(savedModel);
					});
				}
				else
				{
					console.log('new');
					pub.save(publisher, function(err, node) {
						if (err) throw err;						
						callback(node);
					});
				}
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
				callback(model[0]);
			})
		}
	}
};

module.exports.create = function(db) {
	return new DataService(db);
};