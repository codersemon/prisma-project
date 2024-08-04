/*
  Warnings:

  - You are about to drop the column `photo` on the `productcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productcategories` DROP COLUMN `photo`,
    ADD COLUMN `photoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productCategories` ADD CONSTRAINT `productCategories_photoId_fkey` FOREIGN KEY (`photoId`) REFERENCES `media`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
