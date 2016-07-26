var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users');

module.exports = function(app){

	app.get('/api/users', auth.requiresRole("admin"), users.getUsers);

	app.post('/api/users', users.createUser);

	app.get('/partials/*', function(req, res){
		// set up path relative to the views directory
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

	app.get('*', function(req, res){
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
}