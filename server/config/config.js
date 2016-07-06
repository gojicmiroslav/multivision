//The path.normalize() method normalizes the given path, resolving '..' and '.' segments.
var path = require('path');
var rootPath = path.normalize(__dirname + "/../../");

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/multivision',
		port: process.env.PORT || 3030
	},

	production: {
		rootPath: rootPath,
		db: 'mongodb://miroslavy2k:deronje777@ds015335.mlab.com:15335/multivision',
		port: process.env.PORT || 80
	}
}