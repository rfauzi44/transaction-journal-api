const express = require("express");
const routers = express.Router();
const controller = require("../controllers/controller.transaction");
const middleware = require("../middlewares/middleware.auth");

routers.post("/", middleware.login, controller.addTransaction);
routers.get("/", middleware.login, controller.getTransactionAll);
routers.get("/:transaction_id", middleware.login, controller.getTransactionID);
routers.put("/:transaction_id", middleware.login, controller.updateTransaction);
routers.delete("/:transaction_id", middleware.login, controller.deleteTransaction);

module.exports = routers;
