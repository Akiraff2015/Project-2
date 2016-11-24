const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  priceSpent: {
    type: Number,
    min: 0
  },

  receiptName: {
    type: String
  },

  paymentMethod: {
    type: String
  },

  dateCreated: {
    type: Date
  },

  formatDate: {
    type: String
  }
});

module.exports = mongoose.model('Item', itemSchema);