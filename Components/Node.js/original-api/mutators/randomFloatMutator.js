function Mutate(inObject, key, bottom, range) {
  inObject[key] = Math.random() * range + bottom;
  return inObject;
}

module.exports = { Mutate };
