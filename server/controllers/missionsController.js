const prisma = require('./prisma.js')

async function getAllMissions() {
  return await prisma.mission.findMany();
}

async function getMissionById(id) {
  return await prisma.mission.findUnique({
    where: {
      id: id,
    },
  });
}

module.exports = { getAllMissions, getMissionById };