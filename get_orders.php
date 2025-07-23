<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM commandes');
$orders = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($orders);
?>