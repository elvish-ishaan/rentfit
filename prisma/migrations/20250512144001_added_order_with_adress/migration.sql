/*
  Warnings:

  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `landmark` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "alternatePhone" INTEGER,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "landmark" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
