$(window).load(function () {
	"use strict";
	$('#status').fadeOut();
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({
		'overflow': 'visible'
	});
});
$(function () {
	"use strict";

	/* ---------------------------------------------------------
	 * Background (Backstretch)
	 */

	// $.backstretch([
	// 	"img/background/1.jpg",
	// 	"img/background/2.jpg",
	// 	"img/background/3.jpg"
	// ], {duration: 3800, fade: 1500});
	
	/* ---------------------------------------------------------
	 * WOW
	 */
	
	new WOW({
		 mobile: false,
	}).init();
	
	
	/* ---------------------------------------------------------
	 * Team carousel
	 */
	
	$("#teamCarousel").owlCarousel({
		items: 4,
		itemsTablet: [768,3],
		itemsTabletSmall: [690,2],
		itemsMobile : [480,1]
	});
	
	/* ---------------------------------------------------------
	 * Scroll arrow
	 */
	
	$("#scroll").click(function () {
	 	if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	 		var target = $(this.hash);
	 		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	 		if (target.length) {
	 			$('html,body').animate({
	 				scrollTop: target.offset().top
	 			}, 1200);
	 			return false;
	 		}
	 	}
	 });

	/* ---------------------------------------------------------
	 * Countdown
	 */

	var description = {
		weeks: "weeks",
		days: "days",
		hours: "hours",
		minutes: "minutes",
		seconds: "seconds"
	};
	
	// year/month/day
	var due = $('#countdown-due').html();

	$('#countdown').countdown(due, function (event) {
		$(this).html(event.strftime(
			'<div class="countdown-section"><b>%w</b> <span>' + description.weeks + '</span> </div>' +
			'<div class="countdown-section"><b>%d</b> <span>' + description.days + '</span> </div>' +
			'<div class="countdown-section"><b>%H</b> <span>' + description.hours + '</span> </div>' +
			'<div class="countdown-section"><b>%M</b> <span>' + description.minutes + '</span> </div>' +
			'<div class="countdown-section"><b>%S</b> <span>' + description.seconds + '</span> </div>'
		));
	});

	/* ---------------------------------------------------------
	 * Google maps for cities
	 */

	$(document).ready(function() {
	 
	  $("#cities-carroussel").owlCarousel({
	 
	      autoPlay: 3000, //Set AutoPlay to 3 seconds
	 
	      items : 1,
	      itemsDesktop : false,
	      itemsDesktopSmall : [979,1],
	      itemsTablet : [768,1]
	 
	  }); 

    function initialize() {
      var mapOptions = { 
        center: { lat: 19.528582, lng: 7.975645}, //{ lat: 19.752588, lng: -1.571661}, , 
        zoom: 2
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      // Countries
			var countries = [
				{lat: 14.000228, lng: 100.468376}, // Thailand
				{lat: 53.330034, lng: -6.212053},   // Ireland
				{lat: -11.787581, lng: -77.033873},   // Peru
				{lat: -37.586356, lng: 144.926830},   // Australia
				{lat: 51.708113, lng: -0.433070},   // UK
				{lat: 39.493207, lng: -76.308782},   // US NY 
				{lat: 11.686892, lng: 104.876244},   // Cambodia		 									
				{lat: 50.845719, lng: 4.391315},   // Belgium
				{lat: -34.609072, lng: -58.427977},   // Argentina 		 									
				{lat: 50.710468, lng: -123.729490},   // Canada (Vancouver)		 													
				{lat: 33.818997, lng:  -118.055135},   // US (Los Angeles)		 									
				{lat: 4.524553, lng: -73.983398},   // Colombia		 									
				{lat: 41.528031, lng: 2.113321},   // Spain (Barcelona)		 									
				{lat: -23.561333, lng: -46.649414},   // Brazil (Sao Paolo)		 									
				{lat: 14.000290, lng: 100.468376}, // Thailand (Bangkok 2)	 									
				{lat: -26.136666, lng: 28.176865},   // South Africa (Johannesburg)	 		
				{lat: -41.262714, lng: 174.817345},   // New Zealand (Wellington)
				{lat: 51.816908, lng: -0.257289},   // UK (London 2)
				{lat: 41.495123, lng: -74.593224},   // US (NY 2) 40.390247, -3.685023
				{lat: 40.390247, lng: -3.685023},   // Spain (Madrid) 
				{lat: 34.791564, lng: 9.483860}   // Tunisia
			];

			var marker;

			for (var i=0; i<countries.length; ++i) {
	      marker = new google.maps.Marker({ 
			    position: new google.maps.LatLng(countries[i].lat, countries[i].lng),
			    map: map
				});
			}

    }
    google.maps.event.addDomListener(window, 'load', initialize);	  
	 
	});

	/* ---------------------------------------------------------
	 * Form validation
	 */

	/* Signup form */

	$('#signupForm').bootstrapValidator({
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");
			
			l.start();
			btnText.html("Signing up...");
			
			$.get(form.attr('action'), form.serialize(), function(result) { 
				btnText.html(result.message);							
			}, 'json')
			.always(function() { 
				l.stop(); 
				validator.disableSubmitButtons(true);
			});
		},
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			}
		}
	});

	/* Contact form */

	$( "#contactForm [name='message']" ).click(function() {$( event.target ).val('');})

	$('#contactForm').bootstrapValidator({
		fields: {
			name: {
				validators: {
					notEmpty: {
						message: 'Name cannot be empty'
					},
					stringLength: {
						min: 6,
						max: 30,
						message: 'Name must be more than 6 and less than 30 characters long'
					},
					regexp: {
						regexp: /^[a-zA-Z\s]+$/,
						message: 'Name can only consist alphabetical characters'
					}
				}
			},
			contactEmail: {
				validators: {
					notEmpty: {
						message: 'Email cannot be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
			message: {
				validators: {
					notEmpty: {
						message: 'Message cannot be empty'
					}
				}
			}
		},
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-refresh'
		},
		submitHandler: function (validator, form, submitButton) {
			var l = Ladda.create(submitButton[0]),
				btnText = submitButton.children(".ladda-label");
			
			l.start();
			btnText.html("Sending...");
			

			$.post(form.attr('action'), form.serialize(), function(result) {
			})
			  .done(function() {
			    btnText.html("Sent!");
			  })
			  .fail(function() {
			    btnText.html("Error!");
			  })
			  .always(function() {
			  // Reset form after 5s
				setTimeout(function() {
					btnText.html("Submit");
					$(form[0])[0].reset();
					validator.resetForm();
				}, 5000);

				l.stop(); 
				validator.disableSubmitButtons(true);					
			});

		},
	});
});