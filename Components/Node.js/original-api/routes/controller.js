require("dotenv").config();
const MutatorManager = require("../mutators/mutatorManager");
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
    const mutatedData = MutatorManager.Mutate(req.body);
    console.log("Sending " + JSON.stringify(mutatedData, null, 2));
    const response = await axios.post(process.env.CONTROLLER_URL, mutatedData);
    return response;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
