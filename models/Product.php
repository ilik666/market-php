<?php


class Product
{
    /**
     * Return an array of products
     */
    public static function getProducts() {
        $db = Db::getConnection();
    }

    /**
     * Return single product item with specified id
     * @param integer $id
     */
    public static function getProductItemById(int $id) {
        $db = Db::getConnection();

    }

}