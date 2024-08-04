/*
  Warnings:

  - You are about to drop the column `reatedAt` on the `wishlists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `wishlists` DROP COLUMN `reatedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
