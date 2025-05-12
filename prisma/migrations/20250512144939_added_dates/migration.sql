/*
  Warnings:

  - Added the required column `rentFrom` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentTo` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "rentFrom" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rentTo" TIMESTAMP(3) NOT NULL;
