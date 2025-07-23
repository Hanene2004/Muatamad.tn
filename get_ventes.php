<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM ventes');
$ventes = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($ventes);
?>