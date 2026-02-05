-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jan 28. 21:39
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `fodrasz`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `stylist_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('booked','cancelled','completed') DEFAULT 'booked',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payments`
--

CREATE TABLE `payments` (
  `payment_id` bigint(20) UNSIGNED NOT NULL,
  `stylist_id` bigint(20) UNSIGNED NOT NULL,
  `appointment_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `duration_minutes` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `services`
--

INSERT INTO `services` (`service_id`, `name`, `duration_minutes`, `price`) VALUES
(1, 'Hajvágás', 30, 4500.00),
(2, 'Festés', 90, 18000.00),
(3, 'Férfi hajvágás', 30, 4000.00),
(4, 'Borotválás', 20, 3000.00),
(5, 'Esküvői frizura', 120, 30000.00);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `stylists`
--

CREATE TABLE `stylists` (
  `stylist_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `specialization` varchar(120) DEFAULT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `stylists`
--

INSERT INTO `stylists` (`stylist_id`, `name`, `email`, `password_hash`, `specialization`, `phone`, `created_at`) VALUES
(1, 'Kiss Anna', 'anna@szalon.hu', '', 'Női hajvágás', '06301234567', '2026-01-28 19:59:16'),
(2, 'Nagy Péter', 'peter@szalon.hu', '', 'Férfi hajvágás', '06307654321', '2026-01-28 19:59:16'),
(3, 'Szabó Júlia', 'julia@szalon.hu', '', 'Festés', '06201239876', '2026-01-28 19:59:16'),
(4, 'Tóth Bence', '06701234598', '', 'Borbély', '06701234598', '2026-01-28 19:59:16'),
(5, 'Varga Eszter', 'eszter@szalon.hu', '', 'Esküvői frizura', '06301112233', '2026-01-28 19:59:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `timeslots`
--

CREATE TABLE `timeslots` (
  `slot_id` bigint(20) UNSIGNED NOT NULL,
  `stylist_id` bigint(20) UNSIGNED NOT NULL,
  `slot_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_available` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `timeslots`
--

INSERT INTO `timeslots` (`slot_id`, `stylist_id`, `slot_date`, `start_time`, `end_time`, `is_available`) VALUES
(1, 1, '2026-02-01', '09:00:00', '17:00:00', 1),
(2, 2, '2026-02-01', '10:00:00', '18:00:00', 1),
(3, 3, '2026-02-01', '08:00:00', '16:00:00', 1),
(4, 4, '2026-02-01', '11:00:00', '19:00:00', 1),
(5, 5, '2026-02-01', '09:00:00', '15:00:00', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `phone`, `created_at`) VALUES
(1, 'Teszt Judit', 'judit@gmail.com', '', '06205556666', '2026-01-28 20:00:36');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `stylist_id` (`stylist_id`),
  ADD KEY `service_id` (`service_id`);

--
-- A tábla indexei `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `stylist_id` (`stylist_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- A tábla indexei `stylists`
--
ALTER TABLE `stylists`
  ADD PRIMARY KEY (`stylist_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `timeslots`
--
ALTER TABLE `timeslots`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `stylist_id` (`stylist_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `service_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `stylists`
--
ALTER TABLE `stylists`
  MODIFY `stylist_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `slot_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`stylist_id`) REFERENCES `stylists` (`stylist_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`stylist_id`) REFERENCES `stylists` (`stylist_id`),
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`);

--
-- Megkötések a táblához `timeslots`
--
ALTER TABLE `timeslots`
  ADD CONSTRAINT `timeslots_ibfk_1` FOREIGN KEY (`stylist_id`) REFERENCES `stylists` (`stylist_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
