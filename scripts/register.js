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
                    $('#form-login')
                        .fadeOut(800);
                    $('.button_register')
                        .fadeOut(800);
                    $('#title')
                        .html("Inscription");
                });
                $('#form_register').submit(function(){
                        let form = $('.form_register'); 
                        $.ajax({
                                url     : form.attr('action'),
                                methode : form.attr('methode'),
                                data    : form.serialize(),
                        }).done(function (data) {
                                alert('bonjour'); 
                        });
                    });
        });
}) ();
