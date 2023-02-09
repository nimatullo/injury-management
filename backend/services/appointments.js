const MongoService = require("../db");

class AppointmentService {
  constructor() {
    this.collection = "Appointment";
    this.mongoService = new MongoService();
  }

  async getAppointments(date) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getAppointments(date)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

module.exports = AppointmentService;
