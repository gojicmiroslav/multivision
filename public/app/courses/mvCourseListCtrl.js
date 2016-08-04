angular.module('app').controller('mvCourseListCtrl', function($scope, mvCourse){
	console.log('mvCourseListCtrl');
	$scope.courses = mvCourse.query();
});