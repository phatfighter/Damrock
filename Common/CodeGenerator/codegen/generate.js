const GenerateNodeMongo = require("./Node/generateNodeMongo");
const GenerateJavaMongo = require("./Java/generateJavaMongo");

function Generate(request) {
  const platform = request.platform;
  const provider = request.provider;
  console.log("Generating for " + platform + ":" + provider);
  if (platform == "Node.js" && provider == "MongoDB") {
    return GenerateNodeMongo(request);
  } else if (platform == "Java" && provider == "MongoDB") {
    return GenerateJavaMongo(request);
  } else {
    console.log("Unrecognised platform and provider");
    return null;
  }
}

module.exports = Generate;
