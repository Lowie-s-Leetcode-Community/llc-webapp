const prisma = require('./prisma.js')
const { getLeaderboard } = require('./leaderboardController.js')
const logger = require('../logger');

async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
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
        logger.error(error);
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
                userSolvedProblems,
                problemCount: missionProblems,
                progress,
            };
        });

        return userMissions;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

// Get user's status of one mission (haven't tested)
async function getUserMissionDetails(id, missionId) {
    try {
        id = parseInt(id);
        missionId = parseInt(missionId);

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
                id: problem.id,
                title: problem.title,
                link: problem.titleSlug,
                difficulty: problem.difficulty,
                solved,
            };
        });
        
        return {
            missionId: mission.id,
            missionName: mission.name,
            description: mission.description,
            isHidden: mission.isHidden,
            problems: missionProblems,
        };
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
        throw error;
    }
}

// Get user's rank and score in current month
async function getUserMonthlyStats(userId, leaderboard) {
    try {
        userId = parseInt(userId);
        if (!leaderboard) {
            leaderboard = await getLeaderboard();
        }
        const userRank = leaderboard.findIndex(user => user.id === userId) + 1;
        const userScore = leaderboard.find(user => user.id === userId).scoreEarned;
        return {
            rank: userRank,
            score: userScore
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

// Get user's number of aced missions
async function getUserNumberOfAcedMissions(userId) {
    try {
        userId = parseInt(userId);
        const userMissions = await getUserMissions(userId);
        const numberOfAcedMissions = userMissions.filter((mission) => mission.progress === 100).length;
        return { aced: numberOfAcedMissions };

    } catch (error) {
        logger.error(error);
        throw error;
    }
}

// Get user's number of solved problems
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
        logger.error(error);
        throw error;
    }
}

// Get user's top 5 missions with most progress
async function getUserMostProgressedMissions(userId) {
    try {
        userId = parseInt(userId);
        const userMissions = await getUserMissions(userId);
        const inProgressMissions = userMissions.filter((mission) => mission.progress < 100 && mission.progress > 0);
        const completedMissions = userMissions.filter((mission) => mission.progress === 100);
        const sortedMissions = inProgressMissions.sort((a, b) => b.progress - a.progress);
        const topMissions = sortedMissions.slice(0, 5);
        
        if (topMissions.length < 5 && completedMissions.length > 0) {
            const remainingMissions = completedMissions.slice(0, 5 - topMissions.length);
            topMissions.push(...remainingMissions);
        }
        
        return topMissions;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

// Get user's dashboard statistics
async function getUserDashboardStats(userId) {
    try {
        userId = parseInt(userId);
        const userNumberOfAcedMissions = await getUserNumberOfAcedMissions(userId);
        const userNumberOfSolvedProblems = await getUserNumberOfSolvedProblems(userId);
        const leaderboard = await getLeaderboard();
        const monthlyStats = await getUserMonthlyStats(userId, leaderboard);
        const userMostProgressedMissions = await getUserMostProgressedMissions(userId);
        
        const dashboardStats = {
            aced: userNumberOfAcedMissions.aced,
            solved: userNumberOfSolvedProblems.solved,
            rank: monthlyStats.rank,
            score: monthlyStats.score,
            leaderboard: leaderboard,
            topMissions: userMostProgressedMissions,
        };
        
        return dashboardStats;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

// Get user's rank in current month
async function getUserRank(userId, leaderboard) {
    try {
        userId = parseInt(userId);
        if (!leaderboard) {
            leaderboard = await getLeaderboard();
        }
        const userRank = leaderboard.findIndex(user => user.id === userId) + 1;
        return {
            rank: userRank,
        };
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    getAllUsers,
    getUserMissions,
    getUserMissionDetails,
    getUserProfile,
    getUserIdFromDiscordId,
    getUser,
    getUserDashboardStats,
    getUserNumberOfAcedMissions,
    getUserNumberOfSolvedProblems,
    getUserMostProgressedMissions,
    getUserMonthlyStats,
    getUserRank,
};
