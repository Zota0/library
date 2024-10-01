<?php
// --- Example Usage ---

// Generate key pair (only do this once and store the keys securely!)
$keyPair = generateKeyPair();

if ($keyPair === false) {
    exit("Key generation failed.\n");
}

$privateKey = $keyPair["privateKey"];
$publicKey = $keyPair["publicKey"];

//Save Keys to files (replace with your preferred secure storage method)
file_put_contents('private.pem', $privateKey);
file_put_contents('public.pem', $publicKey);

// Data to encrypt
$dataToEncrypt = "This is my super secret message.";

// Encrypt the data
$encrypted = encryptData($dataToEncrypt, $publicKey);

if ($encrypted === false) {
    exit("Encryption failed.\n");
}

echo "Encrypted data: " . $encrypted . "\n";


// Decrypt the data
$decrypted = decryptData($encrypted, $privateKey);

if ($decrypted === false) {
    exit("Decryption failed.\n");
}

echo "Decrypted data: " . $decrypted . "\n";
