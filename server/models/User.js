var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
	firstName: { type: String, required: '{PATH} is required!' },
	lastName: { type: String, required: '{PATH} is required!' },
	username: { 
		type: String,
		required: '{PATH} is required',
		unique: true
	},
	salt: { type: String, required: '{PATH} is required!' },
	hashed_password: { type: String, required: '{PATH} is required!' },
	roles: [String] // array of roles
});

userSchema.methods = {
	authenticate: function(password) {
		return encrypt.hashPassword(this.salt, password) === this.hashed_password
	},

	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers(){
	User
		.find({})
		.exec(function(err, collection){
			if(collection.length === 0){
				var salt, hash;

				salt = encrypt.createSalt();
				hash = encrypt.hashPassword(salt, 'joe');
				User.create({ firstName: "Joe", lastName: "Eames", username: "joe", salt: salt, 
							   hashed_password: hash, roles: ["admin"] });

				salt = encrypt.createSalt();
				hash = encrypt.hashPassword(salt, 'john');
				User.create({ firstName: "John", lastName: "Papa", username: "john", salt: salt, 
								hashed_password: hash, roles: [] });

				salt = encrypt.createSalt();
				hash = encrypt.hashPassword(salt, 'dan');
				User.create({ firstName: "Dan", lastName: "Wahlin", username: "dan", salt: salt, hashed_password: hash });
			}
		});
}

exports.createDefaultUsers = createDefaultUsers;