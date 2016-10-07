const mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
	priceSpent: Number,
	receiptName: String,
	paymentMethod: String,
	dateCreated: Date,
	formatDate: String,
});

module.exports = mongoose.model('Item', itemSchema);