var mongoose = require('mongoose');

$(document).ready(function() {
	var arrText = ['#signup', '#twitter', '#facebook'];

	arrText.forEach(function(elements) {
		$(elements + '-text').css('display', 'none');
	});

	arrText.forEach(function(elements) {
		$(elements + '-button').hover(function() {
			$(elements + '-text').stop(true, true).fadeToggle('slow');
		});
	});

	// jQuery selector, attach submit
	$("#newReceiptForm").on("submit", function(e) {
		var getTotalPrice = $('#totalPriceToSpend').val();
		var getPaymentMethod = $('input[name=payment]:checked').val();
		e.preventDefault();

		console.log(getTotalPrice, getPaymentMethod);
	});
});