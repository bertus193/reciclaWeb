<?php
error_reporting(0);
header('Access-Control-Allow-Origin: *');
$target_path = "uploads/avatars/";
 
$target_path = $target_path . basename( $_FILES['file']['name']);
 
if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
    echo "Upload and move success";
} else {
    echo "There was an error uploading the file, please try again!";
}
?>