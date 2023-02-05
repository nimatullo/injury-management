const { db } = require("../prisma");

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
}

module.exports = MongoService;
