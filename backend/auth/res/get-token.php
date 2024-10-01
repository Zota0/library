<?php
    try {
        if(gettype($_SESSION['token']) != "string") {
            session_abort();
            throw new Exception("Token generation failed");
        }
        
        echo json_encode([
            "status" => "ready",
            "message" => "Token generated successfully",
            "data" => $_SESSION['token'],
        ]);
    
    } catch (Exception $e) {
        session_abort();
        error_log($e);
        throw new Exception("Failed token generation");
    }