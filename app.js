// Dependencies
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var underscore = require('underscore');

// Initialize app
var app = express();

//Connect with Mongo DB
mongoose.connect('mongodb://localhost/music-dashboard');

//Setup socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Initialize middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup Sessions
app.use(session( { secret: 'ilovewdi'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Setup local-strategy
require('./app/controllers/passport')(passport);

//Socket controller
// var socketio = require('./controller/socketio')(app, io);

//Routes
require('./routes/routes')(app, passport);

//Port 3000
server.listen(3000, function(){
	console.log('Started http://127.0.0.1:3000/');
});