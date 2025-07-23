<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM trafic');
$trafic = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($trafic);
?>