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

        if (!isset($id)) {
            $result = $this->pdo->
            prepare("INSERT INTO `{$form}` VALUES (NULL, :name);");
            $result->bindValue('name', $name);
            $result->execute();

            return;
        } 

        $result = $this->pdo->
        prepare("INSERT INTO `{$form}` VALUES (NULL, :id, :name);");
        $result->bindValue('id', $id);
        $result->bindValue('name', $name);
        $result->execute();

    }

    public function update($form) {
        $name = $_POST['form'][0]['name'];
        $id = $_POST['form'][0]['id'];

        $result = $this->pdo->
            prepare("UPDATE `{$form}` SET name = :name WHERE id = :id;");
        $result->bindValue('id', $id);
        $result->bindValue('name', $name);
        $result->execute();
    }

    public function delete($form) {
        $id = $_POST['form'][0]['id'];

        $result = $this->pdo->
        prepare("DELETE FROM `{$form}` WHERE id = :id;");
        $result->bindValue('id', $id);
        $result->execute();
    }
}