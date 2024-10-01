<?php
    try {
        if(gettype($token) != "string") {
            throw new Exception("Token generation failed");
        }
        
        echo json_encode([
            "status" => "ready",
            "message" => "Token generated successfully",
            "data" => $token,
        ]);
    
    } catch (Exception $e) {
        error_log($e);
        throw new Exception("Failed token generation");
    }