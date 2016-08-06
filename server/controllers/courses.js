var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res){
	Course.find({}).exec(function(err, collection){
		res.send(collection);
	});
}

exports.getCourse = function(req, res, next){
	Course.findOne({ _id: req.params.id }, function(err, course){
		console.log(course);
		if(err) return next(err);
		res.send(course);
	});
}

