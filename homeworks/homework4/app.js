var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var index = require('./routes/index');
var app = express();
var mongoose = require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cats/new', index.newCat);
app.get('/cats', index.cats);
app.get('/cats/bycolor/:color', index.byColor);
app.get('/cats/delete/old', index.deleteOld);
app.get('/cats/favorites', index.favorites);

mongoose.connect('mongodb://localhost/test');

app.listen(3000);
