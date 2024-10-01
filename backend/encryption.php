<?php


    function GenerateKey(){
        $date = new DateTime("now");
        $hash = hash("sha256", $date->format('Y-m-d_H-i-s'));
        return $hash;
    }

    function Encrypt($data, $key){
        $iv = substr($key, 0, 16);
        $encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
        return $encrypted;
    }

    function Decrypt($data, $key){
        $iv = substr($key, 0, 16);
        $decrypted = openssl_decrypt($data, 'AES-256-CBC', $key, 0, $iv);
        return $decrypted;
    }