<?php
    session_start();
    const DEFAULT_JSON_TYPE = JSON_PRETTY_PRINT;

    require_once "database.php";
    require_once "encryption.php";

    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // error_reporting(0);

    $_SESSION['token'] = GenerateKey();

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
            "/api/auth/get-token" => Handle("res/get-token.php"),
            "/api/auth/abort" => Handle("res/abort.php"),
            
            "/api/auth/get-books" => Handle("res/get-books.php"),
            "/api/auth/add-book" => Handle("res/add-book.php"),
            
            default => Handle("res/404.php"),
        };
    
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage(),
            "data" => null,
        ], DEFAULT_JSON_TYPE);
    }

    if($db) {
        $db->Close();
    }