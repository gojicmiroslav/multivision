var auth = require('./auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('../controllers/users');
var courses = require('../controllers/courses');

module.exports = function(app){

	app.get('/api/users', auth.requiresRole("admin"), users.getUsers);

	app.post('/api/users', users.createUser);
	app.put('/api/users', users.updateUser);

	app.get('/api/courses', courses.getCourses);
	app.get('/api/courses/:id', courses.getCourse);

	app.get('/partials/*', function(req, res){
		// set up path relative to the views directory
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res){
		req.logout();
		res.end();
	});

	// we want to always return JSON from url: /api/*, so if response from server
	// is not in JSON format, we return error
	app.all('/api/*', function(req, res){
		res.send(404);
	});

	app.get('*', function(req, res){
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
}