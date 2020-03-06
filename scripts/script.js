/*
 * script.js
 * 02/03/2020 
 *
 * script jquerry pour la page index du site ask a questions : 
 * - animer le logo 
 * - quand on survole le bouton un cadre s'affiche avec des infos
 * - bouton d'aide que lorsque l'on le survole des infos apparaissent
 */





(function  () {
    'use strict';
    $(() => {
        /*  bouton poser question */
        $('.button_ask').click( function() {
            $('.message')
                .html('test')
                .fadeIn(1000);
        });
        /*      img help        */
        $('.img_help')
          .mouseenter(function () {
            $('.div_help')
                .html('pour poser une question il faut minimum 4 de qi, à la hauteur de ce code')
                .fadeIn(1000) 
           })
          .mouseleave(function () {
            $('.div_help')
                .fadeOut(1000);
        });
   })
})();
