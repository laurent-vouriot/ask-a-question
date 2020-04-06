<?php 
/**
 *
 * get_answers.php
 * 20/03/2020
 * retoures les réponses correspondants à une réponse
 *
 */

require('db.php'); 
//debug 
//session_start(); 
$dbLink = dbConnect();
$id_question = $_GET['id_q'];

$query  = 'select * from answer where id_question = \'' . $id_question . '\'';
$result = $dbLink->query($query);

while($row = $result->fetch_array()) {
    $rows [] = $row;
}


$obj = new stdClass();

/* si il n'y a aucune réponse on fait du bricolage */
if(empty($rows)) {
    $rows[0][2] = "pas  de réponses pour le moment";
    $rows[0][3] = "";
}
$obj -> answers = $rows;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj));

