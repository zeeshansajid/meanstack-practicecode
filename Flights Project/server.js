var mongoose 	= require('mongoose');
var express 	= require('express');
var bodyParser 	= require('body-parser');

var path 	= require("path");
var async 	= require('async');
var fs 		= require('fs');

var config = require('./config/db.js');

mongoose.connect(config.MONGO_DB_PATH+ config.MONGO_DB_NAME, function () {
    console.log('mongodb connected');
});

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/api', require('./app/routes.js'));

app.listen(8000);
console.log("Magic Happens at http://localhost:8000");


