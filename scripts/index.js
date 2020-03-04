(function() {
    'use strict';
    $(() => {
        $.ajax({
            url: '/json/is_connected.php',
            method: 'get'
        }).done(function (data) {
            if (data) {
                /* le user est connecté */
                $('body').append(
                    $('<button />')
                        .html('Déconnexion')
                        .on('click', function () {
                            $.ajax({
                                url: '/json/logout.php',
                                method: 'get'
                            }).done(function () {
                                window.location.href = '/login.html';
                            });
                        })
                );
            } else {
                /* le user n'est pas connecté */
                window.location.href = '/login.html';
            }
        }).fail(function () {
            $('body').html('Une erreur critique est arrivée.');
        });
    });

}) ();


