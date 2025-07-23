<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM stats_marketing');
$statsMarketing = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($statsMarketing);
?>