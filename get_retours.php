<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM retours');
$retours = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($retours);
?>