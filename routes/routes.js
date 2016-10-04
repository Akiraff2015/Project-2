//Load item model
var Item = require('../app/model/item');

module.exports = function(app, passport){ 
	//Checks if the user is logged in
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}

	// TODO get req object
	app.get('/', function(req, res) {
		// res.render('../app/views/homepage', {user: req.user, isLoggedIn: req.isAuthenticated() });
		res.render('../app/views/homepage', {function() {
			if (!req.isAuthenticated) {
				console.log("hello");
			}

			console.log("hi");
		}});
	});

	app.get('/money_tracker', function(req, res) {
		res.render('../app/views/money_tracker/money_tracker');
	});

	app.get('/money_tracker/add', function(req, res) {
		res.render('../app/views/money_tracker/money_tracker_form');
	});

	app.get('/money_tracker/show', function(req, res) {
		Item.find({}, function(err, item) {
			console.log(item);
			res.render('../app/views/money_tracker/money_tracker_show', {items: item});
		});
	});

	app.post('/money_tracker/add', function(req, res) {
		console.log(req.body);

		var item = new Item();
		item.priceSpent = req.body.totalPriceToSpend;
		item.receiptName = req.body.receiptName;
		item.paymentMethod = req.body.payment;
		item.dateCreated = new Date();

		item.save(function(err, item) {
			if(err) {
				res.json({error: err});
			}
			res.json('ok!');
		});
	});

	//User Managment: login, signup, logout
	app.get('/login', function(req, res) {
		res.render('../app/views/user/login', {});
	});

	app.get('/signup', function(req, res) {
		res.render('../app/views/user/signup', {message: req.flash('loginMessage')});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//PROTOTYPE
	app.get('/success', function(req, res){ 
		res.render('../app/views/user/success', {});
	});

	app.get('/secret', isLoggedIn, function(req, res) {
		res.render('../app/views/user/secret', {message: req.flash('loginMessage')});
	});

	// LOCAL PASSPORT AUTHENTICATION
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/success',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/secret',
		failureRedirect: '/',
		failureFlash: true
	}));

	// If user is registered with twitter account, authenticate
	app.get('/auth/twitter', passport.authenticate('twitter'));

	// Register with twitter account
	app.get('/auth/twitter/callback', passport.authenticate('twitter', {
		successRedirect: '/secret',
		failureRedirect: '/',
		failureFlash: true
	}));

	// If user is registered with facebook account, authenticate
	app.get('/auth/facebook', passport.authenticate('facebook'));

	// Register with facebook account
	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect: '/secret',
		failureRedirect: '/',
		failureFlash: true
	}));
}