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

	// Listens to the target of the table row
	$('table').on('click', '.button-delete', function(e){
		//Target the table rows.
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		//Deletes the row.
		row.remove();

		//Calls delete method in AJAX.
		$.ajax({
			url: 'http://localhost:3000/money_tracker/remove/' + id,
			type: 'DELETE',
		});
	});

	$('table').on('click', '.button-edit', function(e) {
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		//TODO: Refactor the code
		var tableClassAttributes = ['.receiptName', '.paymentMethod', '.priceSpent']
		var receiptName = $(row).find('.receiptName').html();
		var paymentMethod = $(row).find('.receiptName').html();
		var priceSpent = $(row).find('.priceSpent').html();

		row.html("<td><input type='text' placeholder=" + receiptName + "></td>");
		row.html("<td><input type='text' placeholder=" + paymentMethod + "></td>");
		row.html("<td><input type='text' placeholder=" + priceSpent + "></td>");

		// tempArr.push($(this).find('td').text());
		// console.log($(row).find('.receiptName').html());

		// console.log(tempArr);

		// console.log(row.text());
		//row.html("test");
	});

});