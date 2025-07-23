<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM notifications');
$notifications = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($notifications);
?>