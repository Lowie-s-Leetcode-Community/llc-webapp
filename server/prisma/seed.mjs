import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2';

// Find the required imports here (which has been .gitignored due to privacy):
// https://discord.com/channels/1085444549125611530/1200665465329033306

const prisma = new PrismaClient();
async function main() {
  const {default: quizzesList} = await import('./backup_json_data/discord_quiz.json', {
    assert: {
      type: 'json'
    }
  });
  const createDiscordQuiz = prisma.discordQuiz.createMany({
    data: quizzesList,
  });

  const {default: answersList} = await import('./backup_json_data/discord_quiz_answer.json', {
    assert: {
      type: 'json'
    }
  });
  const createDiscordQuizAnswer = prisma.discordQuizAnswer.createMany({
    data: answersList,
  });

  const {default: topicsList} = await import('./backup_json_data/topics.json', {
    assert: {
      type: 'json'
    }
  })
  const createTopic = prisma.topic.createMany({
    data: topicsList,
  })

  await prisma.$transaction([createDiscordQuiz, createDiscordQuizAnswer, createTopic]);

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

  const {default: userProblemsList} = await import('./backup_json_data/user_solved_problems.json', {
    assert: {
      type: 'json'
    }
  })
  const createUserSolvedProblem = prisma.userSolvedProblem.createMany({
    data: userProblemsList.map((sub) => ({...sub, submissionId: -1})),
  });

  const {default: missionsList} = await import('./backup_json_data/missions.json', {
    assert: {
      type: 'json'
    }
  })
  await Promise.all(
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
  const createDailyObject = prisma.dailyObject.createMany({
    data: dailyObjects.map(({ id, problemId, generatedDate }) => ({
      id, problemId, generatedDate: new Date(generatedDate).toISOString()
    })),
  });
  
  const {default: userDailyObjects} = await import('./backup_json_data/user_dailies.json', {
    assert: {
      type: 'json'
    }
  });
  const createUserDailyObject = prisma.userDailyObject.createMany({
    data: userDailyObjects,
  });

  const {default: userMonthlyObjects} = await import('./backup_json_data/user_monthlies.json', {
    assert: {
      type: 'json'
    }
  })
  const createUserMonthlyObject = prisma.userMonthlyObject.createMany({
    data: userMonthlyObjects.map(({id, userId, scoreEarned, firstDayOfMonth}) => ({
      id, userId, scoreEarned,
      firstDayOfMonth: new Date(firstDayOfMonth).toISOString()
    })),
  });

  const { default: accountList } = await import('./backup_json_data/account.json', {
    assert: {
      type: 'json'
    },
  });
  const updatedAccountList = await Promise.all(accountList.map(async account => {
    account.password = await argon2.hash(account.password);
    return account;
  }));
  const createAccounts = prisma.account.createMany({
    data: updatedAccountList.map(({id, email, password, role}) => ({
      id, email, password, role
    })),
  });

  await prisma.$transaction([createUserSolvedProblem, createDailyObject, createUserDailyObject, createUserMonthlyObject, createAccounts]);
  
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