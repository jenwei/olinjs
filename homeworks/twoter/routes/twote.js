var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js')

// Routes callback
var routes = {};

// Error Handler courtesy of Fillipos (@flymperopoulos)
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('err', {error: err});
}


routes.home = function(req, res) {
  Twote.find({}, function(err, twotes) {
      // Display twotes in reverse post order (from latest to oldest)
      res.render('home', {user: req.session.user, twotes: twotes.reverse()});
    });
}

routes.loginGET = function(req, res) {
  res.render('login',{});
}

routes.loginPOST = function(req, res) {
  req.session.user = req.body.user;
  res.redirect('/');
}

routes.addTwote = function(req, res) {
  var twote = req.body;
  twote = {user: req.session.user, message: twote.message};

  // Check that both name and message have content or don't do anything except send an error
  // if (twote.name == "" || twote.name == null || twote.message == "" || twote.message == null){
  //   res.status(500).send('Error adding twote');
  // }
  var t = new Twote(twote);
  t.save(function(err){
    if (err) console.log('Error saving added twote');
    res.status(200).send(twote); 
  }); 
}

routes.deleteTwote = function(req, res) {
  var delID = req.body.twoteToDelete; // ID of twote clicked to delete

  Twote.findOneAndRemove({"_id": delID}, function(err, data) {
    if (err){
      errorHandler();
    }
    res.status(200).end();
    
  })
}

routes.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = routes;
