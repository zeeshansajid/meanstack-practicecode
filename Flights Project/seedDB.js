var config 		= require('./config/db.js');
var flight  		= require('./model.js');

var util 		= require('util');
var trim 		= require('trim');
var fs 			= require("fs");
var mongoose 	= require('mongoose');

fs.readFile('data/carrier_files/BritishAirways/SFO-AMSTERDAM.json', 'utf8', function (err, data) {
if (err) throw err;

var fileData = JSON.parse(data);

for(var item in fileData){

	var itemData = fileData[item];
	itemData.carrier = "BritishAirways";

    console.log();
     var instance = new flight(itemData);
         instance.save(function(err) 
         {
			  if (err) throw err;
			 		 console.log(JSON.stringify(itemData) + ' is saved');
		 });
	}

});

fs.readFile('data/carrier_files/DeltaAirlines/OAK-KAR.json', 'utf8', function (err, data) {
if (err) throw err;

var fileData = JSON.parse(data);

for(var item in fileData){

	var itemData = fileData[item];
	itemData.carrier = "DeltaAirlines";

    console.log();
     var instance = new flight(itemData);
         instance.save(function(err) 
         {
			  if (err) throw err;
			 		 console.log(JSON.stringify(itemData) + ' is saved');
		 });
	}

});

fs.readFile('data/carrier_files/SouthWest/SFO-DELHI.json', 'utf8', function (err, data) {
if (err) throw err;

var fileData = JSON.parse(data);

for(var item in fileData){

	var itemData = fileData[item];
	itemData.carrier = "SouthWest";

    console.log();
     var instance = new flight(itemData);
         instance.save(function(err) 
         {
			  if (err) throw err;
			 		 console.log(JSON.stringify(itemData) + ' is saved');
		 });
	}

});

fs.readFile('data/carrier_files/VirginAtlantic/SFO-TOKYO.json', 'utf8', function (err, data) {
if (err) throw err;

var fileData = JSON.parse(data);

for(var item in fileData){

	var itemData = fileData[item];
	itemData.carrier = "VirginAtlantic";

    console.log();
     var instance = new flight(itemData);
         instance.save(function(err) 
         {
			  if (err) throw err;
			 		 console.log(JSON.stringify(itemData) + ' is saved');
		 });
	}

});

