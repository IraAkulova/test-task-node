/*
  Warnings:

  - You are about to drop the column `adminId` on the `bosses` table. All the data in the column will be lost.
  - You are about to drop the column `adminId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bossId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bosses" DROP CONSTRAINT "bosses_adminId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_adminId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_bossId_fkey";

-- AlterTable
ALTER TABLE "bosses" DROP COLUMN "adminId",
ADD COLUMN     "adminid" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adminId",
DROP COLUMN "bossId",
ADD COLUMN     "adminid" TEXT,
ADD COLUMN     "bossid" TEXT;

-- AddForeignKey
ALTER TABLE "bosses" ADD CONSTRAINT "bosses_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adminid_fkey" FOREIGN KEY ("adminid") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_bossid_fkey" FOREIGN KEY ("bossid") REFERENCES "bosses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
