const router = require("express").Router();

const RecoveryService = require("../services/recovery");

const service = new RecoveryService();

router.get("/", async (req, res) => {
  service
    .get()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
