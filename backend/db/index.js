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

  async addInjuryToPlayer(playerId, injuryName) {
    const injury = await this._tryFindInjury(injuryName);

    return new Promise((resolve, reject) => {
      this.db.player
        .update({
          where: {
            id: playerId,
          },
          data: {
            injuries: {
              connect: {
                id: injury.id,
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

  async getInjuriesForPlayer(playerId) {
    return new Promise((resolve, reject) => {
      this.db.injury
        .findMany({
          where: {
            playerId,
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

  async _tryFindInjury(injuryName) {
    const injury = await this.db.injury.findFirst({
      where: {
        injuryName: injuryName,
      },
    });

    if (injury) {
      return new Promise((resolve, reject) => {
        resolve(injury);
      });
    } else {
      return new Promise((resolve, reject) => {
        this.db.injury
          .create({
            data: {
              injuryName: injuryName,
              injuryDate: new Date(),
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
}

module.exports = MongoService;
