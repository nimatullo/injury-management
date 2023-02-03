const express = require("express");
const router = express.Router();
const InjuryService = require("../services/injuries");

const service = new InjuryService();

router.get("/", async (req, res) => {
  service
    .getInjuries()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", async (req, res) => {
  const injury = req.body;
  if (!injury) {
    res.status(400).json({ message: "Injury is required" });
    return;
  }
  service
    .addInjury(injury)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:playerId", async (req, res) => {
  const playerId = req.params.playerId;

  if (!playerId) {
    res.status(400).json({ message: "PlayerId is required" });
    return;
  }

  service
    .getInjuriesForPlayer(playerId)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
