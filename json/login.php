<?php
/**
 * 
 * login.php
 *
 */

session_start();
require('db.php'); 
$dbLink = dbConnect();
$query  = 'select * from `myUser` where username = \'' . $_POST['username'] . '\' 
                                         and pwd = \'' . $_POST['password'] . '\''; 

// debug 
$result = testError($dbLink,$query);

$obj = new stdClass();
$obj->message ="Mauvais nom d'utilisateur ou mauvais mot de passe";
$obj->success = false;

if (mysqli_num_rows($result) == 1) {
    $found = true; 
    $obj->success = true; 
    $_SESSION['user'] = $_POST['username']; 
}        
        
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo(json_encode($obj));
