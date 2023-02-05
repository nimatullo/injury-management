const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const players = require("./routes/players");
const injuries = require("./routes/injuries");

// Initialize routes
app.use("/players", players);
app.use("/injuries", injuries);

const server = app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
