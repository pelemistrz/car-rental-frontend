DROP SCHEMA IF EXISTS `car-rental`;


CREATE SCHEMA `car-rental`;
USE `car-rental` ;



CREATE TABLE `customers`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `country` VARCHAR(255) NOT NULL,   
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `cars`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `brand` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `year_of_production` BIGINT NOT NULL,
    `daily_fee` DECIMAL(8, 2) NOT NULL,
    `date_created` DATETIME NOT NULL,
    `last_updated` DATETIME NOT NULL,
    `registration` VARCHAR(255) NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
      `car_type_id` BIGINT NOT NULL
);
CREATE TABLE `car_types` (
      `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
        `car_type` VARCHAR(255) NOT NULL
);
CREATE TABLE `reservations`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `car_id` BIGINT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL, 
    `total_fee` DECIMAL(8, 2) NOT NULL,
         `date_created` DATETIME NOT NULL,
    `last_updated` DATETIME ,
     `customer_id` BIGINT NOT NULL
);

ALTER TABLE
    `cars` ADD CONSTRAINT `car_type_id_foreign` FOREIGN KEY(`car_type_id`) REFERENCES `car_types`(`id`);

ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_car_id_foreign` FOREIGN KEY(`car_id`) REFERENCES `cars`(`id`);

 ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`);