require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const MutatorManager = require("../Common/mutator-manager/mutatorManager");

let schema = JSON.parse(fs.readFileSync("./schema.json", "utf8"));

function sendRequest() {
  try {
    let payload = MutatorManager.Mutate(schema);
    (async () => {
      const response = await axios
        .post(process.env.API_URL, payload)
        .then((ret) => {
          return ret.body;
        });
      console.log(response);
    })();

    return new Promise((resolve) =>
      setTimeout(resolve, process.env.POST_DELAY)
    );
  } catch (err) {
    console.log(err);
  }
}

console.log("Starting submission to " + process.env.API_URL + "...");

(async () => {
  for (let i = 0; i < process.env.ITERATIONS; i += 1) {
    console.log("Sending #" + i);

    await Promise.all([sendRequest()]);
  }
  console.log("Done");
  process.exit(0);
})();
