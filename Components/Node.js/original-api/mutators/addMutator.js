function Mutate(inObject, key, value) {
  inObject[key] = value;
  return inObject;
}

module.exports = { Mutate };
