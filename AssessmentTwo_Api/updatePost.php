<?php
    include 'db_connection.php';

    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        exit;
    }

    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    $updatedPost = $data->updatedMessage;
    $userId = $data->id;

    $sql = "UPDATE posts SET time=CURRENT_TIMESTAMP, message='$updatedPost' WHERE id='$userId'";
    $result = mysqli_query($conn, $sql);

    if(!$result){
        echo ("Error Description: " . mysqli_error($conn));
    } else {
        echo ("All is Goood! Post updated");
    }
?>