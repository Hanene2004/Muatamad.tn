<?php
include 'db.php';
$stmt = $pdo->query('SELECT id, nom, email, role, date_inscription FROM utilisateurs');
$users = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($users);
?>