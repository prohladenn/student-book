<?php

namespace App\Models;

class StudentsTreeModel {
    private $pdo;
    public function __construct() {
        $obj;
        $result;
        $this->pdo = new \App\DB\DB;

        $result = $this->pdo->query(
            "SELECT faculty.name as faculty, 
                course.name as course, 
                `group`.name as `group`, 
                student.name as student
            FROM faculty
            LEFT JOIN course ON faculty.id = course.faculty_id
            LEFT JOIN `group` ON course.id = `group`.course_id
            LEFT JOIN student ON `group`.id = student.`group_id`;"
        )->fetchAll();

        foreach ($result as $row) {
            $obj[$row[0]][$row[1]][$row[2]][] = $row[3];
        }

        foreach ($obj as $faculty => $courses) {
            echo "<p class='faculty'>" . $faculty . "</p><li><ul>";
            foreach ($courses as $course => $groups) {
                echo "<p class='course'>" . $course . "</p><li><ul>";
                foreach ($groups as $group => $students) {
                    echo "<p class='group'>" . $group . "</p><li><ul>";
                    foreach ($students as $student) {
                        echo "<li class='student'>" . $student . "</li>";
                    }
                    echo "</ul></li>";
                }
                echo "</ul></li>";
            }
            echo "</ul></li>";
        }
    }
}