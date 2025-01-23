
DROP SCHEMA IF EXISTS `car-rental`;

CREATE SCHEMA `car-rental`;
USE `car-rental` ;

DROP TABLE IF exists `cars`;
DROP TABLE IF exists `reservations`;
DROP TABLE IF exists `equipment`;
DROP TABLE IF exists `fuel_usage`;
DROP TABLE IF exists `fuel_category`;
DROP TABLE IF exists `customers`;


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
    `model` VARCHAR(255) NOT NULL,
    `year_of_production` BIGINT NOT NULL,
    `daily_fee` DECIMAL(8, 2) NOT NULL,
    `vehicle_status` VARCHAR(255) NOT NULL,
    `date_created` DATETIME NOT NULL,
    `last_updated` DATETIME NOT NULL,
    `registration` VARCHAR(255) NOT NULL,
    `car_odometer` BIGINT NOT NULL,
    `fuel_category_id` BIGINT NOT NULL,
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
    
    `fuel_usage_id` BIGINT ,
     `date_created` DATETIME NOT NULL,
    `last_updated` DATETIME ,
     `customer_id` BIGINT NOT NULL
);

CREATE TABLE `fuel_usage`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `reservation_id` BIGINT NOT NULL,
    `counter_reading_begin` int NOT NULL,
    `counter_reading_end` int NOT NULL,
  

    `cost_of_fuel` DECIMAL(8, 2) NOT NULL,
    `fuel_category_id` BIGINT NOT NULL
);
CREATE TABLE `fuel_category`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `description` VARCHAR(255) NOT NULL,
    `cost_per_unit` DECIMAL(8, 2) NOT NULL
);

ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_fuel_usage_id_foreign` FOREIGN KEY(`fuel_usage_id`) REFERENCES `fuel_usage`(`id`);
ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_car_id_foreign` FOREIGN KEY(`car_id`) REFERENCES `cars`(`id`);
ALTER TABLE
    `fuel_usage` ADD CONSTRAINT `fuel_usage_fuel_category_id_foreign` FOREIGN KEY(`fuel_category_id`) REFERENCES `fuel_category`(`id`);
 ALTER TABLE
    `reservations` ADD CONSTRAINT `reservations_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`);