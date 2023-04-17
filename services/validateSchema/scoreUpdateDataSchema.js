const Joi = require("joi");

const ScoreUpdateSchema = Joi.object({
    id: Joi.string().min(3).max(30).required(),
    attendance_score: Joi.number().min(0).max(10),
    assignment: Joi.number().min(0).max(10),
    mid_tern: Joi.number().min(0).max(10),
    final_tern: Joi.number().min(0).max(10),
});

module.exports = ScoreUpdateSchema;
