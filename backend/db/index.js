const { db } = require("../prisma");

class MongoService {
  constructor() {
    this.db = db;
  }

  async getAll(collection) {
    return new Promise((resolve, reject) => {
      this.db[collection]
        .findMany()
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

  async addInjuryToPlayer(playerId, injury) {
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

  async tryFindInjury(injuryName) {
    const injury = await this.db.injury.findUnique({
      where: {
        name: injuryName,
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
              name: injuryName,
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
