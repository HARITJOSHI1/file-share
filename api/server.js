const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION", err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
