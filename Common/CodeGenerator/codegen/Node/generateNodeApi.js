require("dotenv").config();
const fse = require("fs-extra");
var path = require("path");
const fs = require("fs");

function getSourceDir(request) {
  return path.join(
    process.env.COMPONENT_DIR,
    request.platform,
    "service-mongo"
  );
}

function getTargetDir(request) {
  return path.join(
    process.env.USERS_DIR,
    request.userid,
    request.componentName
  );
}

function cloneTemplate(sourceDir, targetDir) {
  fse.copySync(sourceDir, targetDir);
}

function buildColumn(field) {
  var fieldDetails = {};
  fieldDetails.type = field.type;
  fieldDetails.required = true;

  var fieldObj = field.name + " : " + JSON.stringify(fieldDetails, null, 2);
  return fieldObj;
}

function processSchema(targetDir, schema) {
  console.log("Processing " + schema.name);

  var jsonList = "";
  for (var i = 0; i < schema.fields.length; i++) {
    jsonList += buildColumn(schema.fields[i]) + ",\n";
  }

  jsonList = jsonList
    .replace(new RegExp('"', "g"), "")
    .replace(new RegExp("\\[", "g"), "")
    .replace(new RegExp("\\]", "g"), "");

  let templateJs = path.join(targetDir, "models/modelTemplate.js");
  textString = fs.readFileSync(templateJs, "utf8");
  textString = textString
    .replace(new RegExp("\\[NAME\\]", "g"), schema.name)
    .replace("[COLUMNS]", jsonList);

  let resultFile = path.join(targetDir, "models/" + schema.name + ".js");
  fs.writeFileSync(resultFile, textString);
  console.log("Finished writing " + resultFile);
}

function processRoute(targetDir, schemaName) {
  let templateJs = path.join(targetDir, "routes/routeTemplate.js");
  textString = fs.readFileSync(templateJs, "utf8");
  textString = textString.replace(new RegExp("\\[NAME\\]", "g"), schemaName);

  let resultFile = path.join(targetDir, "routes/" + schemaName + ".js");
  fs.writeFileSync(resultFile, textString);
  console.log("Finished writing " + resultFile);
}

function processSchemas(targetDir, schemas) {
  for (var i = 0; i < schemas.length; i++) {
    processSchema(targetDir, schemas[i]);
    processRoute(targetDir, schemas[i].name);
  }

  let templateJs = path.join(targetDir, "server.js");
  textString = fs.readFileSync(templateJs, "utf8");
  var routes = "";
  for (var i = 0; i < schemas.length; i++) {
    routes +=
      "const " +
      schemas[i].name +
      'Router = require("./routes/' +
      schemas[i].name +
      '");\n';
    routes +=
      'app.use("/' +
      schemas[i].name.toLowerCase() +
      '", ' +
      schemas[i].name +
      "Router);\n";
  }

  textString = textString.replace(new RegExp("\\[ROUTES\\]", "g"), routes);

  fs.writeFileSync(templateJs, textString);
  console.log("Finished writing " + templateJs);
  fs.unlinkSync(path.join(targetDir, "routes/routeTemplate.js"));
  fs.unlinkSync(path.join(targetDir, "models/modelTemplate.js"));
}

function GenerateNodeMongo(request) {
  let sourceDir = getSourceDir(request);
  let targetDir = getTargetDir(request);
  cloneTemplate(sourceDir, targetDir);

  processSchemas(targetDir, request.schemas);

  console.log("Done");
}

module.exports = GenerateNodeMySql;
