<?php

namespace App\Controllers;

require_once __DIR__ . "/../models/StudentModel.php";
require_once __DIR__ . "/../models/StudentsTreeModel.php";

class StudentsController {
    public function getStudentsTree() {
        $students = new \App\Models\StudentsTreeModel;
    }

    public function createStudent() {
        $student = new \App\Models\StudentModel;
        $student->create('student');
    }

    public function readStudent() {
        $student = new \App\Models\StudentModel;
        $student->getMarks();
    }

    public function updateStudent() {
        $student = new \App\Models\StudentModel;
        $student->update('student');
    }

}