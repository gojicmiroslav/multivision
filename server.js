var express = require('express');
var app = express();

//determine are we in production environment or not
//proccess.env.NODE_ENV - node environment variable, it doesn't have default value
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('ENV: ' + env);

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);


app.listen(config.port, function(){
	console.log('App is listening on port ' + config.port);
});