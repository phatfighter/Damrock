const NullMutator = require("./nullMutator");
const AddMutator = require("./addMutator");
const DateTimeMutator = require("./dateTimeMutator");
const RandomIntMutator = require("./randomIntMutator");
const RandomFloatMutator = require("./randomFloatMutator");
const RandomStringMutator = require("./randomStringMutator");
const RandomBoolMutator = require("./randomBoolMutator");
const ArrayMutator = require("./arrayMutator");

function Mutate(inObject) {
  inObject = NullMutator.Mutate(inObject);
  inObject = AddMutator.Mutate(inObject, "newKey", "newValue");
  inObject = DateTimeMutator.Mutate(inObject, "createdAt");
  inObject = AddMutator.Mutate(inObject, "item", {
    name: "Toy",
    price: "50.00",
  });
  inObject = RandomIntMutator.Mutate(inObject, "randomInt", 10, 10);
  inObject = RandomFloatMutator.Mutate(inObject, "randomFloat", 15.5, 7.5);
  inObject = RandomStringMutator.Mutate(inObject, "randomString", 20);
  inObject = RandomBoolMutator.Mutate(inObject, "bool1");
  inObject = RandomBoolMutator.Mutate(inObject, "bool2");
  inObject = RandomBoolMutator.Mutate(inObject, "bool3");
  inObject = RandomBoolMutator.Mutate(inObject, "bool4");
  inObject = ArrayMutator.Mutate(
    inObject,
    "unit",
    {
      name: "Stuff",
      quantity: 3,
    },
    5
  );
  return inObject;
}

module.exports = { Mutate };
