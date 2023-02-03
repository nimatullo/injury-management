const MongoService = require("../db");

class InjuryService {
  constructor() {
    this.collection = "Injury";
    this.mongoService = new MongoService();
  }

  async getInjuries() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getAll(this.collection)
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
