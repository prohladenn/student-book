<?php

namespace App\Models;

class StudentModel {
    // private $pdo = new App\DB\DB;

    public function create($pdo) {
        $result = $this->pdo->query("INSERT INTO {$_POST['essense']} VALUES {$_POST['values']}");
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