const express = require("express");
const router = express.Router();
const PlayerService = require("../services/players");

const service = new PlayerService();

router.get("/", async (req, res) => {
  const players = await service.getPlayers();
  res.json(players);
});

router.post("/add-injury", async (req, res) => {
  const { playerId, injuryName, injuryDate } = req.body;
  if (!playerId || !injuryName) {
    res.status(400).json({ message: "PlayerId and InjuryName are required" });
    return;
  }
  service
    .addNewInjuryToPlayer(playerId, injuryName, injuryDate)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/appointments/today", async (req, res) => {
  service
    .getTodayAppointments()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/injured", async (req, res) => {
  service
    .getInjuredPlayers()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/:id/measurements/:category", async (req, res) => {
  const { id, category } = req.params;
  const { measurement, exercise, date } = req.body;
  if ((!id || !exercise || !measurement || !date, !category)) {
    res.status(400).json({
      message:
        "PlayerId, Exercise, Measurement, Category and Date are required",
    });
    return;
  }
  service
    .addMeasurement(id, measurement, date, exercise, category)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id/exercises", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "PlayerId is required" });
    return;
  }
  service
    .getThreeMostRecentExercises(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/categories", async (req, res) => {
  service
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/random", async (req, res) => {
  service
    .getRandomPlayers()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "PlayerId is required" });
    return;
  }
  service
    .getPlayer(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id/measurements/:exercise", async (req, res) => {
  const { id, exercise } = req.params;
  if (!id || !exercise) {
    res
      .status(400)
      .json({ message: "PlayerId and MeasurementType are required" });
    return;
  }
  service
    .getMeasurementsForPlayer(id, exercise)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/measurements/:category", async (req, res) => {
  const { category } = req.params;
  if (!category) {
    res.status(400).json({ message: "Category is required" });
    return;
  }
  service
    .getExercisesForCategory(category)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/:id/appointments", async (req, res) => {
  const { id } = req.params;
  const { dateTime, injuryName, treatment } = req.body;
  if (!id || !dateTime || !injuryName || !treatment) {
    res.status(400).json({
      message: "PlayerId, DateTime, InjuryName and Treatment are required",
    });
    return;
  }
  service
    .createAppointment(id, dateTime, treatment, injuryName)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.put("/appointments/:appointmentId", async (req, res) => {
  const { appointmentId } = req.params;
  const { dateTime, notes } = req.body;
  if (!appointmentId || !dateTime) {
    res.status(400).json({
      message: "PlayerId, AppointmentId, DateTime are required",
    });
    return;
  }
  service
    .updateAppointment(appointmentId, dateTime, notes)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id/appointments/all", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "PlayerId is required" });
    return;
  }
  service
    .getAllAppointments(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:id/appointments", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "PlayerId is required" });
    return;
  }
  service
    .getFirstThreeAppointments(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
