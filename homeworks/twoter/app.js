// default requires 
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var express = require('express');
var mongoose = require('mongoose');

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

// create get and post routes
app.get('/', twote.home);
app.get('/ingredients', twote.ingredients);
app.get('/order', twote.order);
app.get('/kitchen', twote.kitchen);

app.post('/addIngredient', twote.addIngredient);
app.post('/outOfStock', twote.outOfStock);
app.post('/editIngredient', twote.editIngredient);
app.post('/submitOrder', twote.submitOrder);
app.post('/completeOrder', twote.completeOrder);

// connect to mongoose
mongoose.connect('mongodb://localhost/test');

app.listen(3000);
