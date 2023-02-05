const MongoService = require("../db");

class InjuryService {
  constructor() {
    this.collection = "Injury";
    this.mongoService = new MongoService();
  }

  async getInjuries() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getInjuries()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addTreatmentToInjury(injuryId, treatment) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .addTreatmentToInjury(injuryId, treatment)
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
      this.mongoService
        .getInjuriesForPlayer(playerId)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = InjuryService;
