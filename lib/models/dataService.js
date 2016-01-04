'use strict';

var ThisObj = function dataService(db, publisherFactory) {
	this.model = require('seraph-model');
	this.database = db;
	this.publisherfactory = publisherFactory;
};

ThisObj.prototype = {

	savePublisherList: function savePublisherListAction(publisherList, callback) {

		var _this = this;

		publisherList.list.forEach(function saveSingle(p) {
			_this.savePublisher(p, function doneSaving(err) {
				if (err) {
					console.log('Error while saving: ' + p.name + ' \nerror' + err);
					return;
				}

				console.log('Saved ' + p.name);
			});
		});

		callback();
	},

	savePublisher: function saveAction(publisher, callback) {

		var _this = this;

		if (!publisher) {
			callback(new Error('Publisher is required'), null);
			return;
		}

		if (!publisher.name) {
			callback(new Error('Publisher Name is required'), null);
			return;
		}

		var pub = _this.model(_this.database, 'Publisher');

		pub.where({ name: 'publisher.name' }, function cb(err, results) {
			if (err) {
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
		var publisherFactory = this.publisherfactory;
		var model = this.model;
		var pubType = model(this.database, 'Publisher');

		pubType.findAll(function cb(err, allFoundModels) {
			if (err) {
				callback(err, null);
			}

			var publishers = [];
			for (var i = 0; i < allFoundModels.length; i++) {
				var currentModel = allFoundModels[i];
				publishers.push(
					publisherFactory.createPublisher(currentModel.name,
                                                     currentModel.webSite,
                                                     currentModel.code,
                                                     currentModel.isActive,
                                                     currentModel.description));
			}

			callback(null, publishers);
		});
	},

	getPublisher: function getPublisherAction(publisherName, callback) {
		if (!publisherName) {
			callback(new Error('Publisher Name is required'), null);
			return;
		}

		var pubType = this.model(this.database, 'Publisher');

		pubType.where({ name: publisherName }, function cb(err, models) {
			if (err) {
				callback(err, null);
			}
			callback(err, models[0]);
		});
	}
};

module.exports.create = function create(db, publisherFactory) {
	return new ThisObj(db, publisherFactory);
};
