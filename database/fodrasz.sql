-- =====================================================
-- Fodrász szalon időpontfoglaló rendszer
-- Vizsgaremek – javított adatbázis séma
-- MariaDB 10.4+
-- =====================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- -----------------------------------------------------
-- Adatbázis
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `fodrasz`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE `fodrasz`;

-- -----------------------------------------------------
-- USERS
-- -----------------------------------------------------
CREATE TABLE `users` (
  `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(40) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`user_id`),
  UNIQUE KEY `ux_users_email` (`email`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- STYLISTS
-- -----------------------------------------------------
CREATE TABLE `stylists` (
  `stylist_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `specialization` VARCHAR(120) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `phone` VARCHAR(40) DEFAULT NULL,

  PRIMARY KEY (`stylist_id`),
  UNIQUE KEY `ux_stylists_email` (`email`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- SERVICES
-- -----------------------------------------------------
CREATE TABLE `services` (
  `service_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `duration_minutes` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,

  PRIMARY KEY (`service_id`),
  CHECK (`duration_minutes` > 0),
  CHECK (`price` >= 0)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- TIMESLOTS
-- -----------------------------------------------------
CREATE TABLE `timeslots` (
  `slot_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `stylist_id` BIGINT UNSIGNED NOT NULL,
  `slot_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `is_available` TINYINT(1) NOT NULL DEFAULT 1,

  PRIMARY KEY (`slot_id`),
  UNIQUE KEY `ux_timeslots_stylist_start`
    (`stylist_id`, `slot_date`, `start_time`),
  KEY `idx_timeslots_stylist_date`
    (`stylist_id`, `slot_date`),

  CONSTRAINT `fk_timeslots_stylist`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `stylists` (`stylist_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CHECK (`start_time` < `end_time`)
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- APPOINTMENTS
-- -----------------------------------------------------
CREATE TABLE `appointments` (
  `appointment_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `stylist_id` BIGINT UNSIGNED NOT NULL,
  `service_id` BIGINT UNSIGNED NOT NULL,
  `appointment_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `status` ENUM('booked','cancelled','completed')
    NOT NULL DEFAULT 'booked',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`appointment_id`),

  UNIQUE KEY `ux_appointments_stylist_start`
    (`stylist_id`, `appointment_date`, `start_time`),

  KEY `idx_appointments_user_date`
    (`user_id`, `appointment_date`),
  KEY `idx_appointments_stylist_date`
    (`stylist_id`, `appointment_date`),
  KEY `idx_appointments_status`
    (`status`),

  CONSTRAINT `fk_appointments_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT `fk_appointments_stylist`
    FOREIGN KEY (`stylist_id`)
    REFERENCES `stylists` (`stylist_id`)
    ON UPDATE CASCADE,

  CONSTRAINT `fk_appointments_service`
    FOREIGN KEY (`service_id`)
    REFERENCES `services` (`service_id`)
    ON UPDATE CASCADE,

  CHECK (`start_time` < `end_time`)
) ENGINE=InnoDB;

COMMIT;