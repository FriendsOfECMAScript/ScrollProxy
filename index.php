<?php
$extensions = array('php', 'jpg', 'jpeg', 'gif', 'css', 'js');

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$ext = pathinfo($path, PATHINFO_EXTENSION);
if (in_array($ext, $extensions)) {
    // let the server handle the request as-is
    return false;
}
