var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var publisherRouter = require('./lib/routes/publisherRoutes')();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', publisherRouter);

app.get('/', function(req, res) {
	res.send('welcome to my API');
});

app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});