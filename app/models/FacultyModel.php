<?php 

namespace App\Models;

class FacultyModel {
    public function create($pdo) {
        $result = $pdo->query("INSERT INTO {$_POST['essense']} VALUES {$_POST['values']}");
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
}