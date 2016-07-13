angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){

	// since mvUser is resource we can define a query for that resource
	$scope.users = mvUser.query();
	console.log($scope.users);
});