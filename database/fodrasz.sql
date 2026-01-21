-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--


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
  MODIFY `service_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `stylists`
--
ALTER TABLE `stylists`
  MODIFY `stylist_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `timeslots`
--
ALTER TABLE `timeslots`
  MODIFY `slot_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
