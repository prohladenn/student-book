<?php

namespace App\Controllers;

require_once __DIR__ . "/../models/StudentModel.php";

class StudentsController {
    public function createStudent() {
        $student = new \App\Models\StudentModel;
        $student->create('student');
    }

    public function updateStudent() {
        $student = new \App\Models\StudentModel;
        $student->update('student');
    }

    public function deleteStudent() {
        $student = new \App\Models\StudentModel;
        $student->delete('student');
    }
}