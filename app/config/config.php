<?php

require_once __DIR__ . "/../../vendor/autoload.php";

$db_host = 'localhost';
$db_name = 'students';
$db_user = 'student';
$db_password = 'student';

$pdo = new PDO(
    "mysql:host={$db_host};dbname={$db_name}",
    $db_user,
    $db_password
);

//TODO: Реализовать подключение БД для всех моделей