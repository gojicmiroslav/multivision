var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var ejs = require('ejs');
var engine = require('ejs-mate');

module.exports = function(app, config){
	app.engine('ejs', engine);
	app.set('view engine', 'ejs'); 
	app.set('views', config.rootPath + '/server/views');

	app.use(express.static('public'));
	app.use(morgan('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

}

