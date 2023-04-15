const Joi = require("joi");

const changePassSchema = Joi.object({
    userCode: Joi.string().min(0).max(30).required(),
    tableId: Joi.string().min(0).max(30).required(),
    new_password: Joi.string().min(0).max(6).required(),
});
module.exports = changePassSchema;
