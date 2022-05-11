const express = require("express");
const router = express.Router();

const Pulsar = require("../setup/pulsarClient");

router.post("/", async (req, res) => {
  try {
    Pulsar.GetConnection().producer.send({
      data: Buffer.from(JSON.stringify(req.body)),
    });
    console.log(`Sent message: ${req.body}`);
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
