/**
 *
 * 06/03/2020
 * register.js 
 *
 * script js avec appel ajax pour l'inscription d'un nouvel utilisateur
 *
 *
 */


(function() {
    'use strict'; 
        $(() => {
            $('.button_register')
                .click(function() {
                    $('.form_register')
                        .fadeIn(1000)
                    $('.form_login')
                        .fadeOut(100);
                    $('.button_register')
                        .fadeOut(100);
                    $('#title')
                        .html("Inscription");
                });
                $('.form_register').submit(function(){
                        let form = $(this); 
                        $.ajax({
                                url     : form.attr('action'),
                                methode : form.attr('method'),
                                data    : form.serialize()
                        }).done(function (data) {
                                if(data.success === true) {
                                    //window.location.href = '/index.html';
                                    $('#message').html(data.message).fadeIn();
                                    $('.form_register').fadeOut();
                                    $('.form_login').fadeIn();
                                    $('#title').html('connexion');
                                }
                                else {
                                    alert("hello"); 
                                    $('#messages').html(data.message).fadeIn();
                                }
                            }).fail(function() {
                                $('body').html('erreur dans register.php'); 
                            });
                        return false
                });
        })
}) ();
