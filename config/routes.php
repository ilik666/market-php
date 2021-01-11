<?php
    /**
     * @return array URI - FilePath
     */
    return [
        'news' => 'news/index',
        'news/([0+9]+)' => 'news/view',

        'catalog/brands' => 'catalog/index',

        'index.php' => 'site/index',
        '' => 'site/index',
    ];