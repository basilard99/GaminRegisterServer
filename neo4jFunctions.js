'use strict';

var spawn = require('child_process').spawn;
var monitorctrlc = require('monitorctrlc');

var DEFAULT_DEV_DB_NAME = 'test_graph.db';
var DEFAULT_PROD_DB_NAME = 'prod_graph_db';
var NEO_4J_MANAGEMENT_HOME = 'C:\\Users\\basil\\Downloads\\neo4j-community-3.0.0-M01-windows\\neo4j-community-3.0.0-M01\\bin\\Neo4j-Management\\';

var neo4jManager = function manager() {
        
    function initializeNeo4j() {
	
        var child = spawn("powershell.exe", ["-Command", "-"]);
        child.stderr.on("data",function(data){
            console.log("Powershell Errors: " + data);
        });
        child.on("exit",function(){
            console.log("Powershell Script finished");
        });
        child.stdin.write("import-module " + NEO_4J_MANAGEMENT_HOME + "Neo4j-Management.psm1\n");
        
        return child;
        
    };
    
    var _child = initializeNeo4j();

    var switchToDevelopmentDb = function switchToDev(pathToDevelopmentDb) {
      
        var path = pathToDevelopmentDb || DEFAULT_DEV_DB_NAME;
        
        _child.stdin.write('Set-Neo4JSetting -ConfigurationFile neo4j-server.properties -Name org.neo4j.server.database.location -Value data/' + path +'\n');
        _child.stdin.write('Restart-Neo4JServer\n');
        _child.stdin.end();
        
    };
    
    var switchToProductionDb = function switchToProd(pathToProductionDb) {
      
        var path = pathToDevelopmentDb || DEFAULT_PROD_DB_NAME;
        
        _child.stdin.write("Set-Neo4JSetting -ConfigurationFile neo4j-server.properties -Name org.neo4j.server.database.location -Value data/" + path);
        _child.stdin.write("Restart-Neo4JServer\n");
        _child.stdin.end();
        
    };
    
    return {
        switchToDevelopmentDb: switchToDevelopmentDb,
        switchToProductionDb: switchToProductionDb
    };

}

module.exports = neo4jManager;