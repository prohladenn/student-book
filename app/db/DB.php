<?php

namespace App\DB;
use PDO;

class DB extends PDO {
    private $db_host = 'localhost';
    private $db_name = 'students';
    private $db_user = 'student';
    private $db_password = 'student';
    
    public function __construct() {
        try {
            parent::__construct(
                "mysql:host={$this->db_host};dbname={$this->db_name}",
                $this->db_user,
                $this->db_password,
                [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
            );
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }
}