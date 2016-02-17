// default requires 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var express = require('express');
var mongoose = require('mongoose');
var session = require('express-session');
// my file
var twote = require('./routes/twote.js');

//  config all the things
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'bleh',
	resave: false,
	saveUninitialized: false,
	cookie: {}
}));

// create get and post routes
app.get('/', twote.home);
app.get('/twoteFeed', twote.twotes);
app.get('/login', twote.loginGET);

app.post('/login', twote.loginPOST);
app.post('/addTwote', twote.addTwote);
app.post('/deleteTwote', twote.deleteTwote);
app.post('/logout', twote.logout);

// connect to mongoose
mongoose.connect('mongodb://localhost/test');

app.listen(3000);
