const GenerateAttribute = require("./generateAttribute");

function Mutate(inObject, key, value, count) {
  inObject[key] = [];
  for (let i = 0; i < count; i += 1) {
    inObject[key].push(GenerateAttribute.Compile(value));
  }
  return inObject;
}

module.exports = { Mutate };
