const crypto = require('crypto');

exports.createSalt = function(){
	return crypto.randomBytes(256).toString('base64');
};

exports.hashPassword = function(salt, password){
	var hmac = crypto.createHmac('SHA1', salt);
	return hmac.update(password).digest('hex');
};