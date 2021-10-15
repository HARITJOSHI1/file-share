const path = require('path');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const uploadRoute = require("./routes/uploadRoute");
const test = require("./routes/test");

const app = express();
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ exposedHeaders: "*" }));
// app.get('/', () => console.log("Hello"));
// app.use('/', test);
app.use('/api/v1/store', uploadRoute);
module.exports = app;
