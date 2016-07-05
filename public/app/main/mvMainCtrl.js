angular.module('app').controller('mvMainCtrl', function($scope){
	//sample data
	$scope.courses = [
		{ name: "C# for Sociopaths", featured: true, published: new Date('1/1/2015')},
		{ name: "C# for Non-Sociopaths", featured: true, published: new Date('1/3/2015')},
		{ name: "Supe Duper Expert for C#", featured: true, published: new Date('3/1/2015')},
		{ name: "Visual Basic for Visual Basic Developers", featured: false, published: new Date('10/11/2015')},
		{ name: "Pedantic C++", featured: true, published: new Date('12/12/2014')},
		{ name: "JavaScript for people over 20", featured: true, published: new Date('5/6/2016')},
		{ name: "Maintable code for cowards", featured: true, published: new Date('11/11/2015')},
		{ name: "A Survival Gode to Code Reviews", featured: true, published: new Date('11/2/2015')},
		{ name: "How to Job Hunt Without Alerting your Boss", featured: true, published: new Date('3/2/2015')},
		{ name: "How to keep your Soul and go into Management", featured: false, published: new Date('6/7/2015')},
		{ name: "Telling Recruiters to Leave You Alone", featured: true, published: new Date('8/7/2015')},
		{ name: "Code Reviews", featured: true, published: new Date('9/1/2015')},
		{ name: "Writing Code", featured: false, published: new Date('11/2/2015')},
		{ name: "How to Deal with Coworkers", featured: true, published: new Date('4/9/2014')},
		{ name: "Code for Fun", featured: true, published: new Date('5/3/2016')}
	];
});