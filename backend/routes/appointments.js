const express = require("express");
const router = express.Router();
const AppointmentService = require("../services/appointments");

const service = new AppointmentService();

router.get("/", async (req, res) => {
  service
    .getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/date/today", async (req, res) => {
  service
    .get(new Date())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/player/:playerId", async (req, res) => {
  const { playerId } = req.params;
  const { dateTime, injuryName, treatment } = req.body;
  if (!playerId || !dateTime || !injuryName || !treatment) {
    res.status(400).json({
      message: "PlayerId, DateTime, InjuryName and Treatment are required",
    });
    return;
  }
  service
    .create(playerId, dateTime, treatment, injuryName)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.put("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  const { dateTime, notes } = req.body;
  if (!appointmentId || !dateTime) {
    res.status(400).json({
      message: "PlayerId, AppointmentId, DateTime are required",
    });
    return;
  }
  service
    .update(appointmentId, dateTime, notes)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  if (!appointmentId) {
    res.status(400).json({ message: "AppointmentId is required" });
    return;
  }
  service
    .getAppointment(appointmentId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  if (!appointmentId) {
    res.status(400).json({ message: "AppointmentId is required" });
    return;
  }
  service
    .delete(appointmentId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/date/:date", async (req, res) => {
  const { date } = req.params;
  if (!date) {
    res.status(400).json({ message: "Date is required" });
    return;
  }

  service
    .get(date)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
