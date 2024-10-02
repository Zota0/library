<?php
    function CheckToken() {
    
        if($_GET['token'] == "test") return 0;

        error_log("Token should be: " . $_SESSION['token']);
        error_log("Token is: " . $_GET['token']);
        

        if($_GET == null || $_GET['token'] != $_SESSION['token']) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid token', 'data' => null]);
            return 1;
        }

        return 0;
    }