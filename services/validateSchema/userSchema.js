const Joi = require("joi");

const userSchema = Joi.object({
    fullName: Joi.string().min(0).max(30).required(),
    gender: Joi.number().min(0).max(1),
    id_faculty: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().min(10).max(10),
    role: Joi.string().min(0).max(30).required(),
});
module.exports = userSchema;
