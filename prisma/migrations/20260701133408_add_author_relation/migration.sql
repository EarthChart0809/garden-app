-- AlterTable
ALTER TABLE "GardenLog" ADD COLUMN     "authorId" UUID;

-- AddForeignKey
ALTER TABLE "GardenLog" ADD CONSTRAINT "GardenLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
