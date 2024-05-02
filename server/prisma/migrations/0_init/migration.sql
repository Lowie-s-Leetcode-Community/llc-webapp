-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "leetcodeUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mostRecentSubId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "titleSlug" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSolvedProblem" (
    "id" SERIAL NOT NULL,
    "submissionId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSolvedProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "topicName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyObject" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "problemId" INTEGER NOT NULL,
    "generatedDate" DATE NOT NULL,

    CONSTRAINT "DailyObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDailyObject" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "dailyObjectId" INTEGER NOT NULL,
    "solvedDaily" INTEGER NOT NULL DEFAULT 0,
    "solvedEasy" INTEGER NOT NULL DEFAULT 0,
    "solvedMedium" INTEGER NOT NULL DEFAULT 0,
    "solvedHard" INTEGER NOT NULL DEFAULT 0,
    "scoreEarned" INTEGER NOT NULL DEFAULT 0,
    "scoreGacha" INTEGER NOT NULL DEFAULT -1,

    CONSTRAINT "UserDailyObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMonthlyObject" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "scoreEarned" INTEGER NOT NULL,
    "firstDayOfMonth" DATE NOT NULL,

    CONSTRAINT "UserMonthlyObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isHidden" BOOLEAN NOT NULL,
    "rewardImageURL" TEXT,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordQuiz" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "correctAnswerId" INTEGER NOT NULL,

    CONSTRAINT "DiscordQuiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordQuizAnswer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "answer" TEXT NOT NULL,
    "discordQuizId" INTEGER NOT NULL,

    CONSTRAINT "DiscordQuizAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemConfiguration" (
    "id" SERIAL NOT NULL,
    "serverId" TEXT NOT NULL,
    "verifiedRoleId" TEXT NOT NULL,
    "unverifiedRoleId" TEXT NOT NULL,
    "timeBeforeKick" INTEGER NOT NULL DEFAULT 604800,
    "dailySolveScore" INTEGER NOT NULL DEFAULT 2,
    "easySolveScore" INTEGER NOT NULL DEFAULT 1,
    "mediumSolveScore" INTEGER NOT NULL DEFAULT 2,
    "hardSolveScore" INTEGER NOT NULL DEFAULT 3,
    "practiceScoreCap" INTEGER NOT NULL DEFAULT 6,
    "streakBonus" INTEGER NOT NULL DEFAULT 4,
    "submissionChannelId" TEXT NOT NULL,
    "scoreLogChannelId" TEXT NOT NULL,
    "dailyThreadChannelId" TEXT NOT NULL,
    "devErrorLogId" TEXT NOT NULL,
    "databaseLogId" TEXT NOT NULL,
    "backupChannelId" TEXT NOT NULL,
    "eventLoggingId" TEXT NOT NULL,

    CONSTRAINT "SystemConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemToTopic" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MissionToProblem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_leetcodeUsername_key" ON "User"("leetcodeUsername");

-- CreateIndex
CREATE UNIQUE INDEX "UserSolvedProblem_userId_problemId_key" ON "UserSolvedProblem"("userId", "problemId");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topicName_key" ON "Topic"("topicName");

-- CreateIndex
CREATE UNIQUE INDEX "DailyObject_generatedDate_key" ON "DailyObject"("generatedDate");

-- CreateIndex
CREATE UNIQUE INDEX "UserDailyObject_userId_dailyObjectId_key" ON "UserDailyObject"("userId", "dailyObjectId");

-- CreateIndex
CREATE UNIQUE INDEX "UserMonthlyObject_userId_firstDayOfMonth_key" ON "UserMonthlyObject"("userId", "firstDayOfMonth");

-- CreateIndex
CREATE UNIQUE INDEX "_ProblemToTopic_AB_unique" ON "_ProblemToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_ProblemToTopic_B_index" ON "_ProblemToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MissionToProblem_AB_unique" ON "_MissionToProblem"("A", "B");

-- CreateIndex
CREATE INDEX "_MissionToProblem_B_index" ON "_MissionToProblem"("B");

-- AddForeignKey
ALTER TABLE "UserSolvedProblem" ADD CONSTRAINT "UserSolvedProblem_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSolvedProblem" ADD CONSTRAINT "UserSolvedProblem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyObject" ADD CONSTRAINT "DailyObject_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDailyObject" ADD CONSTRAINT "UserDailyObject_dailyObjectId_fkey" FOREIGN KEY ("dailyObjectId") REFERENCES "DailyObject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDailyObject" ADD CONSTRAINT "UserDailyObject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMonthlyObject" ADD CONSTRAINT "UserMonthlyObject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscordQuizAnswer" ADD CONSTRAINT "DiscordQuizAnswer_discordQuizId_fkey" FOREIGN KEY ("discordQuizId") REFERENCES "DiscordQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTopic" ADD CONSTRAINT "_ProblemToTopic_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemToTopic" ADD CONSTRAINT "_ProblemToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionToProblem" ADD CONSTRAINT "_MissionToProblem_A_fkey" FOREIGN KEY ("A") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MissionToProblem" ADD CONSTRAINT "_MissionToProblem_B_fkey" FOREIGN KEY ("B") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

