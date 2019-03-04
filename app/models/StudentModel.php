<?php

namespace App\Models;

require_once __DIR__ . "/../db/DB.php";
require_once __DIR__ . "/FormModel.php";

class StudentModel extends FormModel {
    private $pdo;

    public function getMarkTable() {
        $this->pdo = new \App\DB\DB;
        $student_id = $_POST['student'][0]['id'];

        $result = $this->pdo->prepare("SELECT * FROM `mark-table` WHERE student_id = :id;");
        $result->bindValue('id', $student_id);
        $result->execute();
        $result = $result->fetchAll();

        echo json_encode($result);
    }

    public function setMarkTable() {
        $this->pdo = new \App\DB\DB;
        $student_id = $_POST['student'][0]['id'];

        foreach ($_POST['mark_table'] as $row) {
            $subject = $row['subject'];
            $mark = $row['mark'];
            $professor = $row['professor'];

            $result = $this->pdo->
                prepare("INSERT INTO `mark-table` VALUES (NULL, :id, :subject, :mark, :professor);");
            $result->bindValue('id', $student_id);
            $result->bindValue('subject', $subject);
            $result->bindValue('mark', $mark);
            $result->bindValue('professor', $professor);
            $result->execute();
        }
    }

    public function updateMarkTable() {
        $this->pdo = new \App\DB\DB;

        foreach ($_POST['mark_table'] as $row) {
            $id = $row['id'];
            $subject = $row['subject'];
            $mark = $row['mark'];
            $professor = $row['professor'];

            $result = $this->pdo->
                prepare("UPDATE `mark-table` SET subject = :subject, mark = :mark, professor = :professor WHERE id = :id;");
            $result->bindValue('id', $id);
            $result->bindValue('subject', $subject);
            $result->bindValue('mark', $mark);
            $result->bindValue('professor', $professor);
            $result->execute();
        }
    }
}