const express = require("express");
const router = express.Router();
const AppointmentService = require("../services/appointments");

const service = new AppointmentService();

router.get("/:date", async (req, res) => {
  const { date } = req.params;
  if (!date) {
    res.status(400).json({ message: "Date is required" });
    return;
  }

  service
    .getAppointments(date)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
