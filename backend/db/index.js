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

  /**
   *
   * @param {string} playerId
   * @param {string} date
   * @param {string} time
   * @param {string} treatment
   * @param {string} forInjury
   *
   * Creates an appointment for a player with a treatment for an injury
   * if the injury does not have a treatment with the same treatmentName,
   * it will create a new treatment for the injury
   */
  async createAppointment(playerId, date, time, treatmentName, forInjury) {
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
                  date: new Date(date),
                  time: time,
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
                  date: new Date(date),
                  time: time,
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
                date: "asc",
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
                date: "asc",
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

  async getAppointments(date) {
    const formattedDate = moment(date, "YYYY-MM-DD").format("MM-DD-YYYY");

    return new Promise((resolve, reject) => {
      this.db.appointment
        .findMany({
          where: {
            date: new Date(formattedDate),
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

  async updateAppointment(appointmentId, date, time, notes) {
    return new Promise((resolve, reject) => {
      this.db.appointment
        .update({
          where: {
            id: appointmentId,
          },
          data: {
            date: new Date(date),
            time: time,
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
}

module.exports = MongoService;
