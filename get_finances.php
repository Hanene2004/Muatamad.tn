<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM finances');
$finances = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($finances);
?>