var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
  customer: String,
  ingredients: [String]
});

module.exports = mongoose.model('Order', orderSchema);
