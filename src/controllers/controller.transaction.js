const model = require("../models/model.transaction");
const { resError, resSuccess, resTransaction } = require("../helpers/response");
const crypto = require("crypto");
const vld = require("../helpers/validation");
controller = {};

controller.addTransaction = async (req, res) => {
  try {
    const { error, value } = valid.transaction.validate(req.body);
    if (error) {
      return resError(res, 400, `${error.details[0].message}`);
    }
    const { code, date, is_paid, items } = value;

    const transaction_id = crypto.randomUUID();
    const user_id = req.userData.id;

    const data = await model.addTransaction(
      transaction_id,
      user_id,
      code,
      date,
      is_paid,
      items
    );
    return resSuccess(res, 201, "success create transaction", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.getTransactionAll = async (req, res) => {
  try {
    const user_id = req.userData.id;
    const data = await model.getTransactionAll(user_id);
    return resSuccess(res, 200, "success", resTransaction(data));
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.getTransactionID = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const user_id = req.userData.id;
    const data = await model.getTransactionID(user_id, transaction_id);
    return resSuccess(res, 200, "success", resTransaction(data));
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const { error, value } = valid.transaction.validate(req.body);
    if (error) {
      return resError(res, 400, `${error.details[0].message}`);
    }
    const { code, date, is_paid, items } = value;

    const user_id = req.userData.id;

    const data = await model.updateTransaction(
      transaction_id,
      user_id,
      code,
      date,
      is_paid,
      items
    );

    return resSuccess(res, 200, "success update transaction", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const user_id = req.userData.id;
    const data = await model.deleteTransaction(user_id, transaction_id);
    return resSuccess(res, 200, "delete success", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

module.exports = controller;
