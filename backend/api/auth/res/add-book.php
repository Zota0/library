<?php
    require_once 'check-token.php';
    require_once 'book.php';
    if(CheckToken() != 0) throw new Exception("Token is invalid");

    $book = new Book(
        $_POST['title'] ?? "No title given",
        $_POST['author'] ?? "No author provided",
        $_POST['genre'] ?? "No genre given",
        $_POST['isbn'] ?? "No ISBN given",
        $_POST['publisher'] ?? "No publisher given",
        $_POST['pages'] ?? 0,
    );

    foreach($book() as $k => $v) {
        if($v == null) {
            echo json_encode(['status' => 'error', 'message' => 'Not enough data', 'data' => null]);
            exit;
        }
    }

    $addBook_sql = $db->SQL("INSERT INTO books (title, author, genre, isbn, publisher, pages) VALUES (?, ?, ?, ?, ?, ?)", 
    $book());


