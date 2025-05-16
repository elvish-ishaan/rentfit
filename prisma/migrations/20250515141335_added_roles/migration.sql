-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User', 'Merchant');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
