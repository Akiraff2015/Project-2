var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	priceSpent: Number,
	receiptName: String,
	paymentMethod: String,
	dateCreated: Date
});

module.exports = mongoose.model('Item', itemSchema);