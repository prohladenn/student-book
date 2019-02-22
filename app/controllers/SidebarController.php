<?php

namespace App\Controllers;

class SidebarController {
    public function addStudent() {
        require_once __DIR__ . "/../models/StudentModel.php";
        $student = new \App\Models\StudentModel;
        // $student->create();
    }
}

//TODO: МОЖНО ВЫЗЫВАТЬ ЗДЕСЬ МЕТОД КЛАССА StudentTreeModel. ПОДУМАТЬ ОБ ЭТОМ