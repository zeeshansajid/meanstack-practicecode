var async   = require('async');
var path    = require("path");
var fs      = require('fs');
var config  = require('../config/db.js');
var extend  = require('util')._extend;


var errorResp = {
    error: {
        message: "An error occured, please try again.",
        code: 909
    },
    data: null
};
var successResp = {
    error: null,
    data: {}

};


function loadflightCarrierDirList(callback) {
    fs.readdir(config.DATA_FILES_PATH,

          function (err, data) {

              if (err) {
                  callback(err, null);
                  return;
              }
              else {

                //now that we have read the directory contents, lets get the names
                var only_directories = [];

                (function iterator(index) {

                    if (index == data.length) {
                        callback(null, only_directories);
                    }
                    else {
                        fs.stat(config.DATA_FILES_PATH + data[index],
                            function (err, stat) {
                                if (stat.isDirectory()) {

                                    var obj = {name: data[index]};
                                    only_directories.push(obj);
                                }
                                iterator(index + 1);
                            })
                    }
              })(0);

            }
        })
}

function carriersFilesList_Handler(req, res){

    loadflightCarrierDirList(function (err, data) {
        if (err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            errorResp.error = err;
            res.end(JSON.stringify(errorResp) + "\n");
            return;

        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            successResp.data = data;
            res.end(JSON.stringify(successResp) + "\n");
            return;
        }
    })
}

function loadflightCarrierFilesList(carrier_name, callback) {
   /**
   * based on the shared files we are assuming the folders inside carrier_files are carriers and each directory contains data files in json.
    */

        fs.readdir(config.DATA_FILES_PATH + carrier_name,
            function (err, data) {
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    var path = config.DATA_FILES_PATH + carrier_name + "/";
                    var only_json_Files = [];
                    (function iterator(index) {
                        /**
                         *
                         */
                        if (index == data.length) {
                            /**
                             *
                             * @type {{short_name: *, flights: *}}
                             */
                            var obj = {
                                short_name: carrier_name,
                                flights: only_json_Files
                            };
                            callback(null, obj);
                        } else {
                            fs.stat(path + data[index],
                                function (err, stat) {
                                    if (stat.isFile()) {
                                        /**
                                         *
                                         * @type {{name: *}}
                                         */

                                        var str = data[index].toLowerCase();
                                        if(str.substr(-5, 5) == ".json")
                                        {
                                          var obj = {
                                              filename: data[index],
                                              desc: data[index]
                                          };
                                          only_json_Files.push(obj);
                                        }
                                    }
                                    iterator(index + 1);
                                })
                        }
                    })(0);

                }
            })
  }

function specificCarrierFilesList_Handler(req, res) {

    var flightCarrierName = req.params.carrierName;
    loadflightCarrierFilesList(flightCarrierName, function (err, data) {
        if (err) {
            res.writeHead(503, {"Content-Type": "application/json"});
            errorResp.error = err;
            res.end(JSON.stringify(errorResp) + "\n");
            return;

        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            successResp.data = data;
            res.end(JSON.stringify(successResp) + "\n");
            return;
        }
    })
};

function loadSpecificCarrierFlightInfo(carrier_name, callback) {

   /**
   * based on the shared files we are assuming the folders inside carrier_files are carriers and each directory contains data files in json.
    */
        fs.readdir(config.DATA_FILES_PATH + carrier_name,
            function (err, data) {
                if (err) {
                    callback(err, null);
                    return;
                } else {
                    var path = config.DATA_FILES_PATH + carrier_name + "/";
                    var only_json_Files = [];
                    (function iterator(index) {
                        /**
                         *
                         */
                        if (index == data.length) {
                            /**
                             *
                             * @type {{short_name: *, flights: *}}
                             */
                            var obj = {
                                short_name: carrier_name,
                                flights: only_json_Files
                            };
                            callback(null, obj);
                        } else {
                            fs.stat(path + data[index],
                                function (err, stat) {
                                    if (stat.isFile()) {
                                        /**
                                         *
                                         * @type {{name: *}}
                                         */

                                        var str = data[index].toLowerCase();
                                        if(str.substr(-5, 5) == ".json")
                                        {
                                          var obj = {
                                              filename: data[index],
                                              desc: data[index]
                                          };
                                          only_json_Files.push(obj);
                                        }
                                    }
                                    iterator(index + 1);
                                })
                        }
                    })(0);

                }
            })
  }

var fs = require('fs');
function asyncFileReader(filePath, callback)
{
  fs.readFile(filePath, 'utf8', callback);
}

function readFilesData(flightCarrierName, flightsDataList, callback){

  // makes the list of filenames and pass to the map function.
  var filesList = [];
  flightsDataList.forEach(function (obj) {

     var filePath = config.DATA_FILES_PATH + flightCarrierName +"/"+ obj.filename;
     filesList.push(filePath);
  })

 var dataList = {}

  async.map(filesList, asyncFileReader, function (err, filesData)
  {
      if(!err)
      {
         filesData.forEach(function (data) {

            try{
               extend(dataList, JSON.parse(data));

            }catch (err){
                return console.error(err);
            }

         })
         callback(null, dataList)
      }
      else
      {
        console.log('Error: ' + err);
        callback(-1, result);
      }
  });

}


function specificCarrierFlightInfo_Handler(req, res) {

    var flightCarrierName = req.params.carrierName;
    async.waterfall([
    		function (callback)
  			{
  					loadSpecificCarrierFlightInfo(flightCarrierName, callback);
        },
  			function (respData, callback)
  			{
            var flightsList = respData.flights;
            readFilesData(flightCarrierName, flightsList, callback);
        },
        ], function (err, data) {

         if (err) {
             res.writeHead(503, {"Content-Type": "application/json"});
             errorResp.error = err;
             res.end(JSON.stringify(errorResp) + "\n");
             return;

         } else {
             res.writeHead(200, {"Content-Type": "application/json"});
             successResp.data = data;
             res.end(JSON.stringify(successResp) + "\n");
             return;
         }

    });
};

var flight  = require('../model.js');

function specificCarrierFlightInfoFromDB_Handler(req, res) {

  flight.find({carrier: req.params.carrierName}, function(err, data)
  {
      res.writeHead(200, {"Content-Type": "application/json"});
  
      successResp.data = data;
      res.end(JSON.stringify(successResp) + "\n");
      return;
   })

};


function make_error(err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}
function send_success(res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = {error: null, data: data};
    res.end(JSON.stringify(output) + "\n");
}
function send_failure(res, code, err) {
    var code = (err.code) ? err.code : err.name;
    res.writeHead(code, {"Content-Type": "application/json"});
    res.end(JSON.stringify({error: code, message: err.message}) + "\n");
}
function invalid_resource() {
    return make_error("invalid_resource",
        "the requested resource does not exist.");
}
function no_such_album() {
    return make_error("no_such_album",
        "The specified album does not exist");
}

module.exports.carriersFilesList_Handler                = carriersFilesList_Handler;
module.exports.specificCarrierFilesList_Handler         = specificCarrierFilesList_Handler;
module.exports.specificCarrierFlightInfo_Handler        = specificCarrierFlightInfo_Handler;
module.exports.specificCarrierFlightInfoFromDB_Handler  = specificCarrierFlightInfoFromDB_Handler;
