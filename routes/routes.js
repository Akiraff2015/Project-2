//Load item model
var Item = require('../app/model/item');

//Validator
const validator = require('validator');

//Moment.js
const moment = require('moment');

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

	// Updates the data
	app.put('/money_tracker/update/:id', function(req, res) {
		var id = req.params.id;
		Item.findByIdAndUpdate(id, {
			receiptName: req.body.receiptName,
			paymentMethod: req.body.paymentMethod,
			priceSpent: req.body.priceSpent
		}, function(err) {
			if (err) throw err
			console.log("Updated!");
;		});
	});

	//Deletes the item schema by id.
	app.delete('/money_tracker/remove/:id', function(req, res) {
		var id = req.params.id;
		Item.findByIdAndRemove(id, function(err) {
			if (err) throw err;
			console.log("Have been deleted!");
		});
	});

	app.get('/money_tracker', function(req, res) {
		res.render('../app/views/money_tracker/money_tracker');
	});

	app.get('/money_tracker/add', function(req, res) {
		res.render('../app/views/money_tracker/money_tracker_form');
	});

	app.get('/money_tracker/dashboard', function(req, res) {

		Item.find({}, {}, function(err, items) {
			console.log(items);
			res.render('../app/views/money_tracker/money_tracker_dashboard', {});
		});
	});

	app.get('/money_tracker/show', function(req, res) {
		console.log(moment().format('L'));
		var differenceDate = 0;

		//Find the oldest collection in database.
		Item.findOne({}, {}, {sort: {'dateCreated': 1}}, function(err, data) {
			var oldestDate = data.dateCreated;
			var todayDate = moment();
			differenceDate = todayDate.diff(oldestDate, 'days') + 1;

			console.log("hello: ", differenceDate);
		});
		/*					TODO
			> Find the oldest date in mongoose
			> Calculate the oldest date with today's date
			> Find the difference
			> Use the difference and throw into object
		*/
		// Item.findOne({}, {}, {sort: {'created_at': 1}}, function(err, data) {
		// 	 a = data.dateCreated;

		// 	res.render('../app/views/money_tracker/money_tracker_show', {
		// 		date: data.dateCreated
		// 	});
		// });

		Item.find({}, function(err, items) {
			var totalPrice = 0;
			var totalPriceSpent = items.forEach(function(elements) {
				totalPrice += Number(elements.priceSpent);
			});

			var roundTotalPrice = totalPrice.toFixed(2);
			var countDays = 3;
			var averageMoney = roundTotalPrice/countDays;

			//round the number
			var roundAverageMoney = averageMoney.toFixed(2);

			res.render('../app/views/money_tracker/money_tracker_show', {
				items: items,
				roundTotalPrice,
				roundAverageMoney,
				dayTimeDifference: countDays
			});
		});
	});

	app.post('/money_tracker/add', function(req, res) {
		console.log(req.body);
		//Checks if there is any data inside of text input
		if (req.body.totalPriceToSpend.length > 0 && req.body.receiptName.length > 0) {
			var item = new Item();
			item.priceSpent = req.body.totalPriceToSpend;
			item.receiptName = req.body.receiptName;
			item.paymentMethod = req.body.payment;
			item.dateCreated = new Date();

			//moment.(new Date).format("L") => DD/MM/YYYY format
			item.formatDate = moment(item.dateCreated).format("L");

			item.save(function(err, item) {
				if(err) {
					res.json({error: err});
				}
				res.redirect('/money_tracker/show');
			});
		}
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