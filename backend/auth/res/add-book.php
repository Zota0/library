<?php
    error_log("Token should be: " . $_SESSION['token']);
    error_log("Token is: " . $_GET['token']);


    if($_GET == null || $_GET['token'] != $_SESSION['token']) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid token', 'data' => null]);
        exit;
    }

    $book = [
        'title' => $_POST['title'] ?? null,
        'author' => $_POST['author'] ?? null,
        'genre' => $_POST['genre'] ?? null,
        'isbn' => $_POST['isbn'] ?? null,
        'publisher' => $_POST['publisher'] ?? null,
        'pages' => $_POST['pages'] ?? null,
    ];

    foreach($book as $k => $v) {
        if($v == null) {
            echo json_encode(['status' => 'error', 'message' => 'Not enough data', 'data' => null]);
            exit;
        }
    }

    $addBook_sql = $db->SQL("INSERT INTO books (title, author, genre, isbn, publisher, pages) VALUES (?, ?, ?, ?, ?, ?)", 
    $book);

    var_dump($addBook_sql);


