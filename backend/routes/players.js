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

module.exports = router;
