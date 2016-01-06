'use strict';

var Promise = require('bluebird');

var ThisObj = function dataService(db, publisherFactory) {
	this.model = require('seraph-model');
	this.database = db;
	this.publisherfactory = publisherFactory;
};

ThisObj.prototype = {

	savePublisherList: function savePublisherListAction(publisherList) {
        var _this = this;
        return new Promise(function savePublisherListPromise(resolve, reject) {
            var savePromises = [];
            try {
                publisherList.list.forEach(function saveSingle(p) {
                    savePromises.push(_this.savePublisher(p)
                                        .then(function successfulSave() {
                                            console.log('Saved ' + p.name);
                                        }, function failedSave() {
                                            console.log('Error while saving: ' + p.name + ' \nerror' + err);
                                        }));
                });
                Promise.all(savePromises).then(function cleanupAfterAllPublishers() { resolve(); });
            } catch (err) {
                reject(err);
            }
        });
	},

	savePublisher: function savePublisherAction(publisher) {
		var _this = this;
        return new Promise(function savePublisherPromise(resolve, reject) {
            try {

                if (!publisher) {
                    reject(new Error('Publisher is required'));
                    return;
                }

                if (!publisher.name) {
                    reject(new Error('Publisher Name is required'));
                    return;
                }

            	var pub = _this.model(_this.database, 'Publisher');
                pub.where({ name: publisher.name }, function cb(err, results) {
                    if (err) {
                        reject(err);
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
                                reject(err);
                            }

                            resolve(savedModel);
                        });
                    } else {
                        pub.save(publisher, function cb(err, model) {
                            if (err) {
                                reject(err);
                            }

                            resolve(model);
                        });
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
	},

	getAllPublishers: function getAllPublishersAction() {
		var _this = this;

        return new Promise(function getAllPublishersPromise(resolve, reject) {
            var publisherFactory = _this.publisherfactory;
            var model = _this.model;
            var pubType = model(_this.database, 'Publisher');

            try
            {
                pubType.findAll(function cb(err, allFoundModels) {
                    if (err) {
                        reject(err);
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

                    resolve(allFoundModels);
                });
            } catch (err) {
                reject (err);
            }
        })
	},

	getPublisher: function getPublisherAction(publisherName) {
        var _this = this;

        return new Promise(function getPublisherPromise(resolve, reject) {
            if (!publisherName) {
                reject(new Error('Publisher Name is required'));
    		}

            var pubType = _this.model(_this.database, 'Publisher');
            pubType.where({ name: publisherName }, function cb(err, models) {
                if (err) {
                    reject(err);
                }

                resolve(models[0]);
            });
        });
	}
};

module.exports.create = function create(db, publisherFactory) {
	return new ThisObj(db, publisherFactory);
};
