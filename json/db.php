<?php
/**
 * db.php 
 * 04/03/2020
 *
 * 
 */
function dbConnect()
{
    $dbLink = mysqli_connect('mysql-ask-a-question.alwaysdata.net', '201263_admin', 'webS42020')
    or die('Erreur de connexion au serveur : ' . mysqli_connect_error());
    mysqli_select_db($dbLink , 'ask-a-question_db')
    or die('Erreur dans la sélection de la base : ' . mysqli_error($dbLink));
    return $dbLink;
}
function testError($dbLink,$query)
{
    if(!($dbResult = mysqli_query($dbLink, $query)))
    {
        echo 'Erreur dans requête<br />';
        // Affiche le type d'erreur.
        echo 'Erreur : ' . mysqli_error($dbLink) . '<br/>';
        // Affiche la requête envoyée.
        echo 'Requête : ' . $query . '<br/>';
        exit();
    }
    else return $dbResult;
}
