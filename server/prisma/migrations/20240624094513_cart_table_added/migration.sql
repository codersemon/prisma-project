-- CreateTable
CREATE TABLE `productCarts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productCarts` ADD CONSTRAINT `productCarts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productCarts` ADD CONSTRAINT `productCarts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users_meta`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
