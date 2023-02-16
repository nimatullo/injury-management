const { PrismaClient } = require("@prisma/client");
const { readFile } = require("fs").promises;

const prisma = new PrismaClient({
  log: ["info", "warn"],
});

async function main() {
  await prisma.$connect();
  // addRecoveredPlayersToDB();
  // generateData();
  // addPlayersToDB();
}

async function addRecoveredPlayersToDB() {
  const playerJson = JSON.parse(
    await readFile("recoveredPlayers.json", "utf-8")
  );

  playerJson.forEach(async (player) => {
    await prisma.recovery.create({
      data: {
        name: player.name,
        photo: player.photo,
        beforeAvg: player.beforeAvg,
        afterAvg: player.afterAvg,
        recoveryPercentage: player.recoveryPercentage,
      },
    });
  });
}

async function addPlayersToDB() {
  const playerJson = JSON.parse(await readFile("players.json", "utf-8"));

  playerJson.forEach(async (player) => {
    await prisma.player.create({
      data: {
        name: player.name,
        number: Number(player.number),
        position: player.position,
        realId: player.playerId,
        height: player.height,
        weight: player.weight,
        playerPhoto: player.playerPhoto,
      },
    });
  });
}

async function generateData() {
  await prisma.player.create({
    data: {
      name: "Kevin Durant",
      position: "SF",
      number: 7,
      injuries: {
        create: [
          {
            injuryName: "Knee",
            injuryDate: new Date("2023-01-20"),
            treatments: {
              create: [
                {
                  treatmentName: "Rest",
                  treatmentDate: new Date("2023-01-20"),
                },
                {
                  treatmentName: "Ice",
                  treatmentDate: new Date("2023-01-21"),
                },
                {
                  treatmentName: "Heat",
                  treatmentDate: new Date("2023-01-22"),
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.player.create({
    data: {
      name: "Ben Simmons",
      position: "PG",
      number: 25,
      injuries: {
        create: [
          {
            injuryName: "Elbow Sprain",
            injuryDate: new Date("2023-02-03"),
            treatments: {
              create: {
                treatmentName: "Ice",
                treatmentDate: new Date("2023-02-03"),
              },
            },
          },
        ],
      },
    },
  });
  await prisma.player.create({
    data: {
      name: "TJ Warren",
      position: "SF",
      number: 1,
      injuries: {
        create: [
          {
            injuryName: "Shin",
            injuryDate: new Date("2023-02-03"),
            treatments: {
              create: [
                {
                  treatmentName: "Rest",
                  treatmentDate: new Date("2023-02-03"),
                },
                {
                  treatmentName: "Ice",
                  treatmentDate: new Date("2023-02-04"),
                },
              ],
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = {
  db: prisma,
};
