<?php
    require_once "auth/encryption.php";
    session_start();
    $_SESSION['token'] = GenerateKey();

    header("Location: /auth");
