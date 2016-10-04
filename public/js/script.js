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
});