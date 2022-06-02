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

function processModel(targetDir, schema) {
  console.log("Processing " + schema.name);

  var fieldsList = "";
  for (var i = 0; i < schema.fields.length; i++) {
    fieldsList += '    @Field("' + schema.fields[i].name + '")\n';
    fieldsList +=
      "    private " +
      schema.fields[i].type +
      " " +
      schema.fields[i].name.toLowerCase() +
      ";\n\n";
  }

  var attributesList = "";
  for (var i = 0; i < schema.fields.length; i++) {
    attributesList +=
      "        this." +
      schema.fields[i].name.toLowerCase() +
      " = rhs." +
      schema.fields[i].name.toLowerCase() +
      ";\n";
  }

  let templateJs = path.join(
    targetDir,
    "src/main/java/mm/mongo/model/modelTemplate.java"
  );
  textString = fs.readFileSync(templateJs, "utf8");
  textString = textString
    .replace(new RegExp("\\[NAME\\]", "g"), schema.name)
    .replace("[FIELDS]", fieldsList)
    .replace("[ATTRIBUTES]", attributesList);

  let resultFile = path.join(
    targetDir,
    "src/main/java/mm/mongo/model/" + schema.name + ".java"
  );
  fs.writeFileSync(resultFile, textString);
  console.log("Finished writing " + resultFile);
}

function processRepository(targetDir, schemaName) {
  let templateJs = path.join(
    targetDir,
    "src/main/java/mm/mongo/repository/repositoryTemplate.java"
  );
  textString = fs.readFileSync(templateJs, "utf8");
  textString = textString.replace(new RegExp("\\[NAME\\]", "g"), schemaName);

  let resultFile = path.join(
    targetDir,
    "src/main/java/mm/mongo/repository/" + schemaName + "Repository.java"
  );
  fs.writeFileSync(resultFile, textString);
  console.log("Finished writing " + resultFile);
}

function processController(targetDir, schemaName) {
  let templateJs = path.join(
    targetDir,
    "src/main/java/mm/mongo/service/controllerTemplate.java"
  );
  textString = fs.readFileSync(templateJs, "utf8");
  textString = textString.replace(new RegExp("\\[NAME\\]", "g"), schemaName);
  textString = textString.replace(
    new RegExp("\\[name\\]", "g"),
    schemaName.toLowerCase()
  );

  let resultFile = path.join(
    targetDir,
    "src/main/java/mm/mongo/service/" + schemaName + "Controller.java"
  );
  fs.writeFileSync(resultFile, textString);
  console.log("Finished writing " + resultFile);
}

function processSchemas(targetDir, schemas) {
  for (var i = 0; i < schemas.length; i++) {
    processModel(targetDir, schemas[i]);
    processRepository(targetDir, schemas[i].name);
    processController(targetDir, schemas[i].name);
  }

  fs.unlinkSync(
    path.join(targetDir, "src/main/java/mm/mongo/model/modelTemplate.java")
  );
  fs.unlinkSync(
    path.join(
      targetDir,
      "src/main/java/mm/mongo/repository/repositoryTemplate.java"
    )
  );
  fs.unlinkSync(
    path.join(
      targetDir,
      "src/main/java/mm/mongo/service/controllerTemplate.java"
    )
  );
}

function GenerateJavaMongo(request) {
  let sourceDir = getSourceDir(request);
  let targetDir = getTargetDir(request);
  cloneTemplate(sourceDir, targetDir);

  processSchemas(targetDir, request.schemas);

  console.log("Done");
}

module.exports = GenerateJavaMongo;
