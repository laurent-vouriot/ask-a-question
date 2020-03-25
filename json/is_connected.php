<?php
session_start();

$obj = new stdClass();
$obj -> is_connected = isset($_SESSION['user']);
$obj -> username = $_SESSION['user'];

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');
echo(json_encode($obj));
