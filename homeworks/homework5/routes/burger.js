var path = require('path');
var mongoose = require('mongoose');
var Ingredient = require('./../models/ingredientModel.js');
var Order = require('./../models/orderModel.js')

// routes callback
var routes = {};

routes.home = function(req, res) {
  res.render('home', {});
}

routes.ingredients = function(req, res) {
  // find all the ingredients and render them
  Ingredient.find({}, function (err, ingredients){
    if(err){
      res.status(500).send('Error getting ingredients');
    }else{
      // FORMAT: res.render({handlebar file},{data})
      res.render('ingredients',{ingredients: ingredients});
    }
  });
}

routes.order = function(req, res) {
  var data = req.body;
  var customer = 'Bob'; // default name
  var ingredients = [];
}

routes.kitchen = function(req, res) {
  res.send('Hell0');
}

// taken from http://stackoverflow.com/questions/
//6449611/how-to-check-whether-a-value-is-a-number
//-in-javascript-or-jquery
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

routes.addIngredient = function(req, res) {
  // does not account for adding duplicates
  var ingredient = req.body;
  ingredient.inStock = true;
  
  if (ingredient.name == "" || ingredient.name == null
    || ingredient.price == "" || !(isNumber(ingredient.price))){
    res.status(500).send('Error adding ingredient');
  }
  else{
    var i = new Ingredient(ingredient);
    i.save(function(err){
      if (err) console.log('Error saving added ingredient');
      else res.status(200).send(ingredient);
    });
  }
}

routes.outOfStock = function(req, res) {
  res.send('Hell0');
}

routes.editIngredient = function(req, res) {
  var update = req.body;
  Ingredient.update(update, function(err){
    if (err) console.log('Error editing ingredient');
    else res.send('Ingredient edited');
  })
}

routes.submitOrder = function(req, res) {
  res.send('Hell0');
}

routes.completeOrder = function(req, res) {
  res.send('Hell0');
}


module.exports = routes;
