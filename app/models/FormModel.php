<?php 

namespace App\Models;

require_once __DIR__ . "/../db/DB.php";

Class FormModel {
    private $pdo;

    public function __construct() {
        $this->pdo = new \App\DB\DB;
    }

    public function create($form) {
        $name = $_POST['form'][0]['name'];
        $id = $_POST['form'][0]['id'];

        $result = $this->pdo->
            prepare("INSERT INTO `{$form}` VALUES (NULL, :id, :name);");
        $result->bindValue('id', $id);
        $result->bindValue('name', $name);
        $result->execute();
    }

    public function update() {

    }

    public function delete() {

    }
}