<?php 
$hostname = "localhost";
$username = "root";
$password = "";
$db_name = "office_visitors";

$conn = new mysqli($hostname, $username, $password, $db_name);

if($conn->connect_error){
    die("Connection Failed" .$conn->connect_error);
}

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $invited_by = $_POST['invited_by'];
    $rating = $_POST['rating'];
    $comments = $_POST['comments'];


    $stmt = $conn->prepare("INSERT INTO visitors (name, phone, email, address, invited_by, rating, comments) VALUES ('$name', '$phone', '$email', '$address', '$invited_by', '$rating', '$comments')");
    if($stmt->execute()){
        echo "Form submitted successfully";
    }else {
        echo "Error : $stmt <br> $conn->error"; 
    }

    $conn->close();
}

?>