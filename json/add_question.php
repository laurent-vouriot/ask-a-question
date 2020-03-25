<?php 
/**
 *
 * question.php 
 * 15/03/2020
 *
 * lorsque l'utilisateur pose une question on l'insère dans la bd
 *
 */
session_start();
require('db.php'); 
$dbLink = dbConnect();
$user     = $_SESSION['user'];
$question = $_POST['question'];

$query  = 'insert into question (user,question) values ( \'' . $user .  '\', \'' . $question . '\')';

$obj = new stdClass();
$obj -> message = 'votre message a bien été enregistré !';
$obj -> result  = true;

if(!($result = $dbLink->query($query))) {
    $obj -> message = 'il y a eu une erreur veuillez réessayer s\'il vous plaît';
    $obj -> result  = false;
}





header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj));

