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

    public function updateStudent() {
        $student = new \App\Models\StudentModel;
        $student->update('student');
    }

    public function deleteStudent() {
        $student = new \App\Models\StudentModel;
        $student->delete('student');
    }

}