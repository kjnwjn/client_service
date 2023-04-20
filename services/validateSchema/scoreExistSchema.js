const Joi = require("joi");

const scoreExistSchema = Joi.object({
    id_student: Joi.string().min(3).max(30).required(),
    id_course: Joi.string().min(3).max(30).required(),
});

module.exports = scoreExistSchema;
