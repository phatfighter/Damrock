require("crypto");

const Mutators = {
  doNull() {
    return {};
  },
  doAdd(inObject, key, value) {
    inObject[key] = value;
    return inObject;
  },
  doDateTime(inObject, key) {
    inObject[key] = new Date().toISOString();
    return inObject;
  },
  doRandomBool(inObject, key) {
    inObject[key] = true;
    if (Math.random() * 1 < 0.5) {
      inObject[key] = false;
    }
    return inObject;
  },
  doRandomFloat(inObject, key, bottom, range) {
    inObject[key] = Math.random() * range + bottom;
    return inObject;
  },
  doRandomInt(inObject, key, bottom, range) {
    inObject[key] = Math.floor(Math.random() * range) + bottom;
    return inObject;
  },
  doRandomString(inObject, key, length) {
    inObject[key] = crypto.randomBytes(length).toString("hex");
    return inObject;
  },
  doMutate(inObject) {
    if (typeof inObject === "object" && inObject.hasOwnProperty("mutate")) {
      let retObj = {};
      for (const mutator of inObject["mutate"]) {
        const type = mutator.type;
        if (type == "Add") {
          const val = this.doMutate(mutator.params.value);
          retObj = this.doAdd(retObj, mutator.params.key, val);
        } else if (type == "DateTime") {
          retObj = this.doDateTime(retObj, mutator.params.key);
        } else if (type == "RandomInt") {
          retObj = this.doRandomInt(
            retObj,
            mutator.params.key,
            mutator.params.floor,
            mutator.params.range
          );
        } else if (type == "RandomFloat") {
          retObj = this.doRandomFloat(
            retObj,
            mutator.params.key,
            mutator.params.floor,
            mutator.params.range
          );
        } else if (type == "RandomString") {
          retObj = this.doRandomString(
            retObj,
            mutator.params.key,
            mutator.params.length
          );
        } else if (type == "RandomBool") {
          retObj = this.doRandomBool(retObj, mutator.params.key);
        } else if (type == "Array") {
          retObj[mutator.params.key] = [];
          for (let i = 0; i < mutator.params.count; i += 1) {
            const val = this.doMutate(mutator.params.value);
            retObj[mutator.params.key].push(val);
          }
        }
      }
      return retObj;
    }
    return inObject;
  },
};

function Mutate(inObject) {
  return Mutators.doMutate(inObject);
}

module.exports = { Mutate };
