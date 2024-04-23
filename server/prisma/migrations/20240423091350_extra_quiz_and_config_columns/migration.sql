-- AlterTable
ALTER TABLE "DiscordQuiz" ADD COLUMN     "answerExplanation" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hint" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "SystemConfiguration" ADD COLUMN     "contestAlertId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contestRoleId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "dailyDiscussionChannelId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "UserDiscordQuiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "encountersTimes" INTEGER NOT NULL DEFAULT 0,
    "correctTimes" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "discordQuizId" INTEGER NOT NULL,

    CONSTRAINT "UserDiscordQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestConfiguration" (
    "id" SERIAL NOT NULL,
    "weeklyContestId" INTEGER NOT NULL,
    "biweeklyContestId" INTEGER NOT NULL,

    CONSTRAINT "ContestConfiguration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDiscordQuiz" ADD CONSTRAINT "UserDiscordQuiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiscordQuiz" ADD CONSTRAINT "UserDiscordQuiz_discordQuizId_fkey" FOREIGN KEY ("discordQuizId") REFERENCES "DiscordQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
