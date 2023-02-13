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

router.get("/players", async (req, res) => {
  service
    .getInjuredPlayers()
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

router.post("/:playerId", async (req, res) => {
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

router.post("/add-treatment", async (req, res) => {
  const { injuryId, treatment } = req.body;
  if (!injuryId || !treatment) {
    res.status(400).json({ message: "InjuryId and Treatment are required" });
    return;
  }
  service
    .addTreatmentToInjury(injuryId, treatment)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.get("/:name/treatments", async (req, res) => {
  const { name } = req.params;
  if (!name) {
    res.status(400).json({ message: "InjuryId is required" });
    return;
  }

  service
    .getTreatmentsForInjury(name)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
