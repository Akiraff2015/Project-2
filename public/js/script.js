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

	// Delete function.
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
			type: 'DELETE'
		});
	});

	// Edit button
	$('table').on('click', '.button-edit', function(e) {
		//Targets the row
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		var tableRowArray = ['.receiptName', '.paymentMethod', '.priceSpent', '.dateCreated'];
		var tableRowValues = [];

		//Temporary stores formatted attribute
		tableRowArray.forEach(function(elements) {
			tableRowValues.push($(row).find(elements).html());
		});
		var updateButtonGroup = '<div class="btn-group">' +
									'<div class="btn btn-success button-update">' +
										'<i class="fa fa-check" aria-hidden="true"></i>' +
									'</div>' +
									'<div class="btn btn-danger button-cancel">' +
										'<i class="fa fa-remove" aria-hidden="true"></i>' +
									'</div>' +
								'</div>';

		row.html("<td><input class='getUpdateReceiptName' type='text' name='updateReceiptName' value='" + tableRowValues[0] + "'></td>" +
				"<td><input class='getUpdatePaymentMethod'type='text' name='updatePaymentMethod' value='" + tableRowValues[1] + "'></td>" +
				"<td><input class='getUpdatePriceSpent' type='text' name='updatePriceSpent' value='" + tableRowValues[2].split(" ").splice(1, 1)[0] + "'></td>" +
				"<td class='getUpdateDate'>" + tableRowValues[3] + "</td>" +
				"<td>" + updateButtonGroup + "</td>"
		);
	});

	// Update button
	$('table').on('click', '.button-update', function(e) {
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		// Gets the values from the table
		var getReceiptName = $('.getUpdateReceiptName').val();
		var getPaymentMethod = $('.getUpdatePaymentMethod').val();
		var getPriceSpent = $('.getUpdatePriceSpent').val();
		// var getDate = $('.getUpdateDate').text();

		$.ajax({
			url: 'http://localhost:3000/money_tracker/update/' + id,
			type: 'PUT',
			data: {
				receiptName: getReceiptName,
				paymentMethod: getPaymentMethod,
				priceSpent: getPriceSpent,
			}
		});
	});

	// Cancel button
	$('table').on('click', '.button-cancel', function(e) {
		var row = e.target;
		row = $(row).parents('tr');
		var id = $(row).data('id');

		var cancelButtonGroup = '<div class="btn-group">' +
									'<div class="btn btn-danger button-delete">' +
										'<i class="fa fa-trash-o" arian="true"></i>' +
									'</div>' +
									'<div class="btn btn-primary button-edit">' +
										'<i class="fa fa-pencil" arian="true"></i>' +
									'</div>' +
								'</div>';

		// TODO: refactor code
		row.html("<td class='receiptName'>" + $(row).find('.getUpdateReceiptName').val() + "</td>" +
			"<td class='paymentMethod'>" + $(row).find('.getUpdatePaymentMethod').val() + "</td>" +
			"<td class='priceSpent'>" + "HK$ " + $(row).find('.getUpdatePriceSpent').val() + "</td>" +
			"<td class='dateCreated'>" + $(row).find('.getUpdateDate').text() + "</td>" +
			"<td class='buttonGroup'>" + cancelButtonGroup + "</td>"

		);
	});
});