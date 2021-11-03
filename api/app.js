const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uploadRoute = require("./routes/uploadRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/store", uploadRoute);
app.use("/api/v1", userRoute);
app.all("*", (req, res) => {
  res.status(404).end({
    status: "failed",
    message: "Cannot found this route",
  });
});

module.exports = app;
