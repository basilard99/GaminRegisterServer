var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

var publisherRouter = express.Router();

app.use('/api', publisherRouter);
publisherRouter.route('/Publishers')
	.get(function(req, res) {
		var responseJson = {hello: 'This is my API'};
		
		res.json(responseJson);
	});

app.get('/', function(req, res) {
	res.send('welcome to my API');
});

app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});