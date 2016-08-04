angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses){
	//sample data
	$scope.courses = mvCachedCourses.query();
});