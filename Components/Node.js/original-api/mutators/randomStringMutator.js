var crypto = require("crypto");

function Mutate(inObject, key, length) {
  inObject[key] = crypto.randomBytes(length).toString("hex");
  return inObject;
}

module.exports = { Mutate };
