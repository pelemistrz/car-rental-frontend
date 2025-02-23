INSERT INTO `car_types` (`car_type`)
VALUES 
    ('Sedan'),
    ('SUV'),
    ('Hatchback'),
    ('Cabrio');

-- Sedany
INSERT INTO `cars` (`brand`, `description`, `model`, `year_of_production`, `daily_fee`, `date_created`, `last_updated`, `registration`, `image_url`, `car_type_id`)
VALUES
    ('Toyota', 'Komfortowy sedan o niskim spalaniu', 'Camry', 2020, 150.00, NOW(), NOW(), 'TK12345', 'images/sedan/toyota_camry.png', 1),
    ('Honda', 'Stylowy sedan z dynamicznym silnikiem', 'Accord', 2021, 160.00, NOW(), NOW(), 'TK54321', 'images/sedan/honda_accord.png', 1);

-- SUV-y
INSERT INTO `cars` (`brand`, `description`, `model`, `year_of_production`, `daily_fee`, `date_created`, `last_updated`, `registration`, `image_url`, `car_type_id`)
VALUES
    ('Toyota', 'Wszechstronny SUV do miasta i na bezdroża', 'RAV4', 2021, 180.00, NOW(), NOW(), 'TK55667', 'images/suv/toyota_rav4.png', 2),
    ('Honda', 'SUV o dynamicznym prowadzeniu', 'CR-V', 2022, 185.00, NOW(), NOW(), 'TK99876', 'images/suv/honda_crv.png', 2);

-- Hatchbacki
INSERT INTO `cars` (`brand`, `description`, `model`, `year_of_production`, `daily_fee`, `date_created`, `last_updated`, `registration`, `image_url`, `car_type_id`)
VALUES
    ('Ford', 'Elektryczny hatchback o nowoczesnym wyglądzie', 'Fiesta', 2021, 130.00, NOW(), NOW(), 'TK22334', 'images/hatchback/ford_fiesta.png', 3),
    ('Volkswagen', 'Praktyczny hatchback dla każdego', 'Golf', 2020, 140.00, NOW(), NOW(), 'TK55678', 'images/hatchback/volkswagen.png', 3);

-- Cabrio
INSERT INTO `cars` (`brand`, `description`, `model`, `year_of_production`, `daily_fee`, `date_created`, `last_updated`, `registration`, `image_url`, `car_type_id`)
VALUES
    ('BMW', 'Luksusowy kabriolet o sportowych osiągach', 'Z4', 2021, 220.00, NOW(), NOW(), 'TK11234', 'images/cabrio/bmw_z4.png', 4),
    ('Mercedes', 'Elegancki kabriolet z napędem na cztery koła', 'C-Class Cabrio', 2020, 240.00, NOW(), NOW(), 'TK77889', 'images/cabrio/mercedes_cclass_cabrio.png', 4);