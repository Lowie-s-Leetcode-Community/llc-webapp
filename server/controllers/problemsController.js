const prisma = require('./prisma.js')

async function getDailyProblem() {
    try {
        const dailyObject = await prisma.dailyObject.findFirst({
            orderBy: {
                generatedDate: 'desc'
            }
        });
        
        const problem = await prisma.problem.findUnique({
            where: {
                id: dailyObject.problemId
            },
            include: {
                topics: {
                    select: {
                        id: true,
                        topicName: true
                    }
                },
                userSolvedProblems: {
                    select: {
                        userId: true
                    },
                    distinct: ['userId']
                }
            }
        });

        const dailyChallenge = {
            id: problem.id,
            title: problem.title,
            titleSlug: problem.titleSlug,
            difficulty: problem.difficulty,
            topics: problem.topics,
            numberOfMembersSolved: problem.userSolvedProblems.length
        }
        return dailyChallenge;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getDailyProblem };