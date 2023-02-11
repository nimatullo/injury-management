const MongoService = require("../db");
const moment = require("moment");

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

  async getAllAppointments() {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getAllAppointments()
        .then((data) => {
          resolve(this.groupByDate(data));
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  groupByDate(appointments) {
    // Group by date, not including time
    const groupedAppointments = appointments.reduce((acc, appointment) => {
      const date = moment(appointment.dateTime).format("YYYY-MM-DD");
      acc[date] = acc[date] || [];
      acc[date].push(appointment);
      return acc;
    }, {});

    return groupedAppointments;
  }
}

module.exports = AppointmentService;
