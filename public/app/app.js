angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

	var routeRoleChecks = {
		admin: {
			auth: function(mvAuth) {
				return mvAuth.authorizeCurrentUserForRoute('admin');
			}
		},
		user: {
			auth: function(mvAuth) {
				return mvAuth.authorizeAuthenticatedUserForRoute();
			}
		}
	};

	$routeProvider
		.when('/', { 
			templateUrl: '/partials/main/main',
			controller: 'mvMainCtrl' 
		})

		.when('/admin/users', { 
			templateUrl: '/partials/admin/user-list',
			controller: 'mvUserListCtrl', 
			resolve: routeRoleChecks.admin
		})

		.when('/signup', { 
			templateUrl: '/partials/account/signup',
			controller: 'mvSignupCtrl'
		})

		.when('/profile', { 
			templateUrl: '/partials/account/profile',
			controller: 'mvProfileCtrl',
			resolve: routeRoleChecks.user
		})

		.when('/courses', { 
			templateUrl: '/partials/courses/course-list',
			controller: 'mvCourseListCtrl'
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
