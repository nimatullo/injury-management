const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const PORT = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
const players = require("./routes/players");
const injuries = require("./routes/injuries");
const appointments = require("./routes/appointments");
const recovery = require("./routes/recovery");

// Initialize routes

app.use("/health", (req, res) => {
  res.send("Server is up and running");
});

app.use("/players", players);
app.use("/injuries", injuries);
app.use("/appointments", appointments);
app.use("/recovery", recovery);

const server = app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
