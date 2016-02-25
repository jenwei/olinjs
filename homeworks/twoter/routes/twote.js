var path = require('path');
var mongoose = require('mongoose');
var Twote = require('./../models/twoteModel.js');
var User = require('./../models/userModel.js')

// Routes callback
var routes = {};

routes.home = function(req, res) {
  Twote.find({}, function(err, twotes) {
      // Display twotes in reverse post order (from latest to oldest)
      res.render('home', {user: req.session.user, twotes: twotes.reverse()});
    });
}

// Might not need this DANGIT
routes.twotes = function(req, res) {
  // Find all the twotes and render them
  Twote.find({}, function (err, twotes){
    if(err){
      res.status(500).send('Error getting twotes');
    }else{
      // FORMAT: res.render({handlebar file},{data})
      console.log(twotes);
      res.render('twotes',{twotes: twotes});
    }
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
  // var message = req.body.message;
  // var twoter = req.body.user;
  // var curr_user = req.session.user;

  // // In case I need to pass the twote anywhere
  // var twote = {"message":message, "user":twoter};

  // // Only the twoter can delete his/her own twotes
  // if (twoter == curr_user) {
  //   // Find all the twotes and render them
  //   Twote.findOneAndRemove({
  //     $and: [
  //       {'user': twoter},
  //       {'message': message}
  //     ]
  //   }).exec(function{err, twote){
  //     if(err){
  //       res.status(500).send('Error deleting twote');
  //     }else{
  //       res.render('home', {user: req.session.user, twotes: twotes.reverse()});
  //     }
  //   });
  //   Twote.remove(function(err){
  //     if (err) console.log('Error removing twote');
  //     else res.status(200).send(); // NOT SURE WHAT TO SEND HERE
  //   })
  // }
}

routes.logout = function(req, res) {
  req.session.destroy();
  res.redirect('/');
}

module.exports = routes;
