/*
  Warnings:

  - The values [seller] on the enum `users_meta_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `users_meta` MODIFY `role` ENUM('customer', 'administrator') NOT NULL DEFAULT 'customer';

-- CreateTable
CREATE TABLE `productReviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `status` ENUM('pending', 'published', 'trash') NOT NULL DEFAULT 'pending',
    `userId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productReviews` ADD CONSTRAINT `productReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users_meta`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productReviews` ADD CONSTRAINT `productReviews_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
