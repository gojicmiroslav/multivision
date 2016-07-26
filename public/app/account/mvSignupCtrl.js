angular.module('app').controller('mvSignupCtrl', function($scope, mvAuth, mvNotifier, $location, mvUser){
	$scope.signup = function(){		
		var newUserData = {
			username: $scope.email,
			password: $scope.password,
			firstName: $scope.firstname,
			lastName: $scope.lastname
		};

		console.log("New User Data Password: " + newUserData.password);

		mvAuth.createUser(newUserData).then(function(){
			mvNotifier.notify('User account created');
			$location.path('/');
		}, function(err){ // if pomise fails
			console.log("Promise Fails: " + err);
			mvNotifier.error(err);
		});
	};
});