var app = angular.module('controllersModule', ['servicesModule']);

    app.controller('carriersController', function ($scope, carriersDataService) {

        var getDataPromise = carriersDataService.getCarriers();

        getDataPromise.success(function (data) {
            $scope.carriers = data.data;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });

    });

    app.controller('carrierDetailsController', function ($scope, carriersDataService, $routeParams) {

        $scope.flightId = $routeParams.flightId;
        var getDataPromise = carriersDataService.getCarrierDetails($routeParams.flightId);
        
        getDataPromise.success(function (data) {
            $scope.flightDetails = data.data.flights;
        });

        getDataPromise.error(function (data, status) {
            $scope.errorMessage = status;
        });
    })

   app.controller('flightInfoFromFileController', function ($scope, carriersDataService, $routeParams) {

      var getDataPromise = carriersDataService.getCarriersInfoFromFile($routeParams.flightId);

      getDataPromise.success(function (data) {
         var colNames = data.data[Object.keys(data.data)[0]];
         $scope.colNames = Object.keys(colNames);

         $scope.flightDetails = data.data;
      });

      getDataPromise.error(function (data, status) {
         $scope.errorMessage = status;
      });
   })

app.controller('flightInfoFromDBController', function ($scope, carriersDataService, $routeParams) {

   var getDataPromise = carriersDataService.getCarriersInfoFromDB($routeParams.flightId);

   getDataPromise.success(function (data) {
      var colNames = data.data[Object.keys(data.data)[0]];
      $scope.colNames = Object.keys(colNames);
      
      $scope.flightDetails = data.data;
     
   });

   getDataPromise.error(function (data, status) {
      $scope.errorMessage = status;
   });
})
