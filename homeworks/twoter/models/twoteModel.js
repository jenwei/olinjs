var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  message: String,
  user: String,
});

module.exports = mongoose.model('Twote', twoteSchema);
