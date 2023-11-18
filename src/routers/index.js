const express = require("express");
const routers = express.Router();
const {resSuccess } = require("../helpers/response");
const auth = require("./router.auth");
const transaction = require("./router.transaction");

routers.get("/", (req, res) => {
  const data = {
    postman: "https://documenter.getpostman.com/view/25042327/2s93m7X2P3",
    repository: "https://github.com/rfauzi44/transaction-journal-api",
  };

  return resSuccess(res, 200, "welcome", data);
});

routers.use("/auth", auth);
routers.use("/transaction", transaction);

module.exports = routers;
