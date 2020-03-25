<?php 
/**
 *
 * get_questions.php
 * 18/02/2020
 *
 * renvoie les questions  de la BD
 *
 */
session_start();
require('db.php');

$dbLink = dbConnect();

$query  = 'select * from question';
$result = $dbLink->query($query);
while($row = $result->fetch_array()) {
    $rows [] = $row;
}
$obj = new stdClass();
$obj -> result = $rows;

 
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj));

