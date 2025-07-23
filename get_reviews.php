<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM avis');
$reviews = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($reviews);
?>