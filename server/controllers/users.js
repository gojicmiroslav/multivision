var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection)
	});
};

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed_password = encrypt.hashPassword(userData.salt, userData.password);
	User.create(userData, function(err, user){
		if(err){
			if(err.toString().indexOf('E11000') > -1){
				err = new Error('Duplicate Username');
			}

			res.status(400);
			return res.send({ reason: err.toString() });
		}

		//if no errors
		req.logIn(user, function(err){
			if(err) { return next(err); }
			res.send(user);
		});
	});
};

exports.updateUser = function(req, res, next){
	var userData = req.body;

	// check if current user(logged in user) matches user being updated or it is not admin
	if(req.user._id != userData._id && !req.user.hasRole("admin")){
		res.status("403");
		return res.end();
	}

	// now we can update. We have two object to update: user in DB and current user
	req.user.firstName = userData.firstName;
	req.user.lastName = userData.lastName;
	req.user.username = userData.username;
	if(userData.password && userData.password.length > 0) {
		req.user.salt = encrypt.createSalt();
		req.user.hashed_password = encrypt.hashPassword(req.user.salt, userData.password);
	}

	// now when current user is updated we save in DB
	req.user.save(function(err){
		if(err){
			res.status(400);
			return res.send({ reason: err.toString() });
		}

		res.send(req.user);
	});
};