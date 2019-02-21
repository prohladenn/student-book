<?php

namespace App\Router;

class Router {
    private $post;

    public function __construct() {
        $this->post = $_POST['router'][0];

        if ($this->post) {
            $controllerName = "App\Controllers\\" . $this->post['controller'];
            $controllerFileName = $this->post['controller'] . ".php";
            $actionName = $this->post['action'];
            $controllerFile = __DIR__ . "/../controllers/" . $controllerFileName;
        }
        if (file_exists($controllerFile)) {
            require_once $controllerFile;
        }
        $controllerObject = new $controllerName;
        $result = $controllerObject->$actionName();
    }

}

$newRouter =  new Router;

//TODO: Роутер не красивый. Нужно реализовать логику передачи сигнала от роутера к ОПРЕДЕЛЕННОМУ контроллеру

//TODO: Обдумать логику action при нажатии на клавишу. Что будет происходить при создании/чтении/обновлении/удалении