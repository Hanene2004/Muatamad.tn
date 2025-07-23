<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM stock_logs');
$stockLogs = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($stockLogs);
?>