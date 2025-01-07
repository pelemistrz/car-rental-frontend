CREATE USER 'ecommerceapp'@'localhost' IDENTIFIED BY 'ecommerceapp';

GRANT ALL PRIVILEGES ON * . * TO 'ecommerceapp'@'localhost';


ALTER USER 'carrental'@'localhost' IDENTIFIED WITH mysql_native_password BY 'carrental';