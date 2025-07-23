<?php
include 'db.php';
$stmt = $pdo->query('SELECT * FROM commande_details');
$commandeDetails = $stmt->fetchAll();
header('Content-Type: application/json');
echo json_encode($commandeDetails);
?>