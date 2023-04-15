const Joi = require("joi");

const classSchema = Joi.object({
    course_year: Joi.string().min(1).max(30).required(),
    id_faculty: Joi.string().min(3).max(30).required(),
});

module.exports = classSchema;
