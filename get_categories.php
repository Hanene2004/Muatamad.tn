<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM categories');
$categories = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($categories);
?>