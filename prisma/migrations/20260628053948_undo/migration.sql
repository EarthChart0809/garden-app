/*
  Warnings:

  - You are about to drop the `Plant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GardenLogToPlant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GardenLogToPlant" DROP CONSTRAINT "_GardenLogToPlant_A_fkey";

-- DropForeignKey
ALTER TABLE "_GardenLogToPlant" DROP CONSTRAINT "_GardenLogToPlant_B_fkey";

-- DropTable
DROP TABLE "Plant";

-- DropTable
DROP TABLE "_GardenLogToPlant";
