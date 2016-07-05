angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({
  	enabled: true,
  	requireBase: false
	});

	$routeProvider
		.when('/', { 
			templateUrl: '/partials/main',
			controller: 'mvMainCtrl' 
		});
}]);

