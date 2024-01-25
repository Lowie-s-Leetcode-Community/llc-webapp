const prisma = require('./prisma.js')
const { getFirstMondayOfMonth, getFirstMondayOfNextMonth } = require('../utils/dateUtils.js');

async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserIdFromDiscordId(discordId) {
    try {
        const user = await prisma.user.findUnique({
            where: { discordId: discordId },
            select: { id: true },
        });

        return user.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUser(userId) {
    try {
        userId = parseInt(userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get user's status of all missions
async function getUserMissions(userId) {
    try {
        userId = parseInt(userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                userSolvedProblems: {
                    select: {
                        problem: {
                            select: {
                                missions: true,
                            },
                        },
                    },
                },
            },
        });

        const missions = await prisma.mission.findMany({
            include: {
                problems: true,
            },
        });

        const userMissions = missions.map((mission) => {
            const missionProblems = mission.problems.length;
            const userSolvedProblems = user.userSolvedProblems.filter((solvedProblem) => {
                return solvedProblem.problem.missions.some((missionOfProblem) => missionOfProblem.id === mission.id);
            }).length;
            const progress = (userSolvedProblems / missionProblems) * 100;
            return {
                id: mission.id,
                name: mission.name,
                progress: progress,
            };
        });

        return userMissions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get user's status of one mission (haven't tested)
async function getUserMissionDetails(id, missionId) {
    try {
        id = parseInt(id);
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                userSolvedProblems: {
                    include: {
                        problem: true,
                    },
                },
            },
        });

        const mission = await prisma.mission.findUnique({
            where: { id: missionId },
            include: {
                problems: true,
            },
        });

        const missionProblems = mission.problems.map((problem) => {
            const solved = user.userSolvedProblems.some((solvedProblem) => {
                return solvedProblem.problemId === problem.id;
            });
            return {
                problemId: problem.id,
                problemName: problem.name,
                solved: solved,
            };
        });

        const userSolvedProblems = user.userSolvedProblems.filter((solvedProblem) => {
            return solvedProblem.problem.missionId === missionId;
        }).length;

        const progress = userSolvedProblems / missionProblems.length;

        return {
            missionId: mission.id,
            missionName: mission.name,
            progress: progress,
            problems: missionProblems,
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get user's profile (awards, recent ACs) - currently returning only recent ACs
async function getUserProfile(id) {
    try {
        id = parseInt(id);
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                userSolvedProblems: {
                    include: {
                        problem: true,
                    },
                    orderBy: {
                        updatedAt: 'desc',
                    },
                },
            },
        });

        const recentACs = user.userSolvedProblems.map((solvedProblem) => {
            return {
                id: solvedProblem.id,
                submissionId: solvedProblem.submissionId,
                name: solvedProblem.problem.title,
                date: solvedProblem.createdAt,
            };
        });

        return recentACs;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get leaderboard along with user's rank and score in current month
async function getLeaderboardAndUserMonthlyStats(userId) {
    try {
        // TODO: Change leetcode username to discord username
        const leaderboard = await prisma.user.findMany({
            select: {
                id: true,
                leetcodeUsername: true,
                userMonthlyObjects: {
                    select: {
                        scoreEarned: true
                    },
                    where: {
                        firstDayOfMonth: {
                            gte: getFirstMondayOfMonth(),
                            lt: getFirstMondayOfNextMonth()
                        }
                    },
                }
            },
        });

        const leaderboardWithScore = leaderboard.map(user => {
            const scoreEarned = user.userMonthlyObjects.length > 0 ? user.userMonthlyObjects[0].scoreEarned : 0;
            return {
                id: user.id,
                username: user.leetcodeUsername,
                scoreEarned
            }
        });

        leaderboardWithScore.sort((a, b) => b.scoreEarned - a.scoreEarned);

        const userRank = leaderboardWithScore.findIndex(user => user.id === userId) + 1;
        const userScore = leaderboardWithScore.find(user => user.id === userId).scoreEarned;

        return {
            leaderboard: leaderboardWithScore,
            rank: userRank,
            score: userScore
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserNumberOfAcedMissions(userId) {
    try {
        userId = parseInt(userId);
        const userMissions = await getUserMissions(userId);
        const numberOfAcedMissions = userMissions.filter((mission) => mission.progress === 100).length;
        return { aced: numberOfAcedMissions };

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserNumberOfSolvedProblems(userId) {
    try {
        userId = parseInt(userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                userSolvedProblems: true,
            },
        });
        return { solved: user.userSolvedProblems.length };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserMostProgressedMissions(userId) {
    try {
        userId = parseInt(userId);
        const userMissions = await getUserMissions(userId);
        const inProgressMissions = userMissions.filter((mission) => mission.progress < 100);
        const completedMissions = userMissions.filter((mission) => mission.progress === 100);
        const sortedMissions = inProgressMissions.sort((a, b) => b.progress - a.progress);
        const topMissions = sortedMissions.slice(0, 5);
        
        if (topMissions.length < 5 && completedMissions.length > 0) {
            const remainingMissions = completedMissions.slice(0, 5 - topMissions.length);
            topMissions.push(...remainingMissions);
        }
        
        return topMissions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserDashboardStats(userId) {
    try {
        userId = parseInt(userId);
        const userNumberOfAcedMissions = await getUserNumberOfAcedMissions(userId);
        const userNumberOfSolvedProblems = await getUserNumberOfSolvedProblems(userId);
        const monthlyStats = await getLeaderboardAndUserMonthlyStats(userId);
        const userMostProgressedMissions = await getUserMostProgressedMissions(userId);
        
        const dashboardStats = {
            aced: userNumberOfAcedMissions.aced,
            solved: userNumberOfSolvedProblems.solved,
            rank: monthlyStats.rank,
            score: monthlyStats.score,
            leaderboard: monthlyStats.leaderboard,
            topMissions: userMostProgressedMissions,
        };
        
        return dashboardStats;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getAllUsers, getUserMissions, getUserMissionDetails, getUserProfile, getUserIdFromDiscordId, getUser, getUserDashboardStats, getUserNumberOfAcedMissions, getUserNumberOfSolvedProblems, getLeaderboardAndUserMonthlyStats, getUserMostProgressedMissions }
