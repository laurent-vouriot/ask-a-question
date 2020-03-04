<?php
/**
 * 
 * login.php
 *
 */
require('db.php'); 

session_start();

$dbLink = dbConnect();  
$query  = 'select * from myUser where username = \'' . $_POST['username'] . '\' and 
                                      pwd      = \'' . $_POST['pwd'] . '\''; 
$result = testError($dbLink,$query);

$obj = new stdClass();
$obj->message ="Mauvais nom d'utilisateur ou mauvais mot de passe";
$obj->success = false;


if(isset($_POST['username']) && isset($_POST['password'])){
        if($result != null ) {
                $found = true;
                $obj->success = true; 
                $_SESSION['user'] = 123;
        }
}
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');


echo(json_encode($obj));
