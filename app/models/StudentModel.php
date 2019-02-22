<?php

namespace App\Models;
require_once __DIR__ . "/../db/DB.php";

class StudentModel {
    private $pdo;
    private $group_id;
    private $course_id;
    private $faculty_id;

    // Все таки разобрался
    public function __construct() {
        $this->pdo = new \App\DB\DB;
        $this->group_id = $this->pdo->
            prepare("SELECT id FROM `group` WHERE name = :gr_name;");
        $this->group_id->bindValue('gr_name', $_POST['student'][0]['group_name']);
        $this->group_id->execute();
        $this->group_id = $this->group_id->fetchAll();

        echo $this->group_id[0]['id'];
    }

    public function create() {
        $result = $this->pdo->query("SELECT * FROM `student`;")->fetchAll();
    }
    public function read($pdo) {
        $result = $pdo->query("SELECT * FROM faculty");
    }
    public function update($pdo) {
        $result = $pdo->query("");
    }
    public function delete($pdo) {
        $result = $pdo->query("DROP TABLE ");
    }

    public function getMarkTable() {

    }
    public function setMarkTable() {

    }
}

//TODO: Обдумать методы класса Student