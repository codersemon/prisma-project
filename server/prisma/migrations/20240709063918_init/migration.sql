-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `type` ENUM('home', 'office') NOT NULL DEFAULT 'home';
