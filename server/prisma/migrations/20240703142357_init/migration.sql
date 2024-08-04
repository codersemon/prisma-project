/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `thumbnail`,
    ADD COLUMN `thumbnailId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
