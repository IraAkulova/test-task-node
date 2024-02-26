/*
  Warnings:

  - You are about to drop the column `adminid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bossid` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bosses` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "bosses" DROP CONSTRAINT "bosses_adminid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_adminid_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_bossid_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adminid",
DROP COLUMN "bossid",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "bossId" TEXT,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'user';

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "bosses";
