module.exports = (app) => {
  const users = require("../controllers/app.controller.js");
  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/subscribed", users.findAllSubscribed);

  router.get("/:id", users.findOne);

  router.put("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};
