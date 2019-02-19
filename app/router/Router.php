<?php

namespace App\Router;

class Router {

    private $student_id;

    public function __construct() {
        $id = preg_replace("~[^0-9]~", '', $_SERVER['REQUEST_URI']);
        if(!empty($id)) {
            $this->student_id = $id;
        }
    }

    public function run() {
        if (!is_null($this->student_id)) {
            echo $this->student_id;
        } else {
            $read_students = new \App\Models\CStudents;
            $read_students->readStudents($pdo);
        }
    }
}