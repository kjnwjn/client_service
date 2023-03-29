const Joi = require("joi");

const changePassSchema = Joi.object({
    id_student: Joi.string().min(0).max(30).required(),
    old_password: Joi.string().min(0).max(6).required(),
    new_password: Joi.string().min(0).max(6).required(),
});
module.exports = changePassSchema;
