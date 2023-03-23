const Joi = require("joi");

const classSchema = Joi.object({
    course_year: Joi.number().integer().min(19).max(23),
    id_faculty: Joi.string().min(3).max(30),
});

module.exports = classSchema;
