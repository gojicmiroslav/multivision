angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({
  	enabled: true,
  	requireBase: false
	});

	$routeProvider
		.when('/', { 
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl' 
		})

		.when('/admin/users', { 
			templateUrl: '/partials/admin/user-list',
			controller: 'mvUserListCtrl', 
			resolve: {
				auth: function(mvIdentity, $q) {
					if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('admin') > -1){
						return true;
					} else {
						console.log('not authorized');
						return $q.reject('not authorized');
					}
				}
			}
		});
}]);

/*
calling order:
	- app.config()
	- app.run()
	- directive's compile functions (if they are found in the dom)
	- app.controller()
	- directive's link functions (again, if found)

$rootScope - listen to the route changes events
$location - for redirect
*/
angular.module('app').run(['$rootScope', '$location', function($rootScope, $location){
	console.log('RUN EVENT');
	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
		console.log("ROUTECHANGE EVENT");
		console.log(rejection);
		if(rejection === 'not authorized'){
			$location.path('/'); //redirect to home page
		}
	});
}]);
