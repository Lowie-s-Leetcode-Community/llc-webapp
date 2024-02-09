/*
  Warnings:

  - You are about to drop the column `isToday` on the `DailyObject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[generatedDate]` on the table `DailyObject` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DailyObject" DROP COLUMN "isToday";

-- CreateIndex
CREATE UNIQUE INDEX "DailyObject_generatedDate_key" ON "DailyObject"("generatedDate");
