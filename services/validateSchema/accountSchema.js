const Joi = require("joi");

const accountSchema = Joi.object({
    fullName: Joi.string().min(0).max(30).required(),
    course_year: Joi.number().integer().min(19).max(23).required(),
    gender: Joi.number().min(0).max(1),
    id_class: Joi.string().min(3).max(30).required(),
    id_faculty: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(3).max(30),
    phoneNumber: Joi.number().min(10).max(10),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    // access_token: [Joi.string(), Joi.number()],
    // refresh_token: [Joi.string(), Joi.number()],
});

module.exports = accountSchema;
