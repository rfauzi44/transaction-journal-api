const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
valid = {};

valid.register = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(5).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
  gender: Joi.string().required().valid("male", "female"),
});

valid.login = Joi.object({
  username_email: Joi.string().min(5).required(),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
});

valid.item = Joi.object({
  id: Joi.string().uuid().required(),
  name: Joi.string().min(3).required(),
  price: Joi.number().integer().positive().required(),
  qty: Joi.number().integer().positive().required(),
});

valid.transaction = Joi.object({
  code: Joi.string().min(5).required(),
  date: Joi.date().required(),
  is_paid: Joi.boolean().required(),
  items: Joi.array().min(1).items(valid.item).required(),
});


module.exports = valid;
