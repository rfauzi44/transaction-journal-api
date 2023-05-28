const model = require("../models/model.auth");
const { resError, resSuccess } = require("../helpers/response");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const vld = require("../helpers/validation");
const controller = {};

controller.register = async (req, res) => {
  try {
    const { error, value } = vld.register.validate(req.body);
    if (error) {
      return resError(res, 400, `${error.details[0].message}`);
    }
    const { username, email, name, password, gender } = value;
    const checkUserName = await model.login(username);
    if (checkUserName[0]) {
      return resError(res, 400, "username not available");
    }
    const checkEmail = await model.login(email);
    if (checkEmail[0]) {
      return resError(res, 400, "email has been registered");
    }
    const id = crypto.randomUUID();
    const saltRounds = 10;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    const userData = await model.register(
      id,
      username,
      email,
      name,
      hashPassword,
      gender
    );
    const user = userData[0];
    const token = `${jwt.sign(user, process.env.JWT_SECRETS, {
      expiresIn: "24h",
    })}`;
    const data = {
      token,
      user,
    };

    return resSuccess(res, 201, "register success", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.login = async (req, res) => {
  try {
    const { error, value } = vld.login.validate(req.body);
    if (error) {
      return resError(res, 400, `${error.details[0].message}`);
    }
    const { username_email, password } = value;
    const result = await model.login(username_email);
    const user = result[0]
    if (!user) {
      return resError(res, 401, "username or email not registered");
    }
    const isTruePassword = bcrypt.compareSync(password, user.password);
    if (!isTruePassword) {
      return resError(res, 401, "password not match");
    }
    delete user.password
    const token = `${jwt.sign(user, process.env.JWT_SECRETS, {
      expiresIn: "24h",
    })}`;
    const data = {
      token,
      user,
    };
    return resSuccess(res, 200, "login success", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

controller.me = async (req, res) => {
  try {
    const active_user_id = req.userData.id;
    const data = await model.getMe(active_user_id);
    return resSuccess(res, 200, "success", data);
  } catch (error) {
    return resError(res, 500, error);
  }
};

module.exports = controller;
