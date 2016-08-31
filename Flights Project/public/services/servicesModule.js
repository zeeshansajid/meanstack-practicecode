angular.module('servicesModule', [])
    .factory('carriersDataService', function ($http) 
    {
       var carriersService = {};

        carriersService.getCarriers = function () {
            return $http.get('/api/carriers');
        };

        carriersService.getCarrierDetails = function (carrierName) {
            return $http.get('/api/carriers/' + carrierName);
        };

        carriersService.getCarriersInfoFromFile = function (carrierName) {
            return $http.get('/api/carriers/' + carrierName + '/flightInfo');
        };

        carriersService.getCarriersInfoFromDB = function (carrierName) {
            return $http.get('/api/carriers/' + carrierName + '/flightInfoDB');
        };

        return carriersService;
    });
