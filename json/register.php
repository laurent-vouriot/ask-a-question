<?php 
/**
 *
 * register.php
 *
 */

session_start(); 
require ('db.php');
$dbLink = dbConnect();


$query = 'insert into `myUser` (username,pwd) values (\'' . $_POST['username_reg'] . '\', 
                                                      \'' . $_POST['password_reg'] . '\')';


$queryVerif = 'select * from myUser where username = \'' . $_POST['username_reg'] . '\'';
$result = $dbLink->query($queryVerif);

$obj = new stdClass();
$obj->message = 'nom d\'utilisateur déjà pris'; 
$obj->success = false;

if ($result->fetch_row() == 0) {
    $addUser  = $dbLink->query($query);
    $obj->message = 'vous êtes désormais inscris  avec le pseudonyme : ' . $_POST['username_reg'] ;
    $obj->success = true;
} 

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj)); 
