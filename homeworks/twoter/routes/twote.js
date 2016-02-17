var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js')

// routes callback
var routes = {};

routes.home = function(req, res) {
  res.render('home', {name: req.session.name});
}

routes.twotes = function(req, res) {
  // find all the twotes and render them
  twote.find({}, function (err, twotes){
    if(err){
      res.status(500).send('Error getting twotes');
    }else{
      // FORMAT: res.render({handlebar file},{data})
      res.render('twotes',{twotes: twotes});
    }
  });
}

routes.loginGET = function(req, res) {
  res.render('login',{});
}

routes.loginPOST = function(req, res) {
  req.session.name = req.body.name;
  res.redirect('/');
}

routes.addTwote = function(req, res) {
  // does not account for adding duplicates
  var twote = req.body;
  var user = req.session.name;
  twote = {user: user, message: twote.message};
  // if (twote.name == "" || twote.name == null || twote.message == "" || twote.message == null){
  //   res.status(500).send('Error adding twote');
  // }
    var t = new Twote(twote);
    t.save(function(err){
      if (err) console.log('Error saving added twote');
      else {
       res.status(200).send(twote); 
      }
    });
}

routes.deleteTwote = function(req, res) {
  var update = req.body;
  Twote.update(update, function(err){
    if (err) console.log('Error editing twote');
    else res.send('Twote edited');
  })
}

routes.logout = function(req, res) {
  res.send('Hell0');
}

module.exports = routes;
