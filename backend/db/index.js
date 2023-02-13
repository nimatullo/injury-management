const { db } = require("../prisma");
const moment = require("moment");

class MongoService {
  constructor() {
    this.db = db;
  }

  async getPlayers() {
    return new Promise((resolve, reject) => {
      this.db.player
        .findMany({
          include: {
            injuries: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getInjuries() {
    return new Promise((resolve, reject) => {
      this.db.injury
        .findMany({
          distinct: ["injuryName"],

          include: {
            treatments: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async add(collection, data) {
    return new Promise((resolve, reject) => {
      this.db[collection]
        .create({
          data,
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async get(collection, id) {
    return new Promise((resolve, reject) => {
      this.db[collection]
        .findUnique({
          where: {
            id: id,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addInjuryToPlayer(playerId, injuryName, injuryDate) {
    if (!injuryDate) {
      injuryDate = new Date();
    } else {
      injuryDate = new Date(injuryDate);
    }

    return new Promise((resolve, reject) => {
      this.db.player
        .update({
          where: {
            id: playerId,
          },
          data: {
            injuries: {
              create: {
                injuryName: injuryName,
                injuryDate: injuryDate,
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getInjuredPlayers() {
    return new Promise((resolve, reject) => {
      this.db.player
        .findMany({
          where: {
            injuries: {
              some: {
                injuryName: {
                  not: undefined,
                },
              },
            },
          },
          include: {
            injuries: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getInjuriesForPlayer(playerId) {
    return new Promise((resolve, reject) => {
      this.db.player
        .findUnique({
          where: {
            id: playerId,
          },
          include: {
            injuries: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addMeasurement(playerId, date, category, exercise, measurement) {
    return new Promise((resolve, reject) => {
      this.db.player
        .update({
          where: {
            id: playerId,
          },
          data: {
            exercises: {
              create: {
                date: new Date(date),
                category: category,
                name: exercise,
                measurement: measurement.toString(),
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getCategories() {
    return new Promise((resolve, reject) => {
      this.db.exercise
        .findMany({
          distinct: ["category"],
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getPlayerMeasurement(playerId, exercise) {
    return new Promise((resolve, reject) => {
      this.db.player
        .findUnique({
          where: {
            id: playerId,
          },
          include: {
            exercises: {
              where: {
                name: exercise,
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getExercisesForCategory(category) {
    return new Promise((resolve, reject) => {
      this.db.exercise
        .findMany({
          where: {
            category: category,
          },
          distinct: ["name"],
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  async createAppointment(playerId, dateTime, treatmentName, forInjury) {
    const treatment = await this.db.treatment.findFirst({
      where: {
        treatmentName: treatmentName,
        injury: {
          injuryName: forInjury,
        },
      },
    });

    if (treatment) {
      return new Promise((resolve, reject) => {
        this.db.player
          .update({
            where: {
              id: playerId,
            },
            data: {
              upcomingAppointments: {
                create: {
                  dateTime: new Date(dateTime),
                  forTreatment: {
                    connect: {
                      id: treatment.id,
                    },
                  },
                },
              },
            },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } else {
      const injury = await this.db.injury.findFirst({
        where: {
          injuryName: forInjury,
        },
      });
      return new Promise((resolve, reject) => {
        this.db.player
          .update({
            where: {
              id: playerId,
            },
            data: {
              upcomingAppointments: {
                create: {
                  dateTime: new Date(dateTime),
                  forTreatment: {
                    create: {
                      treatmentName: treatmentName,
                      injury: {
                        connect: {
                          id: injury.id,
                        },
                      },
                    },
                  },
                },
              },
            },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }

  async getUpcomingAppointments(playerId) {
    return new Promise((resolve, reject) => {
      this.db.player
        .findUnique({
          where: {
            id: playerId,
          },
          include: {
            upcomingAppointments: {
              include: {
                forTreatment: true,
              },
              orderBy: {
                dateTime: "asc",
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getFirstThreeUpcomingAppointments(playerId) {
    return new Promise((resolve, reject) => {
      this.db.player
        .findUnique({
          where: {
            id: playerId,
          },
          include: {
            upcomingAppointments: {
              include: {
                forTreatment: true,
              },
              take: 3,
              orderBy: {
                dateTime: "asc",
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAppointment(id) {
    return new Promise((resolve, reject) => {
      this.db.appointment
        .findUnique({
          where: {
            id: id,
          },
          include: {
            forTreatment: true,
            player: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAppointments(dateTime) {
    const date = new Date(dateTime);
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const end = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );
    return new Promise((resolve, reject) => {
      this.db.appointment
        .findMany({
          where: {
            dateTime: {
              gte: start,
              lt: end,
            },
          },
          include: {
            forTreatment: true,
            player: true,
          },
          orderBy: {
            dateTime: "asc",
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getAllAppointments() {
    return new Promise((resolve, reject) => {
      this.db.appointment
        .findMany({
          where: {
            dateTime: {
              gte: new Date(),
            },
          },
          include: {
            forTreatment: true,
            player: true,
          },
          orderBy: {
            dateTime: "asc",
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getTreatmentsForInjury(injuryName) {
    return new Promise((resolve, reject) => {
      this.db.injury
        .findFirst({
          where: {
            injuryName: injuryName,
          },
          include: {
            treatments: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addTreatmentToInjury(injuryName, treatmentName) {
    return new Promise((resolve, reject) => {
      this.db.treatment
        .create({
          data: {
            treatmentName: treatmentName,
            injury: {
              connect: {
                injuryName: injuryName,
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getRandomPlayers() {
    const allPlayers = await this.db.player.findMany({});

    const randomPlayers = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * allPlayers.length);
      randomPlayers.push(allPlayers[randomIndex]);
      allPlayers.splice(randomIndex, 1);
    }

    return randomPlayers;
  }

  async getTodayAppointments() {
    return new Promise((resolve, reject) => {
      this.db.appointment
        .findMany({
          // where: {
          //   date: new Date(),
          // },
          include: {
            forTreatment: {
              include: {
                injury: true,
              },
            },
            player: true,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async updateAppointment(appointmentId, dateTime, notes) {
    return new Promise((resolve, reject) => {
      this.db.appointment
        .update({
          where: {
            id: appointmentId,
          },
          data: {
            dateTime: new Date(dateTime),
            notes: notes,
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getThreeMostRecentExercises(playerId) {
    return new Promise((resolve, reject) => {
      this.db.player
        .findUnique({
          where: {
            id: playerId,
          },
          include: {
            exercises: {
              take: 3,
              orderBy: {
                date: "desc",
              },
            },
          },
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = MongoService;
