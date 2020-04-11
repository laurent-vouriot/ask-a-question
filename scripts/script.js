/*
 * script.js
 * 02/03/2020 
 *  
 * dernière maj : 24/03/2020
 *
 *
 */

(function  () {
    'use strict';
    $(() => {
        
        class help {

            constructor(id,message){
                this.id      = id;
                this.message = message;
            }
            show() {
                $('#help').html(this.message)
                          .slideDown()
                          .delay(5000)
                          .slideUp();
            }
        }

        /* pour les .fail() des appels ajax */
        function phpError(fic) {
            $('body').html('erreur critique dans le fichier : ' + fic);
        }
//========================================================================
//                  POSER UNE QUESTION
//========================================================================
        /* quand on clique sur le boutons poser une question le formulaire s'affiche pour poser une question */
        $('.button_ask').click( function() {
            $('.form_question').fadeIn();
            $('#button_hide_form').fadeIn();
        });
        $('#button_hide_form').click(function() {
            $('#button_hide_form').fadeOut();
            $('.form_question').slideUp();
        });
        
        $('.form_question').submit(function() {
            let formulaire = $(this);
            $.ajax({
                url    : formulaire.attr('action'),
                method : formulaire.attr('method'),
                data   : formulaire.serialize(),
            }).done(function(data)  {
                if(data.result  === true) {
                    $('.message')
                        .html(data.message)
                        .fadeIn()
                        .delay(2000)
                        .fadeOut();
                } 
                else {
                    $('message').append(data.message);   
                }
            }).fail(function(data) {
                phpError('add_question.php'); 
            });
            return false;
        });
//========================================================================
//              AFFICHER LES REPONSES 
//========================================================================
        $('#hide_answers').click(function() {
                    console.log("ok");
                    $('#div_list_questions').html("");
                });

        /* bouton voire les differentes  questions */
        $('.button_show_questions').one('click',function() {
            $.ajax({
                url    : 'json/get_questions.php',
                method : 'get'
            }).done(function (data) {
                /* afficher les questions */               
                $('#div_list_questions')
                    .append('<h2> Voici les differentes questions qui ont été posées </h2> <p> pour afficher les réponses et/ou répondre à une question, cliquez deux fois dessus</p><br/>')
                    .append('<button id="hide_answers">cacher le formulaire</button>');
                for(let i = 0; i < data.result.length; ++i) {
                    $('#div_list_questions')
                        .append('<span class="' + data.result[i][0] +
                                '" style="border : solid black 1px; padding : 10px">  auteur : '
                                + data.result[i][1]
                                + ', question : '    + data.result[i][2] + '</span><br/>');
                }
                /* on récupère l'id de la question pour pouvoir afficher toutes les réponses  */
                $('span').one('click', function() {
                    let id_q = $(this).attr('class');
                    let form_add_answer ='<form class="form_add_answer" method="post" action="json/add_answer.php?id_q='+ $(this).attr('class') +'"> <p> répondre </p> <input type="textField" name="answer" placeholder="vous avez la réponse ?" required><br/> <button type="submit"> publier </button> </form><br/><div id="message" style="display : none"></div>'
                    /* lorque l'on clique sur une question le formulaire de réponse ainsi que toutes 
                     * les réponses apparaissent 
                     **/ 
                    $('.'+id_q).one('click',function() {
                        let span = $(this);
                        $.ajax({
                            url    : 'json/get_answers.php?id_q='+id_q,
                            method : 'get'
                        }).done(function(data) {
                            span.append('liste des réponses : <br/><br/> ');
                            for(let i=0; i < data.answers.length; ++i) {
                                span.append('auteur : '+ data.answers[i][3]+'<br/>'
                                                       + data.answers[i][2]+'<br/><hr/>');
                            } 
                        }).fail(function () {
                            phpError('get_answers.php');
                        });
                        span.append(form_add_answer+'<br/>');

                        span.append('<img id="refresh" src="src/refresh.png" >');
                        
                       /* actualiser les réponses */
                        $('#refresh').click(function () {
                            $.ajax({
                                url    : 'json/get_answers.php?id_q='+id_q,
                                method : 'get'
                            }).done(function(data) {
                                span.append('auteur : '+ data.answers[data.answers.length-1][3]+'<br/>'
                                                       + data.answers[data.answers.length-1][2]+'<br/><hr/>');
                            }).fail(function () {
                                phpError('get_answers.php');
                            });
                        }); 
//========================================================================
//              REPONDRE A UNE QUESTION
//========================================================================
                        $('.form_add_answer').submit(function() {
                            let form = $('.form_add_answer');
                            $.ajax({
                                url    : form.attr('action'),
                                method : form.attr('method'),
                                data   : form.serialize()
                            }).done(function(data) {
                                if(data.success === true) {
                                    $('#message').html(data.message)
                                                 .fadeIn(2000)
                                                 .fadeOut()
                                                 .css({'color' : '#f8b617'});
                                } else {
                                    $('#message').html(data.message)
                                                 .fadeIn(1000)
                                                 .fadeOut()
                                                 .css({'color' : '#f8b617'});
                                }
                            }).fail(function() { 
                                phpError('add_answer.php');
                            });
                            return false;
                        });
                    });
                });
            }).fail( function() {
                phpError('get_questions.php');
            });
        });
//=======================================================================
//          IMAGES HELP
//=======================================================================
        $('#img_help_1')
          .mouseenter(function () {
            let aide1 = new help(1,"l'aide s'affiche ici !");
            aide1.show();
        });
        $('#img_help_2')
          .mouseenter(function () {
            let aide2 = new help(2,'pour afficher la liste des réponses et/ou  répondre à la question cliquez deux fois dessus<br/> pour actualiser les réponses cliquez sur l\'icone à côte de "liste des réponses"');
            aide2.show();
          });
    })
})();
