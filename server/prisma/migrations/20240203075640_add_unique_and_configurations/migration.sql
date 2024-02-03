/*
  Warnings:

  - You are about to drop the column `eventChannelId` on the `SystemConfiguration` table. All the data in the column will be lost.
  - You are about to drop the column `feedbackChannelId` on the `SystemConfiguration` table. All the data in the column will be lost.
  - You are about to drop the column `lastDailyCheck` on the `SystemConfiguration` table. All the data in the column will be lost.
  - You are about to drop the column `qaChannelId` on the `SystemConfiguration` table. All the data in the column will be lost.
  - You are about to drop the column `trackingChannelId` on the `SystemConfiguration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,dailyObjectId]` on the table `UserDailyObject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,firstDayOfMonth]` on the table `UserMonthlyObject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,problemId]` on the table `UserSolvedProblem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `databaseLogId` to the `SystemConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `devErrorLogId` to the `SystemConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLoggingId` to the `SystemConfiguration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submissionChannelId` to the `SystemConfiguration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SystemConfiguration" DROP COLUMN "eventChannelId",
DROP COLUMN "feedbackChannelId",
DROP COLUMN "lastDailyCheck",
DROP COLUMN "qaChannelId",
DROP COLUMN "trackingChannelId",
ADD COLUMN     "dailySolveScore" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "databaseLogId" TEXT NOT NULL,
ADD COLUMN     "devErrorLogId" TEXT NOT NULL,
ADD COLUMN     "easySolveScore" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "eventLoggingId" TEXT NOT NULL,
ADD COLUMN     "hardSolveScore" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "mediumSolveScore" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "practiceScoreCap" INTEGER NOT NULL DEFAULT 6,
ADD COLUMN     "streakBonus" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "submissionChannelId" TEXT NOT NULL,
ALTER COLUMN "serverId" SET DATA TYPE TEXT,
ALTER COLUMN "verifiedRoleId" SET DATA TYPE TEXT,
ALTER COLUMN "scoreLogChannelId" SET DATA TYPE TEXT,
ALTER COLUMN "dailyThreadChannelId" SET DATA TYPE TEXT,
ALTER COLUMN "timeBeforeKick" SET DEFAULT 604800,
ALTER COLUMN "unverifiedRoleId" SET DATA TYPE TEXT,
ALTER COLUMN "backupChannelId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyObject_userId_dailyObjectId_key" ON "UserDailyObject"("userId", "dailyObjectId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMonthlyObject_userId_firstDayOfMonth_key" ON "UserMonthlyObject"("userId", "firstDayOfMonth");

-- CreateIndex
CREATE UNIQUE INDEX "UserSolvedProblem_userId_problemId_key" ON "UserSolvedProblem"("userId", "problemId");
