/*
 * script.js
 * 02/03/2020 
 *  
 *  dernière maj : 24/03/2020
 *
 *
 */

(function  () {
    'use strict';
    $(() => {
        


        

        
        class help {
            id      = 0;
            message = "";

            constructor(id,label){
                this.id = id;
                this.label = label;
            }
            show() {
                return this.label
            }

        }

        let test = new help(1,"premier message d'aide");
        console.log(test.show());

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
                        .append(data.message)
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
        
        /* bouton voire les differentes  questions */
        $('.button_show_questions').one('click',function() {
            $.ajax({
                url    : '../json/get_questions.php',
                method : 'get'
            }).done(function (data) {
                /* afficher les questions */               
                $('#div_list_questions')
                    .append('<h2> Voici les differentes questions qui ont été posées </h2> <p> pour afficher les réponses et/ou répondre à une question, cliquez deux fois dessus</p><br/>');
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
                    
                    let form_add_answer ='<form class="form_add_answer" method="post" action="../json/add_answer.php?id_q='+ id_q +'"> <p> répondre </p> <input type="textField" name="answer" placeholder="vous avez la réponse ?" required><br/> <button type="submit"> publier </button> </form><br/><div id="message" style="display : none"></div>'
                    /* lorque l'on clique sur une question le formulaire de réponse ainsi que toutes 
                     * les réponses */ 
                    $('.'+id_q).one('click', function() {
                        let span = $(this);
                        $.ajax({
                            url    : '../json/get_answers.php?id_q='+id_q,
                            method : 'get'
                        }).done(function(data) {
                            $(span).append('liste des réponses : <br/><br/> ');
                            for(let i=0; i < data.answers.length; ++i) {
                                span.append('auteur : '+ data.answers[i][3]+'<br/>'
                                                       + data.answers[i][2]+'<br/>');
                            } 
                        }).fail(function () {
                            phpError('get_answers.php');
                        });
                            
                        span.append(form_add_answer);     
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
                                    $('#message').append(data.message)
                                                 .fadeIn(1000)
                                                 .fadeOut()
                                                 .css({'color' : '#f8b617'});
                                } else {
                                    $('#message').append(data.message)
                                                 .fadeIn(1000)
                                                 .fadeOut()
                                                 .css({'color' : '#f8b617'});
                                }
                            }).fail(function() { 
                                phpError('add_answers.php');
                            });
                            return false;
                        });
                    });
                });
            }).fail( function() {
                phpError('get_questions.php');
            });
            
        });

       


        /*      img help        */
        $('.img_help_1')
          .mouseenter(function () {
            let aide = new help(1,"ceci est un test");
            $('.div_help').html(aide.show())
                          .fadeIn(1000) 
           })
          .mouseleave(function () {
            $('.div_help')
                .fadeOut(1000);
          });

        $('.img_help_2')
          .mouseenter(function () {
            let aide = new help(1,"ceci est un test");
            $('.div_help').html(aide.show())
                          .fadeIn(1000) 
           })
          .mouseleave(function () {
            $('.div_help')
                .fadeOut(1000);
          });
    })
})();
