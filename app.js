var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var publisherRouter = require('./lib/routes/publisherRoutes')(7474);
var bookRouter = require('./lib/routes/bookRoutes')(7474);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', publisherRouter);
app.use('/api', bookRouter);


app.get('/', function(req, res) {
	res.send('welcome to my API');
});

app.server = app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
	console.log('Neo4j is running on port: 7474');
});


module.exports = app;
