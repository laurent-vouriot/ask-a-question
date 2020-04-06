<?php
/**
 *
 * add_answer.php
 * 21/03/2020
 *
 * ajoute une réponse d'un user à  une question dans  la bd
 *
 */

require('db.php');
//session_start();

$dbLink      = dbConnect();
$id_question = $_GET['id_q'];
$answer      = $_POST['answer'];
$author      = $_SESSION['user'];

$query = 'insert into answer (id_question,author,answer) 
          values ('.  $id_question . ', \'' . $author . '\',\'' 
                   .  $answer . '\')';

$obj = new stdClass();
$obj->message = 'il y a eu une erreur veuillez réessayer s\'il vous plaît';
$obj->success = false;

if($result  = $dbLink->query($query)) {
    $obj->message = "votre réponse a bien été enregistrée !";
    $obj->success = true;
}
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj));

