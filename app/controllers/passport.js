// Load passport local
var localStrategy = require('passport-local').Strategy;

//Twitter Strategy
var twitterStrategy = require('passport-twitter').Strategy;

// Facebook Strategy
var facebookStrategy = require('passport-facebook').Strategy;

// Load validator
var validator = require('validator');

//Load user model
var User = require('../model/user');

var tokens = require('../private_tokens/media_tokens');

module.exports = function(passport) {
	// Serialize user
	passport.serializeUser( function( user, done){
		done(null, user.id);
	});

	// Deserialize user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	// Local local-signup strategy
	passport.use('local-signup', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, username, password, done) {
			// checks if username is alpha-numeric
			if (!validator.isAlphanumeric(username)) {
				return done(null, false, req.flash('loginMessage', 'Not valid username!'));
			}

			// Checks if the password is at least 8 characters
			if (password.length < 8) {
				return done(null, false, req.flash('loginMessage', 'Password is less than 8 characters!'));
			}

			process.nextTick(function() {
				User.findOne({'local.username': username}, function(err, user) {
					if (err) { 
						return done(err);
					}

					if (user) {
						return done(null, false, req.flash('loginMessage', 'That username is already in use.'));
					}

					// Creating new User object
					else {
						var newUser = new User();
						newUser.local.username = username;
						newUser.local.password = password;

						newUser.save(function(err) {
							if (err) {
								console.log(err);
							}
							return done(null, newUser, req.flash('loginMessage', 'Registered an account successfully!'));
						});
					}
				});
			});
		}
	)); //end of passport.use('local-signup', new Object({}));

	// Passport local-login
	passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
		function(req, username, password, done) {
			process.nextTick(function() {
				User.findOne({'local.username': username}, function(err, user) {
					if (err) {
						return done(err);
					}
					// Validates if user exists in the database.
					if (!user) {
						return done(null, false, req.flash('loginMessage', 'Invalid username!'));
					}
					// Checks password
					user.validPassword(password, function(err, isMatch) {
						if (isMatch) {
							return done(null, user, req.flash('loginMessage', 'Login successfully!'));
						}
						return done(null, false, req.flash('loginMessage', 'Invalid password!'));
					});
				}); //End of User.findOne({}, callback);
			});
		}
	)); //end of passport.use('local-login', new Object({}));

	// Twitter Strategy
	passport.use(new twitterStrategy({
		consumerKey: tokens.twitter.consumerKey,
		consumerSecret: tokens.twitter.consumerSecret,
		callbackURL: tokens.twitter.callbackUrl ,
		passReqToCallback: true
	},
		function(req, token, tokenSecret, profile, done) {
			process.nextTick(function() {
				User.findOne({'twitter.id': profile.id}, function(err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
					}

					else {
						var newUser = new User();
						newUser.twitter.id = profile.id;
						newUser.twitter.token = token;
						newUser.twitter.tokenSecret = tokenSecret;
						newUser.twitter.displayName = profile.displayName
						newUser.twitter.img = profile.photos[0].value;

						newUser.save(function(err) {
							if (err) {o
								console.log(err);
							}
							return done(null, newUser, req.flash('loginMessage', 'Registered an account successfully!'));
						});
					}
				});
			});
		}
	)); //End of passport.use(new Object, callback)

	// Facebook Strategy
	passport.use(new facebookStrategy({
		clientID: tokens.facebook.clientID,
		clientSecret: tokens.facebook.clientSecret,
		callbackURL: tokens.facebook.callbackUrl,
		passReqToCallback: true
	},
		function(req, accessToken, refreshToken, profile, done) {
			console.log(profile);
			User.findOne({
				'facebook.id': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}

				if (user){ 
					return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
				}

				if (!user) {
					var newFbUser = new User();
					newFbUser.facebook.id = profile.id;
					newFbUser.facebook.displayName = profile.displayName;

					newFbUser.save(function(err) {
						if (err) {
							console.log(err);
						}
						return done(null, newFbUser, req.flash('loginMessage', 'Registered an account successfully'));
					});
				}
			});
		}
	));
}