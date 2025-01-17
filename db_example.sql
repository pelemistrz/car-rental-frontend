INSERT INTO `car_types` (`car_type`) VALUES 
('Sedan'), 
('SUV'), 
('Hatchback'), 
('Convertible');

-- Dodanie kategorii paliw
INSERT INTO `fuel_category` (`description`, `cost_per_unit`) VALUES 
('Petrol', 5.00), 
('Diesel', 4.50), 
('Electric', 3.00);

-- Dodanie przykładowych samochodów
INSERT INTO `cars` (`brand`, `model`, `year_of_production`, `daily_fee`, `vehicle_status`, `date_created`, `last_updated`, `registration`, `car_odometer`, `fuel_category_id`, `image_url`, `car_type_id`) VALUES
('Toyota', 'Corolla', 2022, 30.00, 'Available', NOW(), NOW(), 'ABC123', 15000, 1, 'https://example.com/toyota-corolla.jpg', 1),
('Ford', 'Focus', 2021, 28.50, 'Available', NOW(), NOW(), 'DEF456', 18000, 1, 'https://example.com/ford-focus.jpg', 1),
('BMW', 'X5', 2020, 50.00, 'Available', NOW(), NOW(), 'GHI789', 22000, 2, 'https://example.com/bmw-x5.jpg', 2),
('Audi', 'A4', 2023, 45.00, 'Available', NOW(), NOW(), 'JKL012', 5000, 1, 'https://example.com/audi-a4.jpg', 1),
('Mercedes', 'C-Class', 2022, 55.00, 'Available', NOW(), NOW(), 'MNO345', 10000, 1, 'https://example.com/mercedes-c-class.jpg', 1),
('Honda', 'Civic', 2021, 32.00, 'Available', NOW(), NOW(), 'PQR678', 25000, 1, 'https://example.com/honda-civic.jpg', 1),
('Volkswagen', 'Golf', 2020, 35.00, 'Available', NOW(), NOW(), 'STU901', 27000, 1, 'https://example.com/volkswagen-golf.jpg', 1),
('Tesla', 'Model 3', 2023, 70.00, 'Available', NOW(), NOW(), 'VWX234', 5000, 3, 'https://example.com/tesla-model-3.jpg', 1),
('Mazda', 'CX-5', 2022, 38.00, 'Available', NOW(), NOW(), 'YZA567', 16000, 2, 'https://example.com/mazda-cx5.jpg', 2),
('Chevrolet', 'Malibu', 2021, 33.00, 'Available', NOW(), NOW(), 'BCD890', 19000, 1, 'https://example.com/chevrolet-malibu.jpg', 1),
('Nissan', 'Altima', 2020, 31.00, 'Available', NOW(), NOW(), 'EFG123', 24000, 1, 'https://example.com/nissan-altima.jpg', 1),
('Hyundai', 'Elantra', 2022, 29.00, 'Available', NOW(), NOW(), 'HIJ456', 12000, 1, 'https://example.com/hyundai-elantra.jpg', 1),
('Kia', 'Optima', 2021, 36.00, 'Available', NOW(), NOW(), 'KLM789', 15000, 1, 'https://example.com/kia-optima.jpg', 1),
('Peugeot', '308', 2023, 34.00, 'Available', NOW(), NOW(), 'NOP012', 8000, 1, 'https://example.com/peugeot-308.jpg', 1),
('Volvo', 'XC60', 2020, 48.00, 'Available', NOW(), NOW(), 'QRS345', 20000, 2, 'https://example.com/volvo-xc60.jpg', 2),
('Subaru', 'Outback', 2021, 42.00, 'Available', NOW(), NOW(), 'TUV678', 18000, 2, 'https://example.com/subaru-outback.jpg', 2),
('Jeep', 'Cherokee', 2022, 55.00, 'Available', NOW(), NOW(), 'WXY901', 7000, 2, 'https://example.com/jeep-cherokee.jpg', 2),
('Land Rover', 'Range Rover', 2023, 80.00, 'Available', NOW(), NOW(), 'ZAB234', 4000, 2, 'https://example.com/land-rover-range-rover.jpg', 2),
('Porsche', 'Cayenne', 2021, 90.00, 'Available', NOW(), NOW(), 'CDE567', 12000, 2, 'https://example.com/porsche-cayenne.jpg', 2),
('Ford', 'Mustang', 2020, 65.00, 'Available', NOW(), NOW(), 'FGH890', 25000, 1, 'https://example.com/ford-mustang.jpg', 3),
('Chevrolet', 'Camaro', 2022, 70.00, 'Available', NOW(), NOW(), 'IJK123', 8000, 1, 'https://example.com/chevrolet-camaro.jpg', 3),
('Ferrari', '488', 2023, 200.00, 'Available', NOW(), NOW(), 'LMN456', 1000, 1, 'https://example.com/ferrari-488.jpg', 3),
('Lamborghini', 'Huracan', 2021, 250.00, 'Available', NOW(), NOW(), 'OPQ789', 3000, 1, 'https://example.com/lamborghini-huracan.jpg', 3),
('Bugatti', 'Chiron', 2020, 350.00, 'Available', NOW(), NOW(), 'RST012', 5000, 1, 'https://example.com/bugatti-chiron.jpg', 3),
('Maserati', 'GranTurismo', 2021, 150.00, 'Available', NOW(), NOW(), 'UVW345', 12000, 1, 'https://example.com/maserati-granturismo.jpg', 3),
('Aston Martin', 'Vantage', 2022, 180.00, 'Available', NOW(), NOW(), 'XYZ678', 4000, 1, 'https://example.com/aston-martin-vantage.jpg', 3),
('McLaren', '720S', 2023, 300.00, 'Available', NOW(), NOW(), 'ABC901', 2000, 1, 'https://example.com/mclaren-720s.jpg', 3),
('Koenigsegg', 'Agera RS', 2020, 500.00, 'Available', NOW(), NOW(), 'DEF234', 1000, 1, 'https://example.com/koenigsegg-agera-rs.jpg', 3),
('Pagani', 'Huayra', 2021, 400.00, 'Available', NOW(), NOW(), 'GHI567', 5000, 1, 'https://example.com/pagani-huayra.jpg', 3);