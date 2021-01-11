<?php


/**
 * Class Db
 * Компонент для работы с базой
 */
class Db
{
    public static function getConnection()
    {
        //Подключаем параметры подключения из файла
        $paramsPath = ROOT.'\\config\params.php';
        $params = include($paramsPath);

        // Устанавливаем соеденение
        $dsn = "mysql:host={$params['host']};dbname={$params['dbname']}";
        $db = new PDO($dsn, $params['user'], $params['password'], [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        return $db;
    }

}