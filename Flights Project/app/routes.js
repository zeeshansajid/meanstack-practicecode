
var express = require('express');
var router = express.Router();

var helper = require('./handler_module.js');

router.route('/carriers').get(helper.carriersFilesList_Handler)
router.route('/carriers/:carrierName').get(helper.specificCarrierFilesList_Handler)
router.route('/carriers/:carrierName/flightInfo').get(helper.specificCarrierFlightInfo_Handler)
router.route('/carriers/:carrierName/flightInfoDB').get(helper.specificCarrierFlightInfoFromDB_Handler)

module.exports = router;