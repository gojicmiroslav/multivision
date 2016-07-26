var passport = require('passport');

exports.authenticate = function(req, res, next){
	req.body.username = req.body.username.toLowerCase();

	var auth = passport.authenticate('local', function(err, user){
		if(err) { return next(err); }

		if(!user) { res.send({ success: false }) }

		req.logIn(user, function(err){
			if(err) { return next(err); }

			res.send({ success: true, user: user});
		})
	});

	auth(req, res, next);
}

// we use in routes.js
exports.requiresApiLogin = function(req, res, next){ // only admin can access this route
	if(!req.isAuthenticated()) {
		res.status(403);
		res.end();
	} else {
		next();
	}
}

exports.requiresRole = function(role){
	return function(req, res, next){
		// req.user - currently authenticated user
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
			res.status(403);
			res.end();
		} else {
			next();
		}
	}
}