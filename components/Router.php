<?php

class Router {
    /**
     * Свойство для хранение роутов
     * @var array
     */
    private $routes;

    /**
     * Router constructor.
     */
    public function __construct() {
        // Путь к файлу с роутами
        $routersPath = ROOT.'\config\routes.php';
        // Получение роутов из файла
        $this->routes = include($routersPath);
    }

    /**
     * @return string URI
     */
    private function getURI() {
        if(!empty($_SERVER['REQUEST_URI'])) {
            return $_SERVER['REQUEST_URI'];
        }
    }

    public function run() {
        // Получение URI
        $uri = $this->getURI();

        // Пробегаемся цилком по роутам
        foreach ($this->routes as $uriPattern => $path) {
            if(preg_match("~$uriPattern~", $uri)) {

                $internalRoute = preg_replace("~$uriPattern~", $path, $uri);


                $segments = explode('/', $internalRoute);$controllerName = array_shift($segments) . 'Controller';
                $controllerName = ucfirst($controllerName);

                $actionName = 'action' . ucfirst(array_shift($segments));

                $parameters = $segments;

                // Подключить файл класса-контроллера
                $controllerFile = ROOT . '\\controllers\\' .
                    $controllerName . '.php';

                if (file_exists($controllerFile)) {
                    include_once($controllerFile);
                }

                // Создать объект, вызвать метод (т.е. action)
                $controllerObject = new $controllerName;

                /* Вызываем необходимый метод ($actionName) у определенного
                 * класса ($controllerObject) с заданными ($parameters) параметрами
                 */
                $result = call_user_func_array(array($controllerObject, $actionName), $parameters);

                // Если метод контроллера успешно вызван, завершаем работу роутера
                if ($result != null) {
                    break;
                }
            }
        }
    }
}