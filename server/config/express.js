var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var ejs = require('ejs');
var engine = require('ejs-mate');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(app, config){
	app.engine('ejs', engine);
	app.set('view engine', 'ejs'); 
	app.set('views', config.rootPath + '/server/views');

	app.use(express.static('public'));
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	app.use(session({
		resave: true,
		saveUninitialized: true,
		secret: 'multi vision unicorns'
	}));
	app.use(passport.initialize());
	app.use(passport.session());

}

