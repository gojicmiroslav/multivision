module.exports = function(app){
	app.get('/partials/*', function(req, res){
		// set up path relative to the views directory
		res.render('../../public/app/' + req.params[0]);
	});

	app.get('*', function(req, res){
		res.render('index');
	});
}