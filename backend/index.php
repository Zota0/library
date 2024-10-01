<?php

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    {
        $method = $_SERVER['REQUEST_METHOD'];
        $req_path = $_SERVER['REQUEST_URI'];
        $url = parse_url($req_path);
        $path = $url["path"] ?? "/";
        $query = $url["query"] ?? null;
    }

    require_once "auth/encryption.php";
    session_start();
    $_SESSION['token'] = GenerateKey();

    if($path == "/") {
        header("Location: api/auth");
    }