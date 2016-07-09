angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth){
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
});