'use strict';

var db = require('seraph')({ name: 'neo4j', pass: 'pass' });
var Promise = require('bluebird');

var ThisObj = function neo4jOperations() {
};

ThisObj.prototype = {

    addDummyNode: function addNode() {
        return new Promise(function addDummyNodePromise(resolve, reject) {
            var dataToSave =  { name: 'NotImportant',
                                someValue: '22' };

            db.save(dataToSave, 'Dummy', function saveDone(err) {
                if (err) {
                    reject(err);
                }
                resolve(dataToSave);
            });
        });
    },

    clearNeo4j: function clear() {
        return new Promise(function deleteAllNodes(resolve, reject) {
            db.query('MATCH (n) DELETE (n)', function deleteCompleted(err, result) {
                if (err) {
                    reject(err);
                }

                resolve(result);
            });
        });
    },

    addNode: function addNode(data, type) {
        return new Promise(function addDummyNodePromise(resolve, reject) {
            db.save(data, type, function saveDone(err) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
};

module.exports.create = function create() {
    return new ThisObj();
};
