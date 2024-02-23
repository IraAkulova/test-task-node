/*
  Warnings:

  - You are about to drop the column `verified` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `bosses` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `users` table. All the data in the column will be lost.
  - Added the required column `isLogedIn` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLogedIn` to the `bosses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isLogedIn` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "verified",
ADD COLUMN     "isLogedIn" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "bosses" DROP COLUMN "verified",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "isLogedIn" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "verified",
ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "bossId" TEXT,
ADD COLUMN     "isLogedIn" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "bosses" ADD CONSTRAINT "bosses_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "bosses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
