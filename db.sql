CREATE DATABASE office_visitors;
USE office_visitors;
CREATE TABLE visitors ( 
    id INT AUTO_INCREMENT PRIMARY key,
    name VARCHAR(100),
    phone VARCHAR(15),
    email VARCHAR(100),
    address VARCHAR(250),
    invited_by VARCHAR(100),
    rating INT,
    comments TEXT
);