const prisma = require('./prisma.js')
const {getFirstMondayOfMonth, getFirstMondayOfNextMonth} = require('../utils/dateUtils.js')

// Get all users sorted by score earned in current month
async function getLeaderboard() {
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
    return leaderboardWithScore;
  } catch (e) {
    console.log(e);
  }
}


module.exports = {getLeaderboard}