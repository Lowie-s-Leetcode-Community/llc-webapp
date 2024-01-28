const prisma = require('./prisma.js');
const { getFirstMondayOfMonth, getFirstMondayOfNextMonth } = require('../utils/dateUtils.js');
const logger = require('../logger');

// Get leaderboard with pagination
async function getLeaderboard(page) {
  try {
    const pageSize = page ? 10 : undefined;
    const offset = page ? (page - 1) * pageSize : 0;

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
      skip: offset,
      take: pageSize,
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
    return leaderboardWithScore;
  } catch (e) {
    logger.error(e);
  }
}

module.exports = { getLeaderboard };
