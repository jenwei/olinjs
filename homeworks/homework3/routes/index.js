var express = require('express');
var db = require('../fakeDatabase');

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
function Cat(){
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
  var cats = db.getAll();
  res.render('cats', {cats: cats});
};

// make a new cat
var newCat = function(req, res, next){
  var tempCat = Cat();
  db.add(tempCat);
  res.render('add', tempCat);
};

// sort the cats of a color by age
var catsByColor =  function (req, res, next){
  var reqColor = req.params.color;
  var cats = db.getAll();
  var isChosenColor = function(cat){
    return (cat.colors.indexOf(reqColor) > -1);
  }
  var newCats = cats.filter(isChosenColor);
  console.log(newCats);
  newCats = newCats.sort(function(a,b){
    return a.age - b.age; 
  })
  res.render('cats', {cats: newCats});
}

var deleteOld = function (req, res, next){
  var cats = db.getAll();
  var oldestIndex = 0;
  for (i=0; i<cats.length; i++){
    if (cats[i].age > cats[oldestIndex].age) {
      oldestIndex = i;
    }
  }
  db.remove(oldestIndex);
  res.render('deleteOld',cats[oldestIndex]);
}

module.exports.newCat = newCat; 
module.exports.cats = cats;
module.exports.bycolor = catsByColor;
module.exports.deleteOld = deleteOld;