// var mongoose = require('mongoose');

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
	// Don't display form (default)
	$('#expand-quick-form').css('display', 'none');

	// Expands form
	$('#expand-quick-button').on('click', function() {
		$('#expand-quick-form').slideDown(400);
		$('#expand-quick-button').css('display', 'none');
	});

	// Hide form
	$('#hide-form').on('click', function() {
		$('#expand-quick-form').css('display', 'none');
		$('#expand-quick-button').fadeIn('fast');
	});

	$('table').on('click', '.btn', function(e){
		//Table Row --> 
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		//send delete request
		// $.ajax({
		// 	url: 'http://localhost:3000/money_tracker/' + id,
		// 	type: 'DELETE',
		// 	success: "http://localhost:3000/sucess",
		// 	error: "http://localhos:3000/"
		// });
	});


});