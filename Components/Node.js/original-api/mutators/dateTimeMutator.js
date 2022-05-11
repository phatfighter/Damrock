function Mutate(inObject, key) {
  inObject[key] = new Date().toISOString();
  return inObject;
}

module.exports = { Mutate };
