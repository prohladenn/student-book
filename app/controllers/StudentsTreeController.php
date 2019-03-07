<?php

namespace App\Controllers;

require_once __DIR__ . "/../models/StudentsTreeModel.php";

class StudentsTreeController {
    public function getStudentsTree() {
        $students = new \App\Models\StudentsTreeModel;
    }
}