(function() {
	'use strict';

/*****************************************************************************
Hide Address Bar For Mobile Devices
*****************************************************************************/
// When ready...
window.addEventListener("load",function() {
	// Set a timeout...
	setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});


// window.location.assign(index.html);

	// $('.property-snapshot').on('click', function() {
	// 	$(this).children('.snapshot-thumb').css({
	// 		position: 'absolute',
	// 		top: 200,
	// 		left: 50,
	// 		margin: 0,
	// 		index: 2
	// 	});
	// 	$(this).children('.snapshot-thumb').animate({
	// 		top: 0,
	// 		left: 0,
	// 		height: $(document).height(),
	// 		width: $(document).width()
	// 	})
	// });

/*****************************************************************************
Main Control/Navigation
*****************************************************************************/
$('#main-control').on('click', 'li', function(event) {
	var $this = $(this),
		stage = '.stage-'+$this.children('a').attr('href').slice(1);

	$('#main-control li').removeClass('on');
	$this.addClass('on');
	filterProperty(stage);


	event.preventDefault();
});

/*****************************************************************************
Filter Property by Stage
*****************************************************************************/
function filterProperty(stage) {
	switch (stage) {
		case '.stage-all':
			$('#property-all-snapshot').children().removeClass('to-hide').show('medium');
			break;
		case '.stage-offer':
			//do nothing
			break;
		default:
			$('#property-all-snapshot').children().addClass('to-hide');
			$('#property-all-snapshot').children(stage).removeClass('to-hide').show('medium');
			$('.to-hide').hide('medium');
			break;
	}
}

/*****************************************************************************
Drop Down
*****************************************************************************/
function dropDown() {
	$('.dropdown > .dropdown-trigger').on('click', function(event) {
		var next = $(this).next();

		if (next.css('display') === 'none') {
			// hide all other menu except 'this'
			$('.dropdown > .dropdown-menu').hide();
			next.slideDown(200);
		} else {
			next.fadeOut(200);
		}
		event.stopPropagation();
		event.preventDefault();
	});

	// closes the menu when an option is selected
	$('.dropdown > .dropdown-menu a').on('click', function(event) {
		var $this = $(this);

		$this
			.parents('.dropdown').children('a:first')
			.parent('.dropdown-menu').fadeOut(200);
		event.preventDefault();
	});

	// hide dropdown
	$(document).on('click', function() {
		$('.dropdown > .dropdown-trigger + .dropdown-menu').fadeOut(200);
	});
}

/*****************************************************************************
Progress Bar
*****************************************************************************/
function progressBar() {
	$('#progress').on('click', 'li', function() {
		$(this).addClass('selected').siblings('li').removeClass('selected');
	});
}

/*****************************************************************************
Tasks & Marketing Task
*****************************************************************************/
function checkBox() {
	$('section').on('click', '.task-checkbox', function() {
		var task = $(this).parents('li');

		if (task.hasClass('completed')) {
			task.removeClass('completed')
		} else {
			task.addClass('completed');
		}
	});
}

/*****************************************************************************
Offer Details
*****************************************************************************/
function offerDetails() {
	$('#offer-matrix').on('click','.offer-matrix-item', function() {
		$('.modal').fadeIn('fast').addClass('on');
	});
}

/*****************************************************************************
Modal
*****************************************************************************/
function moduleModal() {
	$('.modal').on('click','.control-close', function() {
		$(this).parents('.modal').fadeOut('fast').removeClass('on');
	});
	$('.modal-background').on('click', function() {
		$(this).parent('.modal').fadeOut('fast').removeClass('on');
	})
}

/*****************************************************************************
Initialize
*****************************************************************************/
dropDown();
progressBar();
checkBox();
moduleModal();
offerDetails();

})();