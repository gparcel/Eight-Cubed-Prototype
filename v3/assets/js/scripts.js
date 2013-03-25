(function() {
	'use strict';

/*****************************************************************************
Main Control/Navigation
*****************************************************************************/
$('#main-control ol li').on('click', 'a', function(event) {
	var $this = $(this),
		href = $this.attr('href'),
		stage = '.stage-'+href.slice(1);

	$('#main-control ol li').removeClass('on');
	$this.parent('li').addClass('on');

	if (href === '#offers') {
		$('#property-all-snapshot').hide();
		$('#offers').fadeIn('fast');
		updateAggregate(stage);
	} else {
		$('#property-all-snapshot:hidden').fadeIn('fast');
		$('#offers:visible').hide();
		filterProperty(stage);
		updateAggregate(stage);
	}
	event.preventDefault();
});

/*****************************************************************************
Filter Property by Stage
*****************************************************************************/
function filterProperty(stage) {
	switch (stage) {
		case '.stage-all':
			$('#property-all-snapshot').children().removeClass('to-hide').show(350);
			break;
		case '.stage-offer':
			//do nothing
			break;
		default:
			$('#property-all-snapshot').children().addClass('to-hide');
			$('#property-all-snapshot').children(stage).removeClass('to-hide').show(350);
			$('.to-hide').hide(350);
			break;
	}
}

/*****************************************************************************
Update Property Aggregate
*****************************************************************************/
function updateAggregate(stage) {
	var totalValue = $('.badge-property-total-value strong'),
		totalCommission = $('.badge-property-total-commission strong'),
		badgeCount = $('.badge-property-count'),
		currentStage = '.'+stage.slice(7)+'s';

	console.log(currentStage);

	switch (stage) {
		case '.stage-all':
			badgeCount.children('li').removeClass('transparent');
			totalValue.text('$350,962,298');
			totalCommission.text('$5,003,023');
			break;
		case '.stage-proposal':
			badgeCount.children(currentStage).removeClass('transparent').siblings().addClass('transparent');
			totalValue.text('$78,000,000');
			totalCommission.text('$1,170,000');
			break;
		case '.stage-listing':
			badgeCount.children(currentStage).removeClass('transparent').siblings().addClass('transparent');
			totalValue.text('$202,735,000');
			totalCommission.text('$2,609,825');
			break;
		case '.stage-escrow':
			badgeCount.children(currentStage).removeClass('transparent').siblings().addClass('transparent');
			totalValue.text('$70,227,298');
			totalCommission.text('$1,223,198');
			break;
		case '.stage-offers':
			badgeCount.children('li').removeClass('transparent');
			totalValue.text('$350,962,298');
			totalCommission.text('$5,003,023');
			break;
		default:
			// do nothing
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
			$('.dropdown > .dropdown-menu').fadeOut(200).attr('style','');
			next.show().animate({
				marginTop : '15px',
				opacity : 1
			},200);
		} else {
			next.fadeOut(200).attr('style','');
		}
		event.stopPropagation();
		event.preventDefault();
	});

	// closes the menu when an option is selected
	$('.dropdown > .dropdown-menu a').on('click', function(event) {
		var $this = $(this);

		$this
			.parents('.dropdown').children('a:first')
			.parent('.dropdown-menu').fadeOut(200).attr('style','');
		// event.preventDefault();
	});

	// hide dropdown
	$(document).on('click', function() {
		$('.dropdown > .dropdown-trigger + .dropdown-menu').fadeOut(200).attr('style','');
	});
}

/*****************************************************************************
View Property Detail
*****************************************************************************/
function viewDetails() {
	$('.property-snapshot').on('click', function(e) {
		var anchor = $(this),
			h,
			transition = $('.layout-transition');

			h = anchor.attr('href');
			e.preventDefault();
			transition.show().animate({
				top: '0%',
				left: '0%',
				height: '100%',
				width: '100%',
				opacity: 1
			}, 800, 'easeOutExpo', function() {
				window.location = h;
			});
			$('#dashboard').hide();
	});

	$('#dashboard-properties-control .control-add').on('click', function(e) {
		var transition = $('.layout-transition');

			var h = 'property-add.html';
			e.preventDefault();
			transition.show().animate({
				top: '0%',
				left: '0%',
				height: '100%',
				width: '100%',
				opacity: 1
			}, 800, 'easeOutExpo', function() {
				window.location = h;
			});
			$('#dashboard').hide();
	});
}

/*****************************************************************************
Edit Property
*****************************************************************************/
function editProperty() {
	var pbadge = $('.property-badge');

	pbadge.on('click', '.control-edit', function() {
		var $this = $(this);

		$this.parents('.property-badge-view').slideUp('fast').siblings('.property-badge-edit').slideDown('fast');
	});

	pbadge.on('click', '.control-cancel, .control-save', function() {
		$(this).parents('.property-badge-edit').slideUp('fast').siblings('.property-badge-view').slideDown('fast');
	})
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
		var $this = $(this),
			task = $this.parents('li');

		if (task.hasClass('completed')) {
			$this.removeClass('done');
			task.removeClass('completed');
		} else {
			$this.addClass('done');
			task.animate({
				opacity: 0,
				marginTop: -50
			},300,function() {
				task.hide().addClass('completed');
			});
		}
	});
}

function showCompleted() {
	$('.control-view-completed').on('click', function() {
		var $this = $(this);

		if ($this.attr('data-function')==='hide') {
			$this.attr('data-function','show').text('Show Completed').parents('section').find('li.completed').animate({
				opacity: 0,
				marginTop: -50
			},150,function() {
				$this.parents('section').find('li.completed').hide();
			});
		} else {		
			$this.attr('data-function','hide').text('Hide Completed').parents('section').find('li.completed').show().animate({
				opacity: 1,
				marginTop: 0
			},200);
		}
	});
}

function hideCompleted() {
	$(document).ready(function() {
		$('li.completed').animate({
			opacity: 0,
			marginTop: -50
		},500,function() {
			$('li.completed').hide();
		});
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
Section Edit
*****************************************************************************/
function sectionEdit() {
	$('aside .section-control-bottom').on('click', 'button', function() {
		var $this = $(this),
			buttonClass = $this.attr('class');

		switch (buttonClass) {
			case 'control-edit':
				$this.parents('section').addClass('edit');
				break;
			case 'control-done':
				$this.parents('section').removeClass('edit');
				break;
			default:
				// do nothing
				break;
		}

	});
}

/*****************************************************************************
Task Edit
*****************************************************************************/
function taskEdit() {
	$('#tasks, #marketing').on('click','.section-control-bottom button', function() {
		var $this = $(this),
			command = $this.attr('class').slice(8),
			section = $this.parents('section'),
			editMode = section.hasClass('edit');

		if (editMode) {
			section.removeClass('edit').find('ul.task-edit').slideUp('fast').siblings('ul.task-view').slideDown('fast');
		} else {
			section.addClass('edit').find('ul.task-view').slideUp('fast').siblings('ul.task-edit').slideDown('fast');
		}
	});
}

/*****************************************************************************
Remove
*****************************************************************************/
function itemRemove() {
	$('.item-remove').on('click', function() {
		var item = $(this).parent();
		item.animate({
			opacity: 0,
			marginTop: -50
		},300,function() {
			item.hide();
		});
	});
}

/*****************************************************************************
Button Set
*****************************************************************************/
function buttonSet() {
	$('.button-set').on('click','button', function() {
		$(this).addClass('selected').siblings().removeClass('selected');
	});
}


/*****************************************************************************
Initialize
*****************************************************************************/
viewDetails();
dropDown();
progressBar();
showCompleted();
// hideCompleted();
checkBox();
moduleModal();
offerDetails();
editProperty();
taskEdit();
sectionEdit();
itemRemove();
buttonSet();
})();