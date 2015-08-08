'use strict';

var model = require('seraph-model');

function DataService(db) {
	var _db = db;

	return {

		savePublisher: function saveAction(publisher, callback) {
			if (!publisher) {
				callback(new Error('Publisher is required'), null);
				return;
			}

			if (!publisher.name) {
				callback(new Error('Publisher Name is required'), null);
				return;
			}

			var pub = model(_db, 'Publisher');

			pub.where({ name: publisher.name }, function cb(err, results) {
				if (err) {
							console.log('error1: ' + err.message);
					callback(err, null);
					return;
				}

				var model = results[0];
				if (model) {

					if (publisher.webSite) {
						model.webSite = publisher.webSite;
					}

					if (publisher.code) {
						model.code = publisher.code;
					}

					if (publisher.isActive) {
						model.isActive = publisher.isActive;
					}

					if (publisher.description) {
						model.description = publisher.description;
					}

					pub.save(model, function cb(err, savedModel) {
						if (err) {
							console.log('error2: ' + err.message);
							callback(err, null);
						}

						callback(null, savedModel);
					});
				} else {
					pub.save(publisher, function cb(err, model) {
						if (err) {
							console.log('error3: ' + err.message);
							callback(err, null);
						}

						callback(null, model);
					});
				}
			});
		},

		getAllPublishers: function getAllPublishersAction(callback) {

			var pubType = model(_db, 'Publisher');

			pubType.findAll(function cb(err, allFoundModels) {
				if (err) {
					callback(err, null);
				}

				callback(null, allFoundModels);
			});
		},

		getPublisher: function getPublisherAction(publisherName, callback) {
			if (!publisherName) {
				callback(new Error('Publisher Name is required'), null);
				return;
			}

			var pubType = model(_db, 'Publisher');

			pubType.where({ name: publisherName }, function cb(err, model) {
				if (err) {
					callback(err, null);
				}

				callback(err, model[0]);
			});
		}
	};
}

module.exports.create = function create(db) {
	return new DataService(db);
};
