var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	local: {
		username: String,
		password: String
	},

	facebook: {
		id: String,
		token: String,
		email: String,
		displayName: String
	},

	twitter: {
		id: String,
		token: String,
		secret: String,
		displayName: String,
		username: String,
		img: String
	}
});

userSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('local.password')) { 
		return next();
	}
	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.local.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.local.password = hash;
			next();
		});
	});
});

userSchema.methods.validPassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.local.password, (err, isMatch) => {
		cb(err, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);