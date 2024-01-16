const prisma = require('./prisma.js')
const { getLeaderboard } = require('./leaderboardController.js')

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
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get user's finished missions, rank in server, top 3 recent awards, favourite missions, and number of solved problems
async function getUserStats(id) {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                userSolvedProblems: {
                    include: {
                        problem: true,
                    },
                },
                favoriteMissions: true,
            },
        });

        const leaderboard = await getLeaderboard();
        const userIndex = leaderboard.findIndex(user => user.id === id);
        const userRank = userIndex !== -1 ? userIndex + 1 : null;

        const solvedProblemsCount = user.userSolvedProblems.length;

        return {
            rank: userRank,
            favoriteMissions: user.favoriteMissions,
            solvedProblemsCount: solvedProblemsCount,
        };
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

        const missions = await prisma.Mission.findMany({
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

        console.log(userMissions)

        return userMissions;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Get user's status of one mission
async function getUserMissionDetails(id, missionId) {
    try {
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

        const mission = await prisma.Mission.findUnique({
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

module.exports = { getAllUsers, getUserStats, getUserMissions, getUserMissionDetails, getUserProfile, getUserIdFromDiscordId, getUser }
