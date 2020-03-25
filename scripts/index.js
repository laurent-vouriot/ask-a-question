/**
 *
 * index.js
 * deconnexion
 * 
 */

(function() {
    'use strict';
    $(() => {
        $.ajax({
            url: '/json/is_connected.php',
            method: 'get'
        }).done(function (data) {
                if (data.is_connected) {
                /* le user est connecté on ajoute le bouton déconnexion */
                    $('.li_logout')
                        .mouseenter(function() {
                            $(this)
                                .css({'background-color' : '#555'})
                        }) 
                        .mouseleave(function() {
                            $(this)
                                .css({'background-color' : '#f8b617'})
                                
                        }) 
                        .on('click', function () {
                            $.ajax({
                                url: '../json/logout.php',
                                method: 'get'
                            }).done(function () {
                                window.location.href = '/login.html';
                            });
                        }) 
                        /* on ajoute le pseudo du user connecté */
                        $('.div_user').append("connecté en tant que : " + data.username);
                } else {
                /* le user n'est pas connecté */
                window.location.href = '/login.html';
            }
        }).fail(function () {
            $('body').html('Une erreur critique est arrivée.');
        });
    });
}) ();


