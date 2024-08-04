/*
  Warnings:

  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `stock`,
    ADD COLUMN `height` DOUBLE NULL,
    ADD COLUMN `length` DOUBLE NULL,
    ADD COLUMN `stock_quantity` INTEGER NULL,
    ADD COLUMN `stock_status` ENUM('in_stock', 'out_of_stock', 'on_waitlist_order') NOT NULL DEFAULT 'in_stock',
    ADD COLUMN `weight` DOUBLE NULL,
    ADD COLUMN `width` DOUBLE NULL;
