<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM produits');
$products = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($products);
?>