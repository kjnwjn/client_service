const Joi = require("joi");

const ScoreSchema = Joi.object({
    id_student: Joi.string().min(3).max(30).required(),
    id_course: Joi.string().min(3).max(30).required(),
    semester: Joi.string().required(),
});

module.exports = ScoreSchema;
