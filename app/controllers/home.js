var mongoose = require('mongoose');
var User = mongoose.model('User');

// module.exports = function (app) {
// 	app.get('/', function(req, res, next) {
// 		User.find(function(err, user) {
// 			res.render('./views/homepage', {
// 				user: 'Akira'
// 			});
// 		});
// 	});
// }