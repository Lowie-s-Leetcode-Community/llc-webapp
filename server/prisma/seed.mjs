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
  Promise.all(
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
  Promise.all(
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
  Promise.all(
    usersList.map(async user => {
      const { id, lc_username, recent_ac, discord_id } = user;
      
      await prisma.user.upsert({
        where: { id: id },
        update: {
          mostRecentSubId: parseInt(recent_ac || -1),
        },
        create: {
          id: id,
          discordId: String(discord_id),
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
  Promise.all(
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