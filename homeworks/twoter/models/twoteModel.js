var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  content: String,
  twoter: String,
  postTime: Object
});

module.exports = mongoose.model('Twote', twoteSchema);
