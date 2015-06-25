function DataService(db) {	
	var _db = db;
	
	return {
		savePublisher: function(publisher, callback) {
			var returnNode;
			
			_db.save({ 
				name: publisher.getName(), 
				webSite: publisher.getWebSite(),
				code: publisher.getCode(),
				isActive: publisher.getIsActive(),
				description: publisher.getDescription()
			}, 'Publisher', function(err, node) {
				if (err) throw err;
				
				callback(node);
			});
		}
	}
};

module.exports.create = function(db) {
	return new DataService(db);
};