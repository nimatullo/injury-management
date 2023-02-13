const MongoService = require("../db");

class PlayerService {
  constructor() {
    this.collection = "Player";
    this.mongoService = new MongoService();
  }

  async getPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getPlayers()
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getPlayer(id) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .get(this.collection, id)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async addPlayer(player) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .add(this.collection, player)
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
      this.mongoService
        .getCategories()
        .then((data) => {
          resolve(data.map((exercise) => exercise.category));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async addMeasurement(playerId, measurement, date, exercise, category) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .addMeasurement(playerId, date, category, exercise, measurement)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getMeasurementsForPlayer(playerId, exercise) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getPlayerMeasurement(playerId, exercise)
        .then((data) => {
          resolve(data.exercises);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getExercisesForCategory(category) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getExercisesForCategory(category)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getFirstThreeAppointments(playerId) {
    const totalAppointments = await this.getAllAppointments(playerId);

    return new Promise((resolve, reject) => {
      this.mongoService
        .getFirstThreeUpcomingAppointments(playerId)
        .then((data) => {
          resolve({
            appointments: data?.upcomingAppointments,
            total: totalAppointments.length,
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getRandomPlayers() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getRandomPlayers()
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
      this.mongoService
        .getThreeMostRecentExercises(playerId)
        .then((data) => {
          resolve(data.exercises);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = PlayerService;
