/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `productCategories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `productCategories_name_key` ON `productCategories`(`name`);
