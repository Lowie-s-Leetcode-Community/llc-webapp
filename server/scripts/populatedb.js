#! /usr/bin/env node

console.log(
    'This script populates Database'
  );
  
  const userArgs = process.argv.slice(2);
  
  const Award = require("../models/awards");
  const Leaderboard = require("../models/leaderboard");
  const Mission = require("../models/missions");
  const MissionDetail = require("../models/missionDetail");
  const RecentAC = require("../models/recentAC");
  
  const awards = [];
  const leaderboards = [];
  const missions = [];
  const missionDetailList = [];
  const recentACs = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createAwards();
    await createLeaderboard();
    await createMissions();
    // await createMissionDetailList();
    await createRecentAC();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
    async function awardsCreate(index, title) {
        const awarddetail = { title: title };

        const award = new Award(awarddetail);
        await award.save();
        awards[index] = award;
        console.log(`Added award: ${title}`);
    }

  async function leaderboardCreate(index, username, rank, aced) {
    const leaderboarddetail = {
        username: username, 
        rank: rank, 
        aced: aced};
    const leaderboard = new Leaderboard(leaderboarddetail);
  
    await leaderboard.save();
    leaderboards[index] = leaderboard;
    console.log(`leaderboard: ${username} ${rank} ${aced}`);
  }

  async function missionsCreate(index, id, name, route, progress) {
    const missiondetail = {
        id,
        name: name,
        route: route, 
        progress: progress,
    };
  
    const mission = new Mission(missiondetail);
    await mission.save();
    missions[index] = mission;
    console.log(`Added missions: ${name} ${route} ${progress}`);
  }

  async function missionDetailCreate(index, name, description, type, problemAmount) {
    // mock problem list function
    function mockProblemList() {
      function randomData(...items) {
        const randomIndex = Math.floor(Math.random() * items.length);
        return items[randomIndex];
      }

      function randomProblem(index) {
        const link = index % 2 === 0
          ? 'https://leetcode.com/problems/sqrtx/'
          : 'https://leetcode.com/problems/maximum-69-number/';
        return {
          name: `Name ${index} ${Math.random()}`,
          link,
          difficulty: randomData('Easy', 'Medium', 'Hard'),
          aced: randomData(true, false),
        };
      }
      return Array.from({ length: problemAmount }, (_, _index) => randomProblem(_index));
    }
    // end of mock problem list function
    const missiondetail = {
        name: name,
        description: description,
        type: type,
        problemList: mockProblemList(),
    };
  
    const missionDetail = new MissionDetail(missiondetail);
    await missionDetail.save();
    missionDetailList[index] = missionDetail;
    console.log(`Added missionDetail: ${name}, ${type} mission w/ ${problemAmount} problems`);
  }

  async function recentACCreate(index, name, date) {
    const recentACdetail = {
      name: name,
      Date: date,
    };
    if (date != false) recentACdetail.Date = date;
  
    const recentAC = new RecentAC(recentACdetail);
    await recentAC.save();
    recentACs[index] = recentAC;
    console.log(`Added recentAC: ${name} ${date}`);
  }

  async function createAwards() {
    console.log("Adding Awards");
    await Promise.all([
      awardsCreate(1, "Award Name"),
      awardsCreate(2, "Award Name"),
      awardsCreate(3, "Award Name"),
      awardsCreate(4, "Award Name"),
      awardsCreate(5, "Award Name"),
    ]);
  }
  
async function createLeaderboard() {
    console.log("Adding leaderboard");
    await Promise.all([
        leaderboardCreate(0, "user1", "1", "50"),
        leaderboardCreate(1, "user2", "2", "45"),
        leaderboardCreate(2, "user3", "3", "40"),
        leaderboardCreate(3, "user4", "4", "35"),
        leaderboardCreate(4, "user5", "5", "30"),
        leaderboardCreate(5, "user6", "6", "25"),
        leaderboardCreate(6, "user7", "7", "20"),
        leaderboardCreate(7, "user8", "8", "15"),
        leaderboardCreate(8, "user9", "9", "10"),
        leaderboardCreate(9, "user10", "10", "5"),
        leaderboardCreate(10, "user11", "11", "0"),
        leaderboardCreate(11, "user12", "12", "0"),
        leaderboardCreate(12, "user13", "13", "0"),
        leaderboardCreate(13, "user14", "14", "0"),
        leaderboardCreate(14, "user15", "15", "0"),
        leaderboardCreate(15, "user16", "16", "0"),
        leaderboardCreate(16, "user17", "17", "0"),
        leaderboardCreate(17, "user18", "18", "0"),
        leaderboardCreate(18, "user19", "19", "0"),
        leaderboardCreate(19, "user20", "20", "0"),
    ]);
}
  
async function createMissions() {
    console.log("Adding missions");
    await Promise.all([
        missionsCreate(0, 1, "Mission 1", "/missions/1", 50),
        missionsCreate(1, 2, "Mission 2", "/missions/2", 75),
        missionsCreate(2, 3, "Mission 3", "/missions/3", 25),
        missionsCreate(3, 4, "Mission 4", "/missions/4", 100),
    ]);
}

// async function createMissionDetailList() {
//   console.log("Adding missionDetails");
//   await Promise.all([
//       missionDetailCreate(0, "Mission 1", "description of mission 1", "Hidden", 12),
//       missionDetailCreate(1, "Mission 2", "description of mission 2", "Shown", 12),
//       missionDetailCreate(2, "Mission 3", "description of mission 3", "Hidden", 7),
//       missionDetailCreate(3, "Mission 4", "description of mission 4", "Shown", 7),
//   ]);
// }

async function createRecentAC() {
    console.log("Adding recentACs");
    await Promise.all([
        recentACCreate(0, "AC 1", "2021-10-01"),
        recentACCreate(1, "AC 2", "2021-09-28"),
        recentACCreate(2, "AC 3", "2021-09-25"),
        recentACCreate(3, "AC 4", "2021-09-22"),
        recentACCreate(4, "AC 5", "2021-09-19"),
        recentACCreate(5, "AC 6", "2021-09-16"),
        recentACCreate(6, "AC 7", "2021-09-13"),
        recentACCreate(7, "AC 8", "2021-09-10"),
        recentACCreate(8, "AC 9", "2021-09-07"),
        recentACCreate(9, "AC 10", "2021-09-04"),
        recentACCreate(10, "AC 11", "2021-09-01"),
        recentACCreate(11, "AC 12", "2021-08-29"),
        recentACCreate(12, "AC 13", "2021-08-26"),
        recentACCreate(13, "AC 14", "2021-08-23"),
        recentACCreate(14, "AC 15", "2021-08-20"),
        recentACCreate(15, "AC 16", "2021-08-17"),
        recentACCreate(16, "AC 17", "2021-08-14"),
        recentACCreate(17, "AC 18", "2021-08-11"),
        recentACCreate(18, "AC 19", "2021-08-08"),
        recentACCreate(19, "AC 20", "2021-08-05"),
        recentACCreate(20, "AC 21", "2021-08-02"),
        recentACCreate(21, "AC 22", "2021-07-30"),
        recentACCreate(22, "AC 23", "2021-07-27"),
        recentACCreate(23, "AC 24", "2021-07-24"),
        recentACCreate(24, "AC 25", "2021-07-21"),
        recentACCreate(25, "AC 26", "2021-07-18"),
        recentACCreate(26, "AC 27", "2021-07-15"),
        recentACCreate(27, "AC 28", "2021-07-12"),
        recentACCreate(28, "AC 29", "2021-07-09"),
        recentACCreate(29, "AC 30", "2021-07-06"),
    ]);
}
