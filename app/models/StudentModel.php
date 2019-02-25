<?php

namespace App\Models;

require_once __DIR__ . "/../db/DB.php";
require_once __DIR__ . "/FormModel.php";

class StudentModel extends FormModel {
    private $pdo;
    private $id;

    public function getMarks() {
        $this->pdo = new \App\DB\DB;

        $this->id = $_POST['student'][0]['id'];

        $result = $this->pdo->prepare("SELECT * FROM `mark-table` WHERE student_id = :id;");
        $result->bindValue('id', $this->id);
        $result->execute();
        $result = $result->fetchAll();

        echo json_encode($result);
    }
    public function setMarks() {

    }
}

//TODO: Обдумать методы класса Student