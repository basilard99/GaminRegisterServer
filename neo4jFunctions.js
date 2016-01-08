'use strict';

var db = require('seraph')({ name: 'neo4j', pass: 'pass' });
var Promise = require('bluebird');

var DEFAULT_DEV_DB_NAME = 'test_graph.db';
var DEFAULT_PROD_DB_NAME = 'prod_graph_db';
var NEO_4J_MANAGEMENT_HOME = 'C:\\Users\\basil\\Downloads\\neo4j-community-3.0.0-M01-windows\\neo4j-community-3.0.0-M01\\bin\\Neo4j-Management\\';

var ThisObj = function neo4jOperations() {
};

ThisObj.prototype = {

    switchToDevelopmentDb: function switchToDev(pathToDevelopmentDb) {
        return new Promise(function switchToDevPromise(resolve, reject) {

            try {
                var path = pathToDevelopmentDb || DEFAULT_DEV_DB_NAME;
                var child = initializeNeo4J();

                console.log('--- Resetting to database: ' + path);

                child.stdin.write('Set-Neo4JSetting -ConfigurationFile neo4j-server.properties -Name org.neo4j.server.database.location -Value data/' + path +'\n'); //eslint-disable-line max-len
                child.stdin.write('Restart-Neo4JServer\n');
                child.stdin.end();

                setTimeout(function timeoutExceeded() {
                    console.log('--- Done resetting');
                    resolve();
                }, 20000);
            } catch (err) {
                reject(err);
            }

        });
    },

    switchToProductionDb: function switchToProd(pathToProductionDb) {

        var path = pathToProductionDb || DEFAULT_PROD_DB_NAME;
        var child = this.initializeNeo4J();

        console.log('--- Resetting to database: ' + path);

        child.stdin.write('Set-Neo4JSetting -ConfigurationFile neo4j-server.properties -Name org.neo4j.server.database.location -Value data/' + path); //eslint-disable-line max-len
        child.stdin.write('estart-Neo4JServer\n');
        child.stdin.end();

        setTimeout(function timeoutExceeded() {
            console.log('--- Done resetting');
            done();
        }, 20000);
    },

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

function initializeNeo4J() {
    var spawn = require('child_process').spawn;
    var child = spawn('powershell.exe', ['-Command', '-']);

    child.stderr.on('data', function displayErrors(data) {
        console.log('Powershell Errors: ' + data);
    });

    child.on('exit', function displayExit() {
        console.log('Powershell Script finished');
    });
    child.stdin.write('import-module ' + NEO_4J_MANAGEMENT_HOME + 'Neo4j-Management.psm1\n');

    return child;
};

module.exports.create = function create() {
    return new ThisObj();
};
