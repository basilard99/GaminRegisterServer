var express = require('express');
var db = require('seraph')({server: 'http://localhost:9494', name: 'neo4j', pass: 'pass'});
var dataService = require('./lib/dataService.js').create(db);
var bodyParser = require('body-parser');
var publisherFactory = require('./lib/publisher.js');

var app = express();
var port = process.env.PORT || 3000;

var publisherRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', publisherRouter);

publisherRouter.route('/Publishers')
	.post(function(req, res) {
		console.log(req.body.name)
		var pub = publisherFactory.createPublisher(req.body.name, req.body.webSite, req.body.code, req.body.isActive, req.body.description);
		dataService.savePublisher(pub, function(node) {
			res.status(201).send(node);
		});
	})
	.get(function(req, res) {
		dataService.getAllPublishers(function(models) {
			res.json(models);
		});
	});
	
publisherRouter.route('/Publishers/:publisherName')
	.get(function(req, res) {
		console.log(req.params.publisherName);
		dataService.getPublisher(req.params.publisherName, function(result) {
			console.log(result.code);
			res.json(result);
		})
	});

app.get('/', function(req, res) {
	res.send('welcome to my API');
});

app.listen(port, function() {
	console.log('Gulp is running my app on port: ' + port);
});