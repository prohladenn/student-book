<?php

namespace App\Models;

require_once __DIR__ . "/../db/DB.php";

class StudentsTreeModel {
    private $pdo;
    
    public function __construct() {
        $this->pdo = new \App\DB\DB;

        $result = $this->pdo->query(
            "SELECT faculty.id, faculty.name,
                course.id, course.name,
                `group`.id, `group`.name,
                student.id, student.name
            FROM faculty
            LEFT JOIN course ON faculty.id = course.faculty_id
            LEFT JOIN `group` ON course.id = `group`.course_id
            LEFT JOIN student ON `group`.id = student.`group_id`;"
        )->fetchAll();

        foreach ($result as $row) {
            $names[$row[1] . ',' . $row[0]][$row[3] . ',' . $row[2]][$row[5] . ',' . $row[4]][] = $row[7] . ',' . $row[6];
        }

        echo json_encode($names);
    }
}