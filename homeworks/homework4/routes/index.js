var express = require('express');
var db = require('../fakeDatabase');
var CatDB = require('../models/catModel.js');

/* shuffle array function taken from http://stackoverflow.com/
questions/2450954/how-to-randomize-shuffle-a-javascript-array
*/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//function that constructs and returns cat object
function createCat(){
  var possibleColors = ['Black','White','Red','Blue','Grey','Rainbow','Yellow'];
  var possibleNames = ['Orange','Pear','Pineapple','Grapefruit','Tomato','Carrot','Banana'];
  shuffle(possibleColors);
  shuffle(possibleNames);
  var cat = {
    name: possibleNames[0],
    age: Math.floor(Math.random()*20),
    colors: possibleColors.slice(1,3)
  };
  return cat;
}

//get all cat names
var cats = function(req, res, next){
  var cats = CatDB.find({}, function(err,cats){
    if (err){
      res.status(500).send('Error getting all the cats');
    } else{
      res.render('cats', {cats: cats});
    }
  });
};

// make a new cat
var newCat = function(req, res, next){
  var newCat = new CatDB(createCat());
  newCat.save(function(err){
    if (err){
      res.status(500).send('Error creating a cat');
    } else{
      res.render('add', newCat);
    }
  });
};

// sort the cats of a color by age
var catsByColor =  function (req, res, next){
  var filterColor = req.params.color;
  CatDB.find({'colors':filterColor}).sort({'age': -1}).exec(function(err, cat){
    if (err){
      res.status(500).send('Error sorting cats of ' + filterColor + ' color');
    } else{
      res.render('cats', {cats: cat});
    }
  });
}

var deleteOld = function (req, res, next){
  CatDB.findOneAndRemove({}).sort({'age': -1}).exec(function(err, cat){
    if (err){
      res.status(500).send('Error deleting a cat');
    } else{
      res.render('deleteOld', cat);
    }
  })
}

module.exports.newCat = newCat; 
module.exports.cats = cats;
module.exports.bycolor = catsByColor;
module.exports.deleteOld = deleteOld;