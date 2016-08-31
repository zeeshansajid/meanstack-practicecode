var app = angular.module("app", ['controllersModule', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/viewCarriers', {
            templateUrl: 'templates/viewCarriers.html',
            controller: 'carriersController'
        })
        .when('/viewFlights/:flightId', {
            templateUrl: 'templates/carrierDetails.html',
            controller: 'carrierDetailsController'
        })
        .when('/viewFlights/:flightId/flightInfo', {
           templateUrl: 'templates/flightInfo.html',
           controller: 'flightInfoFromFileController'
        })
        .when('/viewFlights/:flightId/flightInfo2', {
           templateUrl: 'templates/flightInfo.html',
           controller: 'flightInfoFromDBController'
        })
        .otherwise({
            redirectTo: '/viewCarriers'
        });
});
