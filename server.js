var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

//determine are we in production environment or not
//proccess.env.NODE_ENV - node environment variable, it doesn't have default value
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('ENV: ' + env);

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
var User = mongoose.model('User');

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({ username: username }).exec(function(err, user){
			if(user && user.authenticate(password)) { // if user found
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	}
));

passport.serializeUser(function(user, done){
	if(user){
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done){
	User.findOne({ _id: id }).exec(function(err, user){
		if(user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	});
});

require('./server/config/routes')(app);


app.listen(config.port, function(){
	console.log('App is listening on port ' + config.port);
});