var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	//OAuthID: String,
  name: String
  //created: String
});

module.exports = mongoose.model('User', userSchema);
