import { PrismaClient } from '@prisma/client'

/**
 * Input for this seed: problems.json, topics.json, problem_topics.json
 *  
 */

const prisma = new PrismaClient();
async function main() {
  const {default: quizzesList} = await import('./backup_json_data/discord_quiz.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
    quizzesList.map(async quiz => {
      const {id, category, difficulty, question, correctAnswerId} = quiz;
      await prisma.discordQuiz.upsert({
        where: { id: id },
        update: {},
        create: {
          id, category, difficulty, question, correctAnswerId
        }
      })
    })
  )

  const {default: answersList} = await import('./backup_json_data/discord_quiz_answer.json', {
    assert: {
      type: 'json'
    }
  })
  Promise.all(
    answersList.map(async ans => {
      const {answer, id, discordQuizId} = ans;
      await prisma.discordQuizAnswer.upsert({
        where: { id: id },
        update: {},
        create: {
          answer, id, discordQuizId
        }
      })
    })
  )

  const {default: topicsList} = await import('./backup_json_data/topics.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
    topicsList.map(async topic => {
      const {id, topicName} = topic;
      await prisma.topic.upsert({
        where: { id: id },
        update: {},
        create: {
          id: id,
          topicName: topicName,
        }
      })
    })
  )

  const {default: problemsList} = await import('./backup_json_data/problems.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
    problemsList.map(async problem => {
      const { id, title,
        title_slug, difficulty, premium, topics } = problem;
      
      await prisma.problem.upsert({
        where: { id: id },
        update: {
          topics: {
            connect: topics.map(id => ({ id: id }))
          }
        },
        create: {
          id: id,
          title: title,
          titleSlug: title_slug,
          difficulty: difficulty,
          isPremium: premium,
          topics: {
            connect: topics.map(id => ({ id: id }))
          }
        }
      })
    })
  )

  // require users.json, which would be .gitignored. Please contact PM if you haven't got the file.
  const {default: usersList} = await import('./backup_json_data/users.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
    usersList.map(async user => {
      const { id, lc_username, recent_ac, discord_id } = user;
      
      await prisma.user.upsert({
        where: { id: id },
        update: {
          mostRecentSubId: parseInt(recent_ac || -1),
        },
        create: {
          id,
          discordId: discord_id,
          leetcodeUsername: lc_username,
          mostRecentSubId: parseInt(recent_ac || -1),
        }
      })
    })
  )

  // require user_solved_problems.json, which would be .gitignored. Please contact PM if you haven't got the file.
  const {default: userProblemsList} = await import('./backup_json_data/user_solved_problems.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
    userProblemsList.map(async userProblem => {
      const { id, problemId, userId } = userProblem;
      
      await prisma.userSolvedProblem.upsert({
        where: { id: id },
        update: {},
        create: {
          id: id,
          problemId: problemId,
          userId: userId,
          submissionId: -1
        }
      })
    })
  )

  const {default: missionsList} = await import('./backup_json_data/missions.json', {
    assert: {
      type: 'json'
    }
  })
  Promise.all(
    missionsList.map(async mission => {
      const {id, name, description, isHidden, rewardImageURL, problems} = mission;

      await prisma.mission.upsert({
        where: { id: id },
        update: {},
        create: {
          id, name, description, isHidden, rewardImageURL,
          problems: {
            connect: problems.map(id => (id))
          }
        }
      })
    })
  )

  const {default: dailyObjects} = await import('./backup_json_data/dailies.json', {
    assert: {
      type: 'json'
    }
  })

  await Promise.all(
    dailyObjects.map(async daily => {
      const {id, problemId, generatedDate} = daily;
      await prisma.dailyObject.upsert({
        where: { id: id },
        update: {},
        create: {
          id, problemId,
          generatedDate: new Date(generatedDate).toISOString(),
        }
      })
    })
  )

  const {default: userDailyObjects} = await import('./backup_json_data/user_dailies.json', {
    assert: {
      type: 'json'
    }
  })

  Promise.all(
    userDailyObjects.map(async userDailyObject => {
      const {
        id, userId, dailyObjectId, solvedDaily, solvedEasy, solvedMedium,
        solvedHard, scoreEarned, scoreGacha
      } = userDailyObject;

      await prisma.userDailyObject.upsert({
        where: { id: id },
        update: {},
        create: {
          id, userId, dailyObjectId, solvedDaily, solvedEasy, solvedMedium,
          solvedHard, scoreEarned, scoreGacha
        }
      })
    })
  )

  const {default: userMonthlyObjects} = await import('./backup_json_data/user_monthlies.json', {
    assert: {
      type: 'json'
    }
  })

  Promise.all(
    userMonthlyObjects.map(async monthlyObject => {
      const {id, userId, scoreEarned, firstDayOfMonth} = monthlyObject;

      await prisma.userMonthlyObject.upsert({
        where: { id: id },
        update: {},
        create: {
          id, userId, scoreEarned,
          firstDayOfMonth: new Date(firstDayOfMonth).toISOString(),
        }
      })
    })
  )

  // Configurations
  await prisma.systemConfiguration.upsert({
    where: { id: 1 },
    update: {
      serverId: process.env.SERVER_ID,
      verifiedRoleId: process.env.VERIFIED_ROLE_ID,
      unverifiedRoleId: process.env.UNVERIFIED_ROLE_ID,
      submissionChannelId: process.env.SUBMISSION_CHANNEL_ID,
      scoreLogChannelId: process.env.SCORE_LOG_CHANNEL_ID,
      dailyThreadChannelId: process.env.DAILY_THREAD_CHANNEL_ID,
      devErrorLogId: process.env.DEV_ERROR_LOG_ID,
      databaseLogId: process.env.DATABASE_LOG_ID,
      backupChannelId: process.env.BACKUP_CHANNEL_ID,
      eventLoggingId: process.env.EVENT_LOGGING_ID
    },
    create: {
      serverId: process.env.SERVER_ID,
      verifiedRoleId: process.env.VERIFIED_ROLE_ID,
      unverifiedRoleId: process.env.UNVERIFIED_ROLE_ID,
      submissionChannelId: process.env.SUBMISSION_CHANNEL_ID,
      scoreLogChannelId: process.env.SCORE_LOG_CHANNEL_ID,
      dailyThreadChannelId: process.env.DAILY_THREAD_CHANNEL_ID,
      devErrorLogId: process.env.DEV_ERROR_LOG_ID,
      databaseLogId: process.env.DATABASE_LOG_ID,
      backupChannelId: process.env.BACKUP_CHANNEL_ID,
      eventLoggingId: process.env.EVENT_LOGGING_ID
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })