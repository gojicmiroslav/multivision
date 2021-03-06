angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
	return {
		authenticateUser: function(username, password){
			var deferred = $q.defer();

			$http.post('/login', { username: username, password: password }).then(function(response){
				if(response.data.success) {
					var user = new mvUser();
					angular.extend(user, response.data.user);

					//mvIdentity.currentUser = response.data.user;
					mvIdentity.currentUser = user;
					deferred.resolve(true); // succesful login
				} else {
					deferred.resolve(false);
				}
			});

			return deferred.promise;
		},

		logout: function(){
			var deferred = $q.defer();			

			$http.post('/logout', { logout: true }).then(function(){
				mvIdentity.currentUser = undefined;
				deferred.resolve();
			});

			return deferred.promise;
		},

		authorizeCurrentUserForRoute: function(role){
			if(mvIdentity.isAuthorized(role)){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},

		createUser: function(newUser){
			var deferred = $q.defer();	
			var user = new mvUser(newUser);

			user.$save().then(function(){
				mvIdentity.currentUser = user;
				deferred.resolve();
			}, function(response){ // reject promise if fails
				deferred.reject(response.data.reason);
			});	

			return deferred.promise;			
		},

		authorizeAuthenticatedUserForRoute: function(){
			if(mvIdentity.isAuthenticated()){
				return true;
			} else {
				return $q.reject('not authorized');
			}
		},

		updateCurrentUser: function(newUserData){
			var deferred = $q.defer();	

			var userClone = angular.copy(mvIdentity.currentUser);
			// copy new data to clone user object
			angular.extend(userClone, newUserData);
			userClone.$update().then(function(){
				mvIdentity.currentUser = userClone;
				deferred.resolve();
			}, function(response){
				deferred.reject(response.data.err);
			});

			return deferred.promise;
		}
	}
});