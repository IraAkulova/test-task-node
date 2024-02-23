-- AlterTable
ALTER TABLE "bosses" ADD COLUMN     "adminId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adminId" TEXT,
ADD COLUMN     "bossId" TEXT;

-- AddForeignKey
ALTER TABLE "bosses" ADD CONSTRAINT "bosses_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_bossId_fkey" FOREIGN KEY ("bossId") REFERENCES "bosses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
