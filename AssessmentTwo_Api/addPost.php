<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit;
}

include 'db_connection.php';

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$message = $data->message;
$user = $data->username;

if($message === ''){
    echo ("Message is Empty");
} else {

    $sql = "INSERT INTO posts (id, message, username, time) VALUES (NULL, '$message', '$user', CURRENT_TIMESTAMP);";
    $result = mysqli_query($conn, $sql);
    
    if(!$result){
        echo ("Error Description: " . mysqli_error($conn));
    } else {
        echo ("All is Goood! Added Post");
    }

}
?>