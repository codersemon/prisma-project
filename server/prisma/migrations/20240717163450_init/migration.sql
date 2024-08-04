/*
  Warnings:

  - You are about to alter the column `order_status` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(4))`.
  - Added the required column `price` to the `orderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitems` ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `orders` MODIFY `order_status` ENUM('pending', 'processing', 'cancelled', 'completed', 'refunded') NOT NULL DEFAULT 'pending';
