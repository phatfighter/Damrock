function Mutate(inObject, key) {
  inObject[key] = true;
  if (Math.random() * 1 < 0.5) {
    inObject[key] = false;
  }
  return inObject;
}

module.exports = { Mutate };
