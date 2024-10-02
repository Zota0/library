
<?php
    require_once 'check-token.php';
    if(CheckToken() != 0) throw new Exception("Token is invalid");

    $books = [];

    $getBook_sql = $db->SQL("SELECT * FROM books", null, MYSQLI_USE_RESULT);
    $books = $db->Fetch("a_assoc", $getBook_sql);

    echo json_encode([
        'status' => 'success',
        'message' => null,
        'data' => $books
    ], DEFAULT_JSON_TYPE);
?>
