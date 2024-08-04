/*
  Warnings:

  - Added the required column `regular_price` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productcategories` ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `regular_price` DOUBLE NOT NULL;
