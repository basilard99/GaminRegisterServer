var express = require('express');
var bodyParser = require('body-parser');

var neo4Jport = (process.env.ENV === 'test') ? '7474' : '9494';

var app = express();
var port = process.env.PORT || 3000;

var publisherRouter = require('./lib/routes/publisherRoutes')(neo4Jport);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', publisherRouter);


app.get('/', function(req, res) {
	res.send('welcome to my API');
});

app.server = app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
	console.log('Neo4j is running on port: ' + neo4Jport);
});

		
module.exports = app;