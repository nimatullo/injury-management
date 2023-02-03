const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
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
            treatment: {
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
            injuryName: "Knee",
            injuryDate: new Date("2023-02-03"),
            treatment: {
              create: {
                treatmentName: "Rest",
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
            treatment: {
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
