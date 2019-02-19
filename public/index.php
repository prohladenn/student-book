<?php

require_once "../app/config/config.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);

$router = new \App\Router\Router;
$router->run();

include "../app/views/VMain.php";