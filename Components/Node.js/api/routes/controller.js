require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    res.json("{ status: 'ok'}");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Sending " + JSON.stringify(req.body, null, 2));
    await axios.post(process.env.CONTROLLER_URL, req.body);
    return res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message }).end();
  }
});

module.exports = router;
