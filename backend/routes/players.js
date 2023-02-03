const express = require("express");
const router = express.Router();
const PlayerService = require("../services/players");

const service = new PlayerService();

router.get("/", async (req, res) => {
  const players = await service.getPlayers();
  res.json(players);
});

module.exports = router;
