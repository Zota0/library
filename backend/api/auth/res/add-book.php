<?php
    require_once 'check-token.php';
    require_once 'book.php';

    if(CheckToken() != 0) throw new Exception("Token is invalid");
    if(!$db) throw new Exception("Database connection failed");
    
    $postData = json_decode(file_get_contents('php://input'), true);

    $title = $postData['title'] ?? "null";
    $author = $postData['author'] ?? "null";
    $genre = $postData['genre'] ?? "null";
    $isbn = $postData['isbn'] ?? "null";
    $publisher = $postData['publisher'] ?? "null";
    $pages = (int)($postData['pages'] ?? 0);


    if (!$title || !$author) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Title and author are required.', 'data' => null]);
        exit;
    }

    if(!$db || $db->connect_errno) {
        http_response(400);
        echo json_encode(['status' => 'error', 'message' => 'Cannot connect to Database! Contact your server administrator!', 'data' => null]);
        exit;
    }

    $book = new Book($title, $author, $genre, $isbn, $publisher, $pages);

    error_log(implode(", ", $book()));


    try {
        $addBook_sql = $db->SQL("INSERT INTO books VALUES (?, ?, ?, ?, ?, ?, ?)",
            ["id", $book->title, $book->author, $book->genre, $book->isbn, $book->publisher, $book->pages]);

        if ($addBook_sql) {
            echo json_encode(['status' => 'success', 'message' => 'Book added successfully', 'data' => 'null']);
        } else {
            http_response_code(500); // Internal Server Error

            echo json_encode(['status' => 'error', 'message' => 'Database error.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage(), 'data' => null]);
    }
?>
