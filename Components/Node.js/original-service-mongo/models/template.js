const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  entry: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Template", templateSchema);
