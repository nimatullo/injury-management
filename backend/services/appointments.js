const MongoService = require("../db");
const moment = require("moment");

class AppointmentService {
  constructor() {
    this.collection = "Appointment";
    this.mongoService = new MongoService();
  }

  async get(date) {
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

  async delete(appointmentId) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .deleteAppointment(appointmentId)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAppointment(appointmentId) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getAppointment(appointmentId)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  async getAll() {
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

  async update(appointmentId, dateTime, notes) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .updateAppointment(appointmentId, dateTime, notes)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getAllForPlayer(playerId) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .getUpcomingAppointments(playerId)
        .then((data) => {
          resolve(data?.upcomingAppointments);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getFirstThree(playerId) {
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

  async create(playerId, dateTime, treatment, forInjury) {
    return new Promise((resolve, reject) => {
      this.mongoService
        .createAppointment(playerId, dateTime, treatment, forInjury)
        .then((data) => {
          resolve(data);
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
