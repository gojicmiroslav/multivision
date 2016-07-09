var mongoose = require('mongoose');
const crypto = require('crypto');


module.exports = function(config){
	mongoose.connect(config.db);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error...'));
	db.once('open', function callback() {
	  console.log('multivision db opened');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		username: String,
		salt: String,
		hashed_password: String
	});

	userSchema.methods = {
		authenticate: function(password) {
			return hashPassword(this.salt, password) === this.hashed_password
		}
	};

	var User = mongoose.model('User', userSchema);

	User
		.find({})
		.exec(function(err, collection){
			if(collection.length === 0){
				var salt, hash;

				salt = createSalt();
				hash = hashPassword(salt, 'joe');
				User.create({ userName: "Joe", lastName: "Eames", username: "joe", salt: salt, hashed_password: hash });

				salt = createSalt();
				hash = hashPassword(salt, 'john');
				User.create({ userName: "John", lastName: "Papa", username: "john", salt: salt, hashed_password: hash });

				salt = createSalt();
				hash = hashPassword(salt, 'dan');
				User.create({ userName: "Dan", lastName: "Wahlin", username: "dan", salt: salt, hashed_password: hash });
			}
		});
}

function createSalt(){
	return crypto.randomBytes(256).toString('base64');
}

function hashPassword(salt, password){
	var hmac = crypto.createHmac('SHA1', salt);
	return hmac.update(password).digest('hex');
}