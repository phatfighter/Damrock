const express = require("express");
const Template = require("./../models/template");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getTemplate, (req, res) => {
  res.json(res.template);
});

router.post("/", async (req, res) => {
  const template = new Template({
    entry: req.body.entry,
  });
  try {
    const newTemplate = await template.save();
    res.status(201).json(newTemplate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

async function getTemplate(req, res, next) {
  let template;
  try {
    template = await Template.findById(req.params.id);
    if (template == null) {
      return res.status(404).json({ message: "Cannot find template" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.template = template;
  next();
}

module.exports = router;
