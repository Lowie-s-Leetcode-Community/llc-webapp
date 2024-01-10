import { PrismaClient } from '@prisma/client'
// import problemsList from './backup_json_data/problems.json' assert { type: "json" };

/**
 * Input for this seed: problems.json, topics.json, problem_topics.json
 *  
 */

const prisma = new PrismaClient();
async function main() {
  const {default: problemsList} = await import('./backup_json_data/problems.json', {
    assert: {
      type: 'json'
    }
  })
  Promise.all(
    problemsList.map(async problem => {
      const { id, title,
        title_slug, difficulty, premium } = problem;
      
      await prisma.problem.upsert({
        where: { id: id},
        update: {},
        create: {
          id: id,
          title: title,
          titleSlug: title_slug,
          difficulty: difficulty,
          isPremium: premium,
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