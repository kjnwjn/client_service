const Joi = require("joi");

const updateUserSchema = Joi.object({
    id_user: Joi.string().min(3).max(30).required(),
    fullName: Joi.string().min(0).max(30),
    gender: Joi.number().min(0).max(1),
    id_faculty: Joi.string().min(3).max(30),
    address: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().min(10).max(10),
    role: Joi.string().min(0).max(30),
});
module.exports = updateUserSchema;
