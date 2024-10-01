<?php
    session_start();
    const DEFAULT_JSON_TYPE = JSON_PRETTY_PRINT;

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once "database.php";
    require_once "encryption.php";

    // error_reporting(0);

    $db = new database();
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $req_path = $_SERVER['REQUEST_URI'];
        $url = parse_url($req_path);
        $path = $url["path"] ?? "/";
        $query = $url["query"] ?? null;
    }

    function Handle(string $path) {
        if(!file_exists($path)) {
            throw new Exception("File not found");
        
        }
        
        return $path;
    }


    try {

        require_once match($path) {
            "/auth/get-token" => Handle("res/get-token.php"),
            "/auth/abort" => Handle("res/abort.php"),

            "/auth/add-book" => Handle("res/add-book.php"),
            default => Handle("res/404.php"),
        };
    
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage(),
            "data" => null,
        ]);
    }