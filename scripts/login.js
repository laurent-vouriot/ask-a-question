/**
 * login.js
 * 
 */
(function () {
	'use strict';
	$(() => {

            /* login */

		$('.form_login').submit(function (){
			let form = $(this);
			$('#messages').fadeOut();
			$.ajax({
				url    : form.attr('action'),
				method : form.attr('method'),
				data   : form.serialize(),
			}).done(function (data) {
					if (data.success === true){
						window.location.href = '/index.html';
					}
					else {
						$('#messages').html(data.message).fadeIn();
					}
				}).fail(function(){
					$('body').html("erreur dans login.php");
				});
			return false;
		});

            /* register */


            $('.button_register')
                    .click(function() {
                            $('.form_register').fadeIn(1000)
                            $('.form_login').fadeOut();
                            $('.button_register').fadeOut();
                            $('#title').html("Inscription");
                            $('#messages').fadeOut();
                    });
            $('.form_register').submit(function(){
                    let form = $(this); 
                    $.ajax({
                            url     : form.attr('action'),
                            methode : form.attr('method'),
                            data    : form.serialize(),
                    }).done(function (data) {
                            if(data.success === true) {
                                    //window.location.href = '/index.html';
                                    $('#messages').html(data.message).fadeIn();
                                    $('.form_register').fadeOut();
                                    $('.form_login').fadeIn();
                                    $('#title').html('Connexion');
                            }
                            else {
                                    alert('il se passe quelque chose d\'anormal');
                            }
                    }).fail(function() {
                            $('body').html('erreur dans register.php'); 
                    });
                    return false
            });
    })


})();
