<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();


$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM boards";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $boards = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($boards);
        break;

    case "POST":
        $board = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO boards(id, board, name, saved_at) VALUES(null, :board, :name, :saved_at)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':board', $board->board);
        $stmt->bindParam(':name', $board->name);
        $stmt->bindParam(':saved_at', $saved_at);
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record'];
        }
        echo json_encode($response);
        break;
    
    case "DELETE":
        $sql = "DELETE FROM boards WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record deleted successfully!'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete record!'];
        }
        echo json_encode($response);
        break;
}