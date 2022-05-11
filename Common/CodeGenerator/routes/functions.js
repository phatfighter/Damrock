const express = require("express");
const Generate = require("../codegen/generate");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.json("{ status: 'ok'}");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    Generate(req.body);
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
