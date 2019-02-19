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
            $read_students = new \App\Models\CEssense;
            $read_students->read();

            //Никуда не годится! Необходимо перенаправить на контроллер
        }
    }
}

//TODO: Роутер не красивый. Нужно реализовать логику передачи сигнала от роутера к ОПРЕДЕЛЕННОМУ контроллеру

//TODO: Обдумать логику action при нажатии на клавишу. Что будет происходить при создании/чтении/обновлении/удалении