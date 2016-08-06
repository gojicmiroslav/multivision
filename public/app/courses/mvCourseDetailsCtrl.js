angular.module('app').controller('mvCourseDetailsCtrl', function($scope, mvCachedCourses, $routeParams){

	//$scope.course = mvCourse.get({ _id: $routeParams.id, isArray: false});

	mvCachedCourses.query().$promise.then(function(collection){
		collection.forEach(function(course){
			if(course._id === $routeParams.id){
				$scope.course = course;
			}
		});
	});

});