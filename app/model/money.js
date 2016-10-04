var mongoose = require('mongoose');

var moneySchema = mongoose.Schema({
	totalToSpend: Number,
	totalSpent: []
});

module.exports = mongoose.model('Money', moneySchema);