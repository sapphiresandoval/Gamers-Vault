-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gamers_vault
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gamers_vault` ;

-- -----------------------------------------------------
-- Schema gamers_vault
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamers_vault` DEFAULT CHARACTER SET utf8mb3 ;
USE `gamers_vault` ;

-- -----------------------------------------------------
-- Table `gamers_vault`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamers_vault`.`users` ;

CREATE TABLE IF NOT EXISTS `gamers_vault`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `gamers_vault`.`games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamers_vault`.`games` ;

CREATE TABLE IF NOT EXISTS `gamers_vault`.`games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_lists_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_lists_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamers_vault`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `gamers_vault`.`ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamers_vault`.`ratings` ;

CREATE TABLE IF NOT EXISTS `gamers_vault`.`ratings` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `number` INT NOT NULL,
  `comment` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  `gamet_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ratings_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_ratings_lists1_idx` (`gamet_id` ASC) VISIBLE,
  CONSTRAINT `fk_ratings_lists1`
    FOREIGN KEY (`gamet_id`)
    REFERENCES `gamers_vault`.`games` (`id`),
  CONSTRAINT `fk_ratings_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `gamers_vault`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `gamers_vault`.`list`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gamers_vault`.`list` ;

CREATE TABLE IF NOT EXISTS `gamers_vault`.`list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `games_id` INT NOT NULL,
  `list` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `users_id`, `games_id`),
  INDEX `fk_users_has_games_games1_idx` (`games_id` ASC) VISIBLE,
  INDEX `fk_users_has_games_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_games_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `gamers_vault`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_games_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `gamers_vault`.`games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
