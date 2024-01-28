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

// Get user's finished missions, rank in server, top 3 recent awards, favourite missions, and number of solved problems
async function getUserStats(id) {
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
                userSolvedProblems,
                problemCount: missionProblems,
                progress,
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
