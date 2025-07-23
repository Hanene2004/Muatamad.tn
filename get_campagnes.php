<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM campagnes');
$campagnes = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($campagnes);
?>