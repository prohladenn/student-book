<?php

namespace App\Controllers;

require_once __DIR__ . "/../models/StudentModel.php";

class MarkTableController {
    public function getMarkTable() {
        $student = new \App\Models\StudentModel;
        $student->getMarkTable();
    }

    public function setMarkTable() {
        $student = new \App\Models\StudentModel;
        $student->setMarkTable();
    }

    public function updateMarkTable() {
        $student = new \App\Models\StudentModel;
        $student->updateMarkTable();
    }
}