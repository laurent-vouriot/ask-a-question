/**
 * login.js
 * 
 */
(function () {
	'use strict';
	$(() => {
		$('#form-login').submit(function (){
			let forma = $(this);
			$('#messages').fadeOut();
			$.ajax({
				url    : forma.attr('action'),
				method : forma.attr('method'),
				data   : forma.serialize(),
			}).done(function (data) {
					if (data.success === true){
						window.location.href = '/index.html';
					}
					else {
						$('#messages').html(data.message).fadeIn();
					}
				}).fail(function(){
					//$('body').html("We have a problem Houston&nbsp;!");
				});
			return false;
		});
	})
})();
