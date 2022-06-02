require("dotenv").config();
const fse = require("fs-extra");
var path = require("path");
const fs = require("fs");

function getSourceDir(request) {
  return path.join(
    process.env.COMPONENT_DIR,
    request.platform,
    "service-mysql"
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

function getSequelizeType(type) {
  if (type == "String") {
    return "Sequelize.STRING";
  }
  if (type == "Boolean") {
    return "Sequelize.BOOLEAN";
  }
  if (type == "Date") {
    return "Sequelize.DATE";
  }
  if (type == "Double") {
    return "Sequelize.DOUBLE";
  }
  if (type == "Integer") {
    return "Sequelize.INTEGER";
  }
  if (type == "BigInt") {
    return "Sequelize.BIGINT";
  }
}

function buildColumn(field) {
  var fieldDetails = {};
  fieldDetails.type = field.type;
  fieldDetails.required = true;

  var fieldObj =
    "      " + field.name + " : { type: " + getSequelizeType(field.type) + " }";
  return fieldObj;
}

function buildImport(name) {
  return (
    "db." + name + ' = require("./' + name + '.js")(sequelize, Sequelize);'
  );
}

function buildAssociation(source, target, type) {
  let assoc = "hasMany";
  if (type == "object") {
    assoc = "haOne";
  }
  let str =
    "db." +
    source +
    "." +
    target +
    " = db." +
    source +
    "." +
    assoc +
    "(db." +
    target +
    ");\n";
  str =
    str +
    "db." +
    target +
    "." +
    source +
    " = db." +
    target +
    ".belongsTo(db." +
    source +
    ");";
  return str;
}

function processModel(targetDir, model) {
  console.log("Generating models...");
  var jsonList = "";
  for (var i = 0; i < model.fields.length; i++) {
    if (model.fields[i].type == "model") {
      processModel(targetDir, model.fields[i].model);
    } else {
      jsonList += buildColumn(model.fields[i]) + ",\n";
    }
  }

  modelString = fs.readFileSync(
    path.join(targetDir, "models/modelTemplate.js"),
    "utf8"
  );

  modelString = modelString
    .replace(new RegExp("\\[NAME\\]", "g"), model.name)
    .replace(new RegExp("\\[FIELDS\\]", "g"), jsonList);

  let resultFile = path.join(targetDir, "models/" + model.name + ".js");
  fs.writeFileSync(resultFile, modelString);
  console.log("Finished writing " + resultFile);
}

function collectAssociations(model) {
  let ret = [];
  for (var i = 0; i < model.fields.length; i++) {
    if (model.fields[i].type == "model") {
      if (model.fields[i].model.type == "array")
        ret.push(
          buildAssociation(
            model.name,
            model.fields[i].model.name,
            model.fields[i].model.type
          )
        );
      const subRet = collectAssociations(model.fields[i].model);
      if (subRet.length > 0) {
        ret = ret.concat(subRet);
      }
    }
  }
  return ret;
}

function collectImports(model) {
  let ret = [buildImport(model.name)];
  for (var i = 0; i < model.fields.length; i++) {
    if (model.fields[i].type == "model") {
      ret = ret.concat(collectImports(model.fields[i].model));
    }
  }
  return ret;
}

function processIndex(targetDir, model) {
  console.log("Generating index.js...");
  const imports = collectImports(model);
  const associations = collectAssociations(model);

  var jsonList = "";
  indexString = fs.readFileSync(
    path.join(targetDir, "models/indexTemplate.js"),
    "utf8"
  );

  indexString = indexString
    .replace(new RegExp("\\[IMPORTS\\]", "g"), imports.join("\n"))
    .replace(new RegExp("\\[ASSOCIATIONS\\]", "g"), associations.join("\n"));

  let resultFile = path.join(targetDir, "models/index.js");
  fs.writeFileSync(resultFile, indexString);
  console.log("Finished writing " + resultFile);

  fs.unlinkSync(path.join(targetDir, "models/indexTemplate.js"));
}

function GenerateNodeMySql(request) {
  let sourceDir = getSourceDir(request);
  let targetDir = getTargetDir(request);
  cloneTemplate(sourceDir, targetDir);

  processModel(targetDir, request.model);
  processIndex(targetDir, request.model);

  fs.unlinkSync(path.join(targetDir, "models/modelTemplate.js"));
  console.log("Done");
}

module.exports = GenerateNodeMySql;
