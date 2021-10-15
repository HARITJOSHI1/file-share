const express = require("express");
const router = express.Router();

router.get('/t', () => console.log("Hello"));

module.exports = router;
