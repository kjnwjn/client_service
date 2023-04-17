const Joi = require("joi");

const updateAccountSchema = Joi.object({
    id_student: Joi.string().min(3).max(30).required(),
    username: Joi.string().min(3).max(30),
    fullName: Joi.string().min(0).max(30),
    course_year: Joi.number().integer().min(19).max(23),
    gender: Joi.number().min(0).max(1),
    id_class: Joi.string().min(3).max(30),
    id_faculty: Joi.string().min(3).max(30),
    address: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().min(10).max(10),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "vn"] } }),
});
module.exports = updateAccountSchema;
