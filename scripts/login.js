/**
 * login.js
 * 
 */
(function () {
	'use strict';
	$(() => {
		$('#form-login').submit(function (){
			let form = $(this);
			$('#messages').fadeOut();
			$.ajax({
				url: form.attr('action'),
				method: form.attr('method'),
				data: form.serialize(),
			}).done(function (data) {
                    alert('bonjour');
					if (data.success === true){
						window.location.href = '/index.html';
					}
					else {
						$('#messages').html(data.message).fadeIn();
					}
				}).fail(function(){
					$('body').html("We have a problem Houston&nbsp;!");
				});
			return false;
		});
	})
})();
