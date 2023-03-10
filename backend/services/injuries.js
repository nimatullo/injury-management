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

  async getTreatmentsForInjury(injuryName) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getTreatmentsForInjury(injuryName)
        .then((data) => {
          resolve(data?.treatments);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getInjuredPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getInjuredPlayers()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addNewInjuryToPlayer(playerId, injuryName, injuryDate) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .addInjuryToPlayer(playerId, injuryName, injuryDate)
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
