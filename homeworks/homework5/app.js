var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var express = require('express');

var burger = require('./routes/burger.js');
var app = express();
var mongoose = require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create routes
app.get('/ingredients', burger.ingredients);
app.get('/order', burger.order);
app.get('/kitchen', burger.kitchen);
app.post('/addIngredient', burger.addIngredient);
app.post('/outOfStock', burger.outOfStock);
app.post('/editIngredients', burger.editIngredients);
app.post('/submitOrder', burger.submitOrder);
app.post('/completeOrder', burger.completeOrder);

mongoose.connect('mongodb://localhost/test');

app.listen(3000);
