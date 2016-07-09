angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth){
	$scope.identity = mvIdentity;	

	$scope.signIn = function(username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success) {
				mvNotifier.notify('Login in successfuly');
			} else {
				mvNotifier.notify('Username/password combination incorrect');
			}
		});
	}

	$scope.signout = function(){
		console.log('LOGOUT');
		mvAuth.logout().then(function(){
			$scope.username = "";
			$scope.password = "";
			mvNotifier.notify("You have successfully logged out!");
			$location.path('/'); //redirect to home page
		});
	}

});