const express = require("express");
const [NAME] = require("./../models/[NAME]");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [NAME]list = await [NAME].find();
    res.json([NAME]list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", get[NAME], (req, res) => {
  res.json(res.[NAME]);
});

router.post("/", async (req, res) => {
  const var[NAME] = new [NAME](req.body);
  try {
    const new[NAME] = await var[NAME].save();
    res.status(201).json(new[NAME]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await [NAME].findByIdAndDelete(req.params.id);
  res.redirect("/");
});

async function get[NAME](req, res, next) {
  let var[NAME];
  try {
    var[NAME] = await [NAME].findById(req.params.id);
    if (var[NAME] == null) {
      return res.status(404).json({ message: "Cannot find [NAME]" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.[NAME] = var[NAME];
  next();
}

module.exports = router;
