var mongoose 	= require('mongoose');
var config 		= require('./config/db.js');

mongoose.connect(config.MONGO_DB_PATH + config.MONGO_DB_NAME, function () {
    console.log('mongodb connected')
});

var flight_schema = new mongoose.Schema({
						        "ident": "string",
						        "timestamp": "string",
						        "longitude": "string",
						        "latitude": "string",
						        "groundspeed": "string",
						        "altitude": "string",
						        "updateType": "string",
						        "heading": "string",
						        "arrivalTime": "string",
 								"carrier": "string",
 						    	});

var flight = mongoose.model('flight', flight_schema);

module.exports 	= flight;
