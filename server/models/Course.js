var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
	title: { type: String, required: '{PATH} is required!' },
	featured: { type: Boolean, required: '{PATH} is required!' },
	published: { type: Date, required: '{PATH} is required!' },
	tags: [String]
});

// make model based on the schema
var Course = mongoose.model('Course', courseSchema);

// create default course if not any in DB
function createDefaultCourses(){
	Course
		.find({})
		.exec(function(err, collection){
			if(collection.length === 0) {
				Course.create({ title: "C# for Sociopaths", featured: true, published: new Date('1/1/2015'), tags: ['C#'] }); 
				Course.create({ title: "C# for Non-Sociopaths", featured: true, published: new Date('3/1/2015'), tags: ['C#'] }); 
				Course.create({ title: "Supe Duper Expert for C#", featured: true, published: new Date('12/12/2014'), tags: ['C#', 'expert', 'Expert'] }); 
				Course.create({ title: "Visual Basic for Visual Basic Developers", featured: false, published: new Date('10/11/2014'), tags: ['Visual Basic', 'developers'] }); 
				Course.create({ title: "Pedantic C++", featured: true, published: new Date('12/12/2014'), tags: ['C++'] }); 
				Course.create({ title: "JavaScript for people over 20", featured: true, published: new Date('5/6/2016'), tags: ['JavaScript'] }); 
				Course.create({ title: "Maintable code for cowards", featured: false, published: new Date('11/11/2015'), tags: ['Code', 'code'] }); 
				Course.create({ title: "A Survival Gode to Code Reviews", featured: true, published: new Date('11/2/2015'), tags: ['Code', 'code', 'reviews', 'Reviews'] }); 
				Course.create({ title: "How to Job Hunt Without Alerting your Boss", featured: true, published: new Date('3/2/2015'), tags: ['Job', 'job'] }); 
				Course.create({ title: "How to keep your Soul and go into Management", featured: false, published: new Date('9/1/2015'), tags: ['Management', 'management'] }); 
				Course.create({ title: "Telling Recruiters to Leave You Alone", featured: true, published: new Date('2/1/2015'), tags: ['Alone'] }); 
				Course.create({ title: "Code Reviews", featured: false, published: new Date('3/4/2014'), tags: ['Code', 'code', 'Reviews', 'reviews'] }); 
				Course.create({ title: "Writing Code", featured: true, published: new Date('11/4/2015'), tags: ['Code', 'code'] }); 
				Course.create({ title: "How to Deal with Coworkers", featured: false, published: new Date('3/8/2014'), tags: ['Coworkers'] }); 
				Course.create({ title: "Code for Fun", featured: true, published: new Date('3/4/2016'), tags: ['Code', 'code', 'Fun', 'fun'] }); 			
			}
		});
}

exports.createDefaultCourses = createDefaultCourses;

